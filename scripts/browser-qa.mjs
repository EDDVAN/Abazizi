import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { collections, contrast } from '../src/lib/data/themes.ts';

const base = process.argv[2] || process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173/';
const cdp = process.env.CDP_URL || 'http://127.0.0.1:9447';
const output = process.env.QA_DIR || '/tmp/abazizi-qa';
await fs.mkdir(output + '/screenshots', { recursive: true });
const targets = await fetch(cdp + '/json/list').then((r) => r.json());
const target = targets.find((t) => t.type === 'page');
assert.ok(target, 'Launch a local Chromium browser with remote debugging first.');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
	socket.addEventListener('open', resolve, { once: true });
	socket.addEventListener('error', reject, { once: true });
});
let id = 0;
const pending = new Map();
const errors = [],
	badResponses = [],
	checks = [],
	matrix = [],
	requests = [];
socket.addEventListener('message', (event) => {
	const m = JSON.parse(event.data);
	if (m.id) {
		const p = pending.get(m.id);
		if (!p) return;
		pending.delete(m.id);
		if (m.error) p.reject(new Error(JSON.stringify(m.error)));
		else p.resolve(m.result);
	}
	if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails);
	if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error')
		errors.push(m.params.args.map((a) => a.value || a.description).join(' '));
	if (m.method === 'Network.responseReceived') {
		const r = m.params.response;
		requests.push({ url: r.url, status: r.status, mime: r.mimeType, bytes: r.encodedDataLength });
		if (r.status >= 400) badResponses.push({ url: r.url, status: r.status });
	}
});
const send = (method, params = {}) =>
	new Promise((resolve, reject) => {
		const n = ++id;
		pending.set(n, { resolve, reject });
		socket.send(JSON.stringify({ id: n, method, params }));
	});
const evaluate = async (expression) => {
	const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
	if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
	return r.result.value;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const check = (name) => {
	checks.push({ name, result: 'passed' });
	console.log('PASS', name);
};
const key = async (key, code = key, number = 0, modifiers = 0) => {
	for (const type of ['keyDown', 'keyUp'])
		await send('Input.dispatchKeyEvent', {
			type,
			key,
			code,
			windowsVirtualKeyCode: number,
			nativeVirtualKeyCode: number,
			modifiers
		});
};
const click = async (selector) => {
	const rect = await evaluate(
		`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing control: '+${JSON.stringify(selector)});e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();if(!r.width||!r.height)throw Error('Hidden control');return {x:r.x+r.width/2,y:r.y+r.height/2};})()`
	);
	for (const type of ['mousePressed', 'mouseReleased'])
		await send('Input.dispatchMouseEvent', { type, button: 'left', clickCount: 1, ...rect });
	await wait(60);
};
const viewport = async (width, height) =>
	send('Emulation.setDeviceMetricsOverride', {
		width,
		height,
		deviceScaleFactor: 1,
		mobile: false
	});
const navigate = async () => {
	await send('Page.navigate', { url: base });
	await wait(450);
	await evaluate(
		'document.fonts.ready.then(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))))'
	);
};
const shot = async (name, full = false, top = true) => {
	if (top) await evaluate('window.scrollTo({top:0,behavior:"instant"})');
	await wait(50);
	const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full });
	await fs.writeFile(`${output}/screenshots/${name}.png`, Buffer.from(r.data, 'base64'));
};
const state = () =>
	evaluate(
		'({collection:document.documentElement.dataset.collection,appearance:document.documentElement.dataset.appearance,cookie:document.cookie,time:performance.timeOrigin,href:location.href})'
	);
const labOpen = async () => {
	await click('.laboratory-trigger');
	assert.equal(await evaluate('document.querySelector("dialog").open'), true);
};
const labClose = async () => {
	await click('.close-laboratory');
	assert.equal(await evaluate('document.querySelector("dialog").open'), false);
};

