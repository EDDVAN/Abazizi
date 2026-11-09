<script lang="ts">
	import { asset } from '$app/paths';
	import { portfolio } from '#lib/data/portfolio.js';
	import { getTheme } from '#lib/theme/context.js';
	import Icon from '#lib/components/ui/Icon.svelte';
	const theme = getTheme();
	let copyMessage = $state('');
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(portfolio.email);
			copyMessage = 'Email copied to clipboard.';
		} catch {
			copyMessage = 'Copy is unavailable. You can select the email address or open your email app.';
		}
	}
</script>

<section id="contact" class="contact-section section-pad" aria-labelledby="contact-title">
	<div class="section-index eyebrow">
		<span>06 / NEXT CONVERSATION</span><span>LET’S MAKE SOMETHING USEFUL</span>
	</div>
	<div class="contact-heading">
		<h2 id="contact-title">LET’S<br /><span>CONNECT.</span></h2>
		<a class="contact-arrow" href={`mailto:${portfolio.email}`} aria-label="Email Ali Bazizi"
			><Icon size={64} /></a
		>
	</div>
	<div class="contact-grid">
		<div class="contact-email">
			<span class="eyebrow">START WITH AN EMAIL</span><a href={`mailto:${portfolio.email}`}
				>{portfolio.email}</a
			><button class="text-button copy-email" type="button" onclick={copyEmail}
				><Icon name="copy" size={16} />Copy email address</button
			>
			<p class="copy-status" role="status">{copyMessage}</p>
		</div>
		<div class="contact-links">
			<a href={portfolio.linkedin} target="_blank" rel="external noreferrer"
				><span>LinkedIn <span class="mono">@AliBazizi</span></span><Icon /><span class="sr-only">
					(opens in a new tab)</span
				></a
			><a href={portfolio.github} target="_blank" rel="external noreferrer"
				><span>GitHub <span class="mono">@EDDVAN</span></span><Icon /><span class="sr-only">
					(opens in a new tab)</span
				></a
			><a href={portfolio.phoneHref} rel="external"
				><span>Phone <span class="mono">{portfolio.phone}</span></span><Icon /></a
			><a href={asset(portfolio.resume)} download
				><span>Résumé <span class="mono">PDF / DOWNLOAD</span></span><Icon name="download" /></a
			>
		</div>
	</div>
	<div class="contact-laboratory">
		<span class="eyebrow">ONE IDENTITY. TEN FREQUENCIES.</span><button
			class="inline-link"
			type="button"
			onclick={() => (theme.open = true)}
			>Find your color in the laboratory <span aria-hidden="true">↗</span></button
		>
	</div>
</section>
