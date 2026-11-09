import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { collections, contrast, DEFAULT_THEME, parsePreference } from '../src/lib/data/themes.ts';

test('exactly ten named collections preserve all supplied defining colors', () => {
	const expected = [
		['ozone', '#17191B', '#B9A4E8', '#F3E35B'],
		['graphite', '#30343B', '#B8D8E8', '#FF817F'],
		['oat', '#EDE2CC', '#52677C', '#F28B45'],
		['onyx', '#101116', '#7167F8', '#73E6BD'],
		['obsidian', '#171719', '#C5D9E8', '#FF4D55'],
		['porcelain', '#F2F0E9', '#56616D', '#C6F05B'],
		['deep-ocean', '#102A38', '#B9DCE8', '#39D6D0'],
		['burgundy', '#542333', '#EACBD2', '#F07853'],
		['ultraviolet', '#211638', '#BBA8E8', '#50E7F2'],
		['forest', '#20392F', '#B8CDB9', '#E8B94F']
	];
	assert.deepEqual(
		collections.map((c) => [
			c.id,
			c.colors.primary.value,
			c.colors.secondary.value,
			c.colors.accent.value
		]),
		expected
	);
});

test('all twenty palettes have readable semantic foregrounds and controls', () => {
	for (const collection of collections)
		for (const appearance of ['light', 'dark']) {
			const t = collection[appearance];
			for (const background of [
				'color-background',
				'color-background-secondary',
				'color-surface',
				'color-surface-elevated',
				'color-hover'
			]) {
				for (const foreground of ['color-text', 'color-text-secondary', 'color-link']) {
					const ratio = contrast(t[foreground], t[background]);
					assert.ok(
						ratio >= 4.5,
						`${collection.id}/${appearance}: ${foreground}/${background} = ${ratio}`
					);
				}
			}
			assert.ok(contrast(t['color-on-accent'], t['color-accent']) >= 4.5);
			assert.ok(contrast(t['color-border-strong'], t['color-background']) >= 3);
			assert.ok(contrast(t['color-focus'], t['color-background']) >= 3);
		}
});

test('stored preference parser accepts valid pairs and rejects malformed or untrusted values', () => {
	assert.deepEqual(parsePreference(JSON.stringify(DEFAULT_THEME)), DEFAULT_THEME);
	for (const value of [
		null,
		'',
		'{',
		'null',
		'[]',
		'42',
		'{}',
		'{"version":1,"collection":"unknown","appearance":"dark"}',
		'{"version":1,"collection":"ozone","appearance":"system"}',
		'{"version":2,"collection":"ozone","appearance":"dark"}'
	]) {
		assert.equal(parsePreference(value), null);
	}
	assert.deepEqual(
		parsePreference('{"version":1,"collection":"forest","appearance":"light","extra":"ignored"}'),
		{ version: 1, collection: 'forest', appearance: 'light' }
	);
});

test('committed CSS contains the current token values for every variant', () => {
	const css = readFileSync(new URL('../src/lib/styles/themes.css', import.meta.url), 'utf8');
	for (const collection of collections)
		for (const appearance of ['light', 'dark']) {
			const blocks = [
				...css.matchAll(
					/:root\[data-collection=['"]([^'"]+)['"]\]\[data-appearance=['"]([^'"]+)['"]\]\s*\{([^}]+)\}/g
				)
			];
			const block = blocks.find((b) => b[1] === collection.id && b[2] === appearance)?.[3];
			assert.ok(block, `${collection.id}/${appearance}: missing selector`);
			for (const [name, value] of Object.entries(collection[appearance]))
				assert.ok(
					block.toLowerCase().includes(`--${name}: ${value};`.toLowerCase()),
					`${collection.id}/${appearance}: ${name} needs regeneration`
				);
		}
});
