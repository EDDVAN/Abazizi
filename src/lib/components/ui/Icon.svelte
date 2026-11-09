<script lang="ts">
	let {
		name = 'arrow',
		size = 20
	}: {
		name?: 'arrow' | 'up' | 'close' | 'sun' | 'moon' | 'menu' | 'download' | 'copy' | 'check';
		size?: number;
	} = $props();
	const paths = {
		arrow: 'M5 19 19 5M5 5h14v14',
		up: 'm5 12 7-7 7 7M12 5v14',
		close: 'm6 6 12 12M6 18 18 6',
		sun: 'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5',
		moon: 'M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z',
		menu: 'M4 8h16M4 16h16',
		download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
		copy: 'M9 9h11v12H9zM15 9V3H3v12h6',
		check: 'm5 12 4 4L19 6'
	};
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="square"
	stroke-linejoin="miter"
	aria-hidden="true"
>
	{#if name === 'sun'}<circle cx="12" cy="12" r="4" />{/if}
	<path d={paths[name]} />
</svg>
