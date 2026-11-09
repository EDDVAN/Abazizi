import { createContext } from 'svelte';
import type { ThemeController } from './controller.svelte.js';

export const [getTheme, setTheme] = createContext<ThemeController>();
