import { DEFAULT_THEME, parsePreference, THEME_COOKIE } from '#lib/data/themes.js';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	const preference = parsePreference(event.cookies.get(THEME_COOKIE)) ?? DEFAULT_THEME;
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace('%portfolio.collection%', preference.collection)
				.replace('%portfolio.appearance%', preference.appearance)
	});
};
