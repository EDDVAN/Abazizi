<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { onMount, untrack } from 'svelte';
	import { ThemeController } from '#lib/theme/controller.svelte.js';
	import { setTheme } from '#lib/theme/context.js';

	let { children, data }: LayoutProps = $props();
	const theme = setTheme(new ThemeController(untrack(() => data.themePreference)));
	onMount(() => theme.mount());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		rel="preload"
		href="/fonts/space-grotesk-latin.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

{@render children()}
