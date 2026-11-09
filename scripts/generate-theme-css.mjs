import { writeFileSync } from 'node:fs';
import { collections } from '../src/lib/data/themes.ts';

const output = [
	'/* Generated from src/lib/data/themes.ts. Run: node scripts/generate-theme-css.mjs */'
];
for (const collection of collections) {
	for (const appearance of ['light', 'dark']) {
		const selector = `:root[data-collection="${collection.id}"][data-appearance="${appearance}"]`;
		const defaults = collection.id === 'ozone' && appearance === 'dark' ? ':root,\n' : '';
		output.push(
			`${defaults}${selector} {\n\tcolor-scheme: ${appearance};\n${Object.entries(
				collection[appearance]
			)
				.map(([name, value]) => `\t--${name}: ${value};`)
				.join('\n')}\n}`
		);
	}
}
writeFileSync(new URL('../src/lib/styles/themes.css', import.meta.url), output.join('\n\n') + '\n');
console.log('Generated 20 collection / appearance token sets.');
