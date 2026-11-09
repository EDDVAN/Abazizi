import { parsePreference, THEME_COOKIE } from '#lib/data/themes.js';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => ({
	themePreference: parsePreference(cookies.get(THEME_COOKIE))
});
