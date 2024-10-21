<script>
	import { SquareChevronRight } from 'lucide-svelte';
</script>

<footer>
	<div class="flex justify-between items-center gap-24 p-20 bg-cream text-slate font-medium">
		<div class="flex flex-col gap-2 w-48">
			<SquareChevronRight class="w-24 h-24 " />
			<p>© 2024 Ali Bazizi.</p>
		</div>
		<div class="flex flex-col gap-2 flex-1">
			<ul>
				<li class="font-bold">Quick Links</li>
				<li><a href="/">Home</a></li>
				<li><a href="/">About</a></li>
				<li><a href="/">Tech</a></li>
				<li><a href="/">Contact</a></li>
			</ul>
		</div>
		<div class="flex flex-col gap-2 flex-1">
			This website is made using SvelteKit, TailwindCSS and Vite.
		</div>
	</div>
</footer>
