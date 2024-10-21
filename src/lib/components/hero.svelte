<script>
	import { FileUser, ChevronsDown, MapPinned } from 'lucide-svelte';
	import abazizi from '$lib/assets/abazizi.webp';
	import resume from '$lib/assets/abazizi.pdf';
</script>

<section
	class="flex md:flex-row flex-col-reverse md:h-[calc(100vh-5rem)] py-1 md:px-24 px-8 text-white"
	id="hero"
>
	<div class="md:w-1/2 w-full flex flex-col gap-4 justify-center">
		<FileUser class="w-8 h-8" />
		<h1 class="md:text-7xl text-3xl font-header">Introducing</h1>
		<h1 class="md:text-8xl text-6xl font-header">Ali Bazizi</h1>
		<h4 class="flex items-center gap-2 text-slate">
			<MapPinned class="w-4 h-4" />Casablanca, Morocco
		</h4>

		<p class="text-2xl font-sans text-slate pb-8">
			A 23 year old Full Stack Developer, I specialize in web development, over the past two years I
			worked on a variety of SaaS products, catering to our clients every need.
		</p>
		<div class="flex gap-4 pb-8">
			<a
				href={resume}
				download="ali bazizi resume.pdf"
				target="_blank"
				class="text-amber-900 font-bold bg-orangevariant flex justify-center items-center py-3 px-8"
				>Download Resume</a
			>
			<!-- <a
				href="#education"
				class="text-slate font-bold border-slate border-[1px] flex justify-center items-center py-3 px-8"
			>
				<div class="scroll-icon flex gap-2"><ChevronsDown class="w-6 h-6 " /></div>
				Scroll Down
			</a> -->
		</div>
	</div>
	<div class="md:w-1/2 w-full flex justify-center md:py-24">
		<div
			class="bgCircle relative overflow-hidden md:w-[38rem] md:h-[38rem] w-[18rem] h-[18rem] aspect-square bg-gradient-to-tr from-orange to-yellow rounded-full"
		>
			<img
				src={abazizi}
				alt="abazizi"
				class="absolute left-1/2 -translate-x-1/2 top-16 md:h-[38rem] h-[18rem] heroImage"
			/>
		</div>
	</div>
</section>

<style>
	@keyframes bobbingAnimation1 {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(0.1rem);
		}
		100% {
			transform: translateY(0);
		}
	}
	@keyframes bobbingAnimation2 {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(0.5rem);
		}
		100% {
			transform: translateY(0);
		}
	}
	@keyframes bobbingAnimation3 {
		0% {
			transform: translateY(0) translateX(-50%);
		}
		50% {
			transform: translateY(0.3rem) translateX(-50%);
		}
		100% {
			transform: translateY(0) translateX(-50%);
		}
	}
	/* .scroll-icon {
		animation: bobbingAnimation1 1.5s infinite;
	} */
	.bgCircle {
		animation: bobbingAnimation2 2.5s infinite;
	}
	.heroImage {
		animation: bobbingAnimation3 3.5s infinite;
	}
</style>
