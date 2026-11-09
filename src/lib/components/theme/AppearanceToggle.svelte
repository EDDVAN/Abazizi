<script lang="ts">
	import { getTheme } from '#lib/theme/context.js';
	import Icon from '#lib/components/ui/Icon.svelte';
	let { compact = false }: { compact?: boolean } = $props();
	const theme = getTheme();
</script>

<div class={['appearance-toggle', { compact }]} role="group" aria-label="Appearance">
	<button
		type="button"
		aria-label="Light appearance"
		aria-pressed={theme.appearance === 'light'}
		onclick={() => theme.setAppearance('light')}
		data-testid="appearance-light"
	>
		<Icon name="sun" size={17} /><span class={compact ? 'sr-only' : ''}>Light</span>
	</button>
	<button
		type="button"
		aria-label="Dark appearance"
		aria-pressed={theme.appearance === 'dark'}
		onclick={() => theme.setAppearance('dark')}
		data-testid="appearance-dark"
	>
		<Icon name="moon" size={17} /><span class={compact ? 'sr-only' : ''}>Dark</span>
	</button>
</div>