await send('Page.enable');
await send('Runtime.enable');
await send('Network.enable');
await send('Accessibility.enable');
const browser = await send('Browser.getVersion');
const report = { base, browser, checks, matrix, errors, badResponses, requests };
if (process.argv.includes('--inspect')) {
	await viewport(390, 844);
	await wait(100);
	console.log(
		await evaluate(
			`JSON.stringify({viewport:innerWidth,width:document.documentElement.scrollWidth,active:document.activeElement?.outerHTML?.slice(0,250),overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1&&!e.closest('dialog')&&!e.closest('.sr-only')}).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,80),font:getComputedStyle(e).fontSize,rect:{x:e.getBoundingClientRect().x,width:e.getBoundingClientRect().width,right:e.getBoundingClientRect().right}})).slice(0,40)})`
		)
	);
	await shot('diagnostic-viewport');
	socket.close();
	process.exit(0);
}
try {
	assert.equal((await fetch(base)).status, 200);
	await send('Network.deleteCookies', { name: 'abazizi-identity', url: base });
	await viewport(1440, 1000);
	await navigate();
	report.initialPerformance = await evaluate(
		`new Promise(resolve=>{let lcp=0,cls=0;const a=new PerformanceObserver(list=>{for(const e of list.getEntries())lcp=e.startTime;});a.observe({type:'largest-contentful-paint',buffered:true});const b=new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)cls+=e.value;});b.observe({type:'layout-shift',buffered:true});setTimeout(()=>{a.disconnect();b.disconnect();resolve({navigation:performance.getEntriesByType('navigation')[0]?.toJSON(),paints:performance.getEntriesByType('paint').map(e=>({name:e.name,time:e.startTime})),largestContentfulPaintMs:lcp,cumulativeObservedLayoutShift:cls,resources:performance.getEntriesByType('resource').map(e=>({name:e.name,transferSize:e.transferSize,decodedBodySize:e.decodedBodySize,duration:e.duration}))});},350);})`
	);
	let initial = await state();
	assert.equal(initial.collection, 'ozone');
	assert.equal(initial.appearance, 'dark');
	assert.equal(await evaluate('document.querySelectorAll("h1").length'), 1);
	assert.equal(await evaluate('document.images[0].naturalWidth>0'), true);
	await shot('ozone-dark-full', true);
	check('Default SSR page, one main heading and loaded portrait');
	await labOpen();
	assert.equal(await evaluate('document.querySelectorAll("[data-collection-option]").length'), 10);
	await shot('laboratory-desktop');
	await click('[data-collection-option="graphite"]');
	await click('.theme-laboratory [data-testid="appearance-light"]');
	let preview = await state();
	assert.equal(preview.collection, 'graphite');
	assert.equal(preview.appearance, 'light');
	assert.equal(preview.cookie, initial.cookie);
	assert.equal(preview.time, initial.time);
	await labClose();
	await navigate();
	assert.equal((await state()).collection, 'ozone');
	check(
		'Preview updates the whole document without reload or persistent writes; reload restores default'
	);
	await labOpen();
	await click('[data-collection-option="graphite"]');
	await click('.theme-laboratory [data-testid="appearance-light"]');
	await click('[data-testid="lock-theme"]');
	const locked = await state();
	assert.ok(locked.cookie.includes('abazizi-identity='));
	await labClose();
	await navigate();
	assert.equal((await state()).collection, 'graphite');
	assert.equal((await state()).appearance, 'light');
	const cookie = (await state()).cookie;
	const ssr = await fetch(base, { headers: { Cookie: cookie } }).then((r) => r.text());
	assert.match(ssr, /data-collection="graphite"/);
	assert.match(ssr, /data-appearance="light"/);
	const independentSSR = await fetch(base).then((r) => r.text());
	assert.match(independentSSR, /data-collection="ozone"/);
	assert.match(independentSSR, /data-appearance="dark"/);
	await shot('graphite-light-full', true);
	check(
		'Lock persists collection and appearance after reload and renders the saved pair in server HTML'
	);
	await labOpen();
	await click('[data-collection-option="forest"]');
	assert.equal((await state()).appearance, 'light');
	await click('.theme-laboratory [data-testid="appearance-dark"]');
	assert.equal((await state()).collection, 'forest');
	assert.equal((await state()).cookie, cookie);
	await click('[data-testid="restore-theme"]');
	assert.equal((await state()).collection, 'graphite');
	assert.equal((await state()).appearance, 'light');
	assert.equal((await state()).cookie, cookie);
	check('Collection and appearance remain independent; Return restores the locked pair');
	await click('[data-testid="reset-theme"]');
	assert.equal((await state()).collection, 'ozone');
	assert.equal((await state()).appearance, 'dark');
	assert.equal((await state()).cookie.includes('abazizi-identity='), false);
	await labClose();
	await navigate();
	assert.equal((await state()).collection, 'ozone');
	check('Reset clears the stored preference and survives reload');
	const firstTime = (await state()).time;
	for (const collection of collections)
		for (const appearance of ['dark', 'light']) {
			await labOpen();
			await click(`[data-collection-option="${collection.id}"]`);
			await click(`.theme-laboratory [data-testid="appearance-${appearance}"]`);
			assert.equal((await state()).collection, collection.id);
			assert.equal((await state()).appearance, appearance);
			await labClose();
			await wait(200);
			const actual = await evaluate(
				`(()=>{const s=getComputedStyle(document.documentElement);return Object.fromEntries(${JSON.stringify(Object.keys(collection[appearance]))}.map(k=>[k,s.getPropertyValue('--'+k).trim()]));})()`
			);
			for (const [name, value] of Object.entries(collection[appearance]))
				assert.equal(
					actual[name].toLowerCase(),
					value.toLowerCase(),
					`${collection.id}/${appearance}: ${name}`
				);
			const components = await evaluate(
				`(()=>{const checks=[['body','backgroundColor','color-background'],['.site-header','backgroundColor','color-background'],['.work-section','backgroundColor','color-background-secondary'],['.study-visual','backgroundColor','color-surface-elevated'],['.technical-section','backgroundColor','color-surface'],['.hero-actions .button','backgroundColor','color-accent'],['.hero-actions .button','color','color-on-accent'],['.experience-date','color','color-link'],['.hero h1>span:nth-child(2)','color','color-display']];return checks.map(([selector,property,token])=>{const e=document.querySelector(selector),sample=document.createElement('span');sample.style.color='var(--'+token+')';document.body.append(sample);const expected=getComputedStyle(sample).color;sample.remove();return {selector,property,actual:getComputedStyle(e)[property],expected};});})()`
			);
			for (const component of components)
				assert.equal(
					component.actual,
					component.expected,
					`${collection.id}/${appearance}: ${component.selector} ${component.property}`
				);
			const overflow = await evaluate('document.documentElement.scrollWidth>innerWidth');
			assert.equal(overflow, false, `${collection.id}/${appearance}: desktop overflow`);
			const pairs = [];
			for (const bg of [
				'color-background',
				'color-surface',
				'color-surface-elevated',
				'color-hover'
			])
				for (const fg of ['color-text', 'color-text-secondary', 'color-link']) {
					const ratio = contrast(actual[bg], actual[fg]);
					assert.ok(ratio >= 4.5);
					pairs.push({ pair: `${fg}/${bg}`, ratio });
				}
			await shot(`${collection.id}-${appearance}-desktop`);
			await viewport(390, 844);
			await wait(200);
			assert.equal(
				await evaluate('document.documentElement.scrollWidth>innerWidth'),
				false,
				`${collection.id}/${appearance}: mobile overflow`
			);
			await shot(`${collection.id}-${appearance}-mobile`);
			matrix.push({
				collection: collection.id,
				appearance,
				desktop: 1440,
				mobile: 390,
				tokenPairs: pairs,
				componentChecks: components,
				rendered: true
			});
			await viewport(1440, 1000);
			await wait(150);
		}
	assert.equal((await state()).time, firstTime);
	assert.equal((await state()).cookie.includes('abazizi-identity='), false);
	check(
		'All 20 combinations render at desktop and mobile, change every token, meet selected text contrast pairs, and switch without reload/storage writes'
	);
	for (const [width, height] of [
		[320, 740],
		[768, 1024],
		[1024, 768],
		[1920, 1080]
	]) {
		await viewport(width, height);
		await wait(160);
		assert.equal(
			await evaluate('document.documentElement.scrollWidth>innerWidth'),
			false,
			`Overflow at ${width}`
		);
		await shot(`responsive-${width}`, width === 320 || width === 768);
	}
	check('320px phone, tablet, laptop and large desktop layouts have no document overflow');
	await viewport(390, 844);
	await navigate();
	await click('.mobile-menu-toggle');
	assert.equal(
		await evaluate('document.querySelector(".mobile-menu-toggle").getAttribute("aria-expanded")'),
		'true'
	);
	await shot('mobile-navigation');
	await key('Escape', 'Escape', 27);
	assert.equal(
		await evaluate('document.activeElement.classList.contains("mobile-menu-toggle")'),
		true
	);
	await click('.mobile-menu-toggle');
	await click('.mobile-navigation a[href="#work"]');
	await wait(450);
	assert.equal(await evaluate('location.hash'), '#work');
	assert.equal(await evaluate('!!document.querySelector(".mobile-navigation")'), false);
	await labOpen();
	await shot('laboratory-mobile');
	await key('Tab', 'Tab', 9);
	assert.equal(
		await evaluate(
			'document.activeElement===document.body||document.querySelector("dialog").contains(document.activeElement)'
		),
		true
	);
	await key('Escape', 'Escape', 27);
	await wait(60);
	assert.equal(await evaluate('document.querySelector("dialog").open'), false);
	assert.equal(
		await evaluate('document.activeElement.classList.contains("laboratory-trigger")'),
		true
	);
	check(
		'Mobile navigation, section link, Escape behavior, modal keyboard containment and focus return'
	);
	await viewport(320, 740);
	await labOpen();
	await click('[data-collection-option="forest"]');
	await click('.theme-laboratory [data-testid="appearance-light"]');
	await shot('laboratory-320');
	const bounds = await evaluate(
		'(()=>{const d=document.querySelector("dialog").getBoundingClientRect(),b=document.querySelector(".lock-theme").getBoundingClientRect();return {width:d.width,viewport:innerWidth,top:b.top,bottom:b.bottom,height:innerHeight,scroll:document.querySelector(".laboratory-scroll").clientHeight};})()'
	);
	assert.ok(
		bounds.width <= bounds.viewport &&
			bounds.top >= 0 &&
			bounds.bottom <= bounds.height &&
			bounds.scroll > 80,
		JSON.stringify(bounds)
	);
	await labClose();
	check('320px laboratory remains scrollable with reachable locking action');
	await viewport(390, 844);
	await navigate();
	await send('Browser.grantPermissions', {
		origin: new URL(base).origin,
		permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite']
	});
	await click('.copy-email');
	assert.match(await evaluate('document.querySelector(".copy-status").textContent'), /copied/);
	assert.equal(await evaluate('navigator.clipboard.readText()'), 'bazizi.ali0@gmail.com');
	const urls = await evaluate('Array.from(document.links).map(a=>a.getAttribute("href"))');
	for (const href of urls.filter((u) => u?.startsWith('#')))
		assert.equal(
			await evaluate(`!!document.querySelector(${JSON.stringify(href)})`),
			true,
			`Missing ${href}`
		);
	assert.equal(
		await fetch(new URL('/documents/ali-bazizi-resume.pdf', base)).then((r) => r.status),
		200
	);
	assert.equal(
		await fetch(new URL('/images/ali-bazizi-480.webp', base)).then((r) => r.status),
		200
	);
	assert.equal(
		await fetch(new URL('/images/ali-bazizi-960.webp', base)).then((r) => r.status),
		200
	);
	check(
		'Copy action returns feedback; all local navigation targets, résumé and portrait variants resolve'
	);
	await viewport(1440, 1000);
	await navigate();
	for (const section of ['profile', 'work', 'experience', 'stack', 'education', 'contact']) {
		await click(`.desktop-navigation a[href="#${section}"]`);
		await wait(100);
		assert.equal(await evaluate('location.hash'), '#' + section);
		await evaluate(
			`document.querySelector('#${section}').scrollIntoView({behavior:'instant',block:'start'})`
		);
		await shot(`section-${section}-desktop`, false, false);
	}
	await viewport(390, 844);
	await navigate();
	for (const section of ['profile', 'work', 'experience', 'stack', 'education', 'contact']) {
		await evaluate(
			`document.querySelector('#${section}').scrollIntoView({behavior:'instant',block:'start'})`
		);
		await shot(`section-${section}-mobile`, false, false);
	}
	check(
		'All six main navigation links reach their sections; detailed desktop/mobile section screenshots captured'
	);
	const ax = await send('Accessibility.getFullAXTree');
	const unnamed = ax.nodes.filter(
		(n) => !n.ignored && ['button', 'link'].includes(n.role?.value) && !n.name?.value
	);
	assert.equal(unnamed.length, 0);
	await send('Emulation.setEmulatedMedia', {
		features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
	});
	assert.equal(await evaluate('getComputedStyle(document.documentElement).scrollBehavior'), 'auto');
	await labOpen();
	assert.equal(
		await evaluate(
			'getComputedStyle(document.querySelector(".collection-option")).transitionDuration'
		),
		'0s'
	);
	await labClose();
	check(
		'Browser accessibility tree has named controls; reduced motion removes scrolling/color transitions'
	);
	await evaluate(
		`(()=>{const sizes=[...document.body.querySelectorAll('*')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,size]of sizes)e.style.fontSize=(size*2)+'px';})()`
	);
	await shot('text-200-mobile', true);
	await shot('text-200-hero');
	report.textResizeOverflow = await evaluate('document.documentElement.scrollWidth>innerWidth');
	assert.equal(report.textResizeOverflow, false, '200% text causes document overflow');
	check('Enlarged text reflows without document overflow');
	assert.equal(errors.length, 0, JSON.stringify(errors));
	assert.equal(badResponses.length, 0, JSON.stringify(badResponses));
	check(
		'No observed browser console errors, uncaught exceptions or failed page resource responses'
	);
} catch (error) {
	report.failure = { message: error.message, stack: error.stack };
	console.error(error);
	process.exitCode = 1;
	await shot('failure', true).catch(() => {});
} finally {
	await fs.writeFile(output + '/results.json', JSON.stringify(report, null, 2));
	socket.close();
	console.log(
		JSON.stringify(
			{
				checks: checks.length,
				themeCombinations: matrix.length,
				errorCount: errors.length,
				failedRequests: badResponses.length,
				failure: report.failure || null,
				textResizeOverflow: report.textResizeOverflow,
				output
			},
			null,
			2
		)
	);
}
