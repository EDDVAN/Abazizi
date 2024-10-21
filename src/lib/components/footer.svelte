<script>
	import { SquareChevronRight } from 'lucide-svelte';
</script>

<footer>
	<div
		class="flex justify-between items-center md:gap-24 md:p-20 gap-4 p-8 bg-cream text-slate font-medium"
	>
		<div class="flex flex-col gap-2 w-48 md:flex-grow-0 flex-grow">
			<SquareChevronRight class="w-24 h-24 " />
			<p>© 2024 Ali Bazizi.</p>
		</div>
		<!-- <div class="flex flex-col gap-2 flex-1 md:flex-grow-0 flex-grow">
			<ul>
				<li class="font-bold">Quick Links</li>
				<li><a href="#Home">Home</a></li>
				<li><a href="#About">About</a></li>
				<li><a href="#Tech">Tech</a></li>
				<li><a href="#Contact">Contact</a></li>
			</ul>
		</div> -->
		<div class="flex flex-col gap-2 flex-1 md:flex-grow-0 flex-grow">
			This website is made using SvelteKit, TailwindCSS and Vite.
		</div>
	</div>
</footer>
