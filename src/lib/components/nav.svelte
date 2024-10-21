<script>
	// import { SquareChevronRight } from 'lucide-svelte';
	let selected = 'Home';
</script>

<nav class="flex justify-center items-center md:h-20 py-1 md:px-24 h-16 sticky top-0 z-50 bg-dark">
	<div class="flex justify-around md:text-xl text-sm items-center md:w-1/2 md:gap-8 w-full gap-2">
		<a
			href="#hero"
			on:click={() => {
				selected = 'Home';
			}}
			class="links {selected == 'Home' && 'active'}">Home</a
		>
		<a
			href="#education"
			on:click={() => {
				selected = 'Eduction';
			}}
			class="links {selected == 'Eduction' && 'active'}">Eduction</a
		>
		<a
			href="#techstack"
			on:click={() => {
				selected = 'Tech';
			}}
			class="links {selected == 'Tech' && 'active'}">Tech Stack</a
		>
		<a
			href="#contact"
			on:click={() => {
				selected = 'Contact';
			}}
			class="links {selected == 'Contact' && 'active'}">Contact</a
		>
	</div>
</nav>

<style lang="postcss">
	.links {
		@apply text-gray-400;
	}
	.links:hover,
	.active {
		@apply bg-gradient-to-l;
		@apply font-semibold;
		@apply from-emerald;
		@apply via-lime;
		@apply to-orange;
		@apply bg-clip-text;
		@apply text-transparent;
	}
	/* .cursor {
		border-right: 2px solid rgba(255, 255, 255, 0.75);
	}
	.typewriter-animation {
		animation: blinkingCursor 500ms steps(50) infinite normal;
	}
	@keyframes blinkingCursor {
		from {
			border-right-color: rgba(255, 255, 255, 0.75);
		}
		to {
			border-right-color: transparent;
		}
	} */
</style>
