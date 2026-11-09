<script lang="ts">
	import { getTheme } from '#lib/theme/context.js';
	import AppearanceToggle from '#lib/components/theme/AppearanceToggle.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	const theme = getTheme();
	let menuOpen = $state(false);
	const links = [
		{ href: '#profile', label: 'Profile' },
		{ href: '#work', label: 'Work' },
		{ href: '#experience', label: 'Experience' },
		{ href: '#stack', label: 'Stack' },
		{ href: '#education', label: 'Learning' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape' && menuOpen) {
			menuOpen = false;
			document.querySelector<HTMLButtonElement>('.mobile-menu-toggle')?.focus();
		}
	}}
/>

<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
	<a href="#top" class="brand-link" aria-label="Ali Bazizi, back to top"
		><span class="brand-symbol" aria-hidden="true">a<span>↗</span>b</span><span
			class="brand-caption mono">ALI BAZIZI<br /><span>DIGITAL IDENTITY</span></span
		></a
	>
	<nav class="desktop-navigation" aria-label="Main navigation">
		{#each links as link, index (link.href)}<a href={link.href}
				><span class="mono">0{index + 1}</span>{link.label}</a
			>{/each}
	</nav>
	<div class="header-tools">
		<div class="header-appearance"><AppearanceToggle compact /></div>
		<button
			class="laboratory-trigger"
			type="button"
			onclick={() => {
				theme.open = true;
				menuOpen = false;
			}}
			aria-haspopup="dialog"
			aria-controls="theme-laboratory"
			><span class="palette-mark" aria-hidden="true"><i></i><i></i><i></i></span><span
				>Color lab</span
			><span class="mono lab-count">10</span></button
		>
		<button
			class="icon-button mobile-menu-toggle"
			type="button"
			aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
			aria-expanded={menuOpen}
			aria-controls="mobile-navigation"
			onclick={() => (menuOpen = !menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button
		>
	</div>
	{#if menuOpen}
		<nav id="mobile-navigation" class="mobile-navigation" aria-label="Mobile navigation">
			{#each links as link, index (link.href)}<a href={link.href} onclick={() => (menuOpen = false)}
					><span class="mono">0{index + 1}</span>{link.label}<Icon /></a
				>{/each}
			<div class="mobile-appearance">
				<span class="eyebrow">APPEARANCE</span><AppearanceToggle />
			</div>
		</nav>
	{/if}
</header>
