<script>
	import { SquareChevronRight } from 'lucide-svelte';
</script>

<nav class="flex justify-between items-center h-20 py-1 px-24">
	<div class="flex items-center gap-4 text-white">
		<SquareChevronRight class="w-10 h-10" />
		<h1 class="text-3xl font-header cursor typewriter-animation">Ali Bazizi</h1>
	</div>
	<div class="flex justify-between items-center gap-8">
		<a href="/" class="text-gray-400">Home</a>
		<a href="/" class="text-gray-400">About</a>
		<a href="/" class="text-gray-400">Tech</a>
		<a href="/" class="text-gray-400">Contact</a>
		<a href="/" class="text-slate font-bold bg-white py-3 px-8">Previous Projects</a>
	</div>
</nav>

<style>
	.cursor {
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
	}
</style>
