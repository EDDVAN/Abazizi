export type Appearance = 'light' | 'dark';

const specifications = [
	{
		id: 'ozone',
		name: 'Ozone',
		personality: 'Industrial, creative, technical, electric.',
		primary: ['Robust Ozone Black', '#17191B'],
		secondary: ['Firmy Lavender', '#B9A4E8'],
		accent: ['Squintondale Yellow', '#F3E35B'],
		light: ['#F0EEE9', '#202124'],
		dark: ['#17191B', '#F2F0EB']
	},
	{
		id: 'graphite',
		name: 'Graphite',
		personality: 'Minimal, atmospheric, expressive.',
		primary: ['Graphite', '#30343B'],
		secondary: ['Mist Blue', '#B8D8E8'],
		accent: ['Coral Pink', '#FF817F'],
		light: ['#EDF2F4', '#27313C'],
		dark: ['#30343B', '#F2F5F7']
	},
	{
		id: 'oat',
		name: 'Oat',
		personality: 'Editorial, intellectual, warm.',
		primary: ['Oat Cream', '#EDE2CC'],
		secondary: ['Coffee Blue', '#52677C'],
		accent: ['Tangerine', '#F28B45'],
		light: ['#EDE2CC', '#292D32'],
		dark: ['#24231F', '#F1E7D6']
	},
	{
		id: 'onyx',
		name: 'Onyx',
		personality: 'Futuristic, digital, vibrant.',
		primary: ['Onyx Black', '#101116'],
		secondary: ['Electric Indigo', '#7167F8'],
		accent: ['Tropical Mint', '#73E6BD'],
		light: ['#F0F0F8', '#202033'],
		dark: ['#101116', '#F1F1FA']
	},
	{
		id: 'obsidian',
		name: 'Obsidian',
		personality: 'Dark, industrial, high-impact.',
		primary: ['Obsidian', '#171719'],
		secondary: ['Ice Blue', '#C5D9E8'],
		accent: ['Signal Red', '#FF4D55'],
		light: ['#F0F3F5', '#25252B'],
		dark: ['#171719', '#F0F3F6']
	},
	{
		id: 'porcelain',
		name: 'Porcelain',
		personality: 'Light, technical, experimental.',
		primary: ['Porcelain', '#F2F0E9'],
		secondary: ['Slate', '#56616D'],
		accent: ['Acid Lime', '#C6F05B'],
		light: ['#F2F0E9', '#282D2A'],
		dark: ['#202420', '#F0F0E8']
	},
	{
		id: 'deep-ocean',
		name: 'Deep Ocean',
		personality: 'Atmospheric, deep, futuristic.',
		primary: ['Deep Ocean', '#102A38'],
		secondary: ['Glacier Blue', '#B9DCE8'],
		accent: ['Aqua', '#39D6D0'],
		light: ['#ECF4F5', '#16313B'],
		dark: ['#102A38', '#ECF5F7']
	},
	{
		id: 'burgundy',
		name: 'Burgundy',
		personality: 'Editorial, dramatic, warm.',
		primary: ['Burgundy', '#542333'],
		secondary: ['Blush', '#EACBD2'],
		accent: ['Vermilion', '#F07853'],
		light: ['#F5E9E7', '#472432'],
		dark: ['#542333', '#F9EEF0']
	},
	{
		id: 'ultraviolet',
		name: 'Ultraviolet',
		personality: 'Experimental, digital, electric.',
		primary: ['Ultraviolet', '#211638'],
		secondary: ['Lilac', '#BBA8E8'],
		accent: ['Laser Cyan', '#50E7F2'],
		light: ['#F0EBF7', '#30213F'],
		dark: ['#211638', '#F3EFF9']
	},
	{
		id: 'forest',
		name: 'Forest',
		personality: 'Organic, refined, sophisticated.',
		primary: ['Forest', '#20392F'],
		secondary: ['Sage', '#B8CDB9'],
		accent: ['Solar Gold', '#E8B94F'],
		light: ['#EEF1E8', '#243C30'],
		dark: ['#20392F', '#EFF3E9']
	}
] as const;

export type CollectionId = (typeof specifications)[number]['id'];
export type ThemePreference = { version: 1; collection: CollectionId; appearance: Appearance };
export const THEME_COOKIE = 'abazizi-identity';
export const DEFAULT_THEME: ThemePreference = {
	version: 1,
	collection: 'ozone',
	appearance: 'dark'
};

function rgb(hex: string): number[] {
	return [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
}

export function mix(a: string, b: string, amount: number): string {
	const first = rgb(a);
	return (
		'#' +
		rgb(b)
			.map((value, index) =>
				Math.round(first[index] * (1 - amount) + value * amount)
					.toString(16)
					.padStart(2, '0')
			)
			.join('')
	);
}

export function contrast(a: string, b: string): number {
	const luminance = (hex: string) =>
		rgb(hex)
			.map((v) => v / 255)
			.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
			.reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
	const first = luminance(a),
		second = luminance(b);
	return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function readable(seed: string, background: string, ink: string, minimum = 4.6): string {
	for (let step = 0; step <= 100; step++) {
		const candidate = mix(seed, ink, step / 100);
		if (contrast(candidate, background) >= minimum) return candidate;
	}
	return ink;
}

function variant(
	background: string,
	text: string,
	primary: string,
	secondary: string,
	accent: string
) {
	const surface = mix(background, text, 0.035);
	const elevated = mix(background, text, 0.065);
	const hover = mix(background, text, 0.09);
	const secondaryText = readable(mix(background, text, 0.66), hover, text);
	const accentInk =
		contrast(accent, '#101116') >= contrast(accent, '#FFFFFF') ? '#101116' : '#FFFFFF';
	return {
		'color-background': background,
		'color-background-secondary': mix(background, primary, 0.055),
		'color-surface': surface,
		'color-surface-elevated': elevated,
		'color-text': text,
		'color-text-secondary': secondaryText,
		'color-primary': primary,
		'color-secondary': secondary,
		'color-accent': accent,
		'color-on-accent': accentInk,
		'color-border': mix(background, text, 0.2),
		'color-border-strong': readable(mix(background, text, 0.45), background, text, 3.1),
		'color-muted': secondaryText,
		'color-hover': hover,
		'color-focus': readable(accent, hover, text, 3.2),
		'color-selection': accent,
		'color-link': readable(accent, hover, text),
		'color-display': readable(secondary, background, text),
		'color-art': readable(secondary, elevated, text, 3.2),
		'color-overlay': mix(background, '#000000', 0.6)
	};
}

export const collections = specifications.map((spec) => ({
	id: spec.id,
	name: spec.name,
	personality: spec.personality,
	colors: {
		primary: { name: spec.primary[0], value: spec.primary[1] },
		secondary: { name: spec.secondary[0], value: spec.secondary[1] },
		accent: { name: spec.accent[0], value: spec.accent[1] }
	},
	light: variant(spec.light[0], spec.light[1], spec.primary[1], spec.secondary[1], spec.accent[1]),
	dark: variant(spec.dark[0], spec.dark[1], spec.primary[1], spec.secondary[1], spec.accent[1])
}));

export function parsePreference(value: string | null | undefined): ThemePreference | null {
	if (!value) return null;
	try {
		const parsed = JSON.parse(value);
		if (
			parsed?.version === 1 &&
			collections.some((item) => item.id === parsed.collection) &&
			(parsed.appearance === 'light' || parsed.appearance === 'dark')
		) {
			return { version: 1, collection: parsed.collection, appearance: parsed.appearance };
		}
	} catch {
		/* Invalid client preferences fall back to the default. */
	}
	return null;
}
