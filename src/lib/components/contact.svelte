<script lang="ts">
	import { Linkedin, Signature, Github, Phone, AtSign } from 'lucide-svelte';
	const handleCopy = (textToCopy: string) => {
		if (textToCopy === 'email') {
			navigator.clipboard.writeText(email);
			emailPlaceholder = 'copied';
			setTimeout(() => {
				emailPlaceholder = 'copy';
			}, 1000);
		} else if (textToCopy === 'phone') {
			navigator.clipboard.writeText(phone);
			phonePlaceholder = 'copied';
			setTimeout(() => {
				phonePlaceholder = 'copy';
			}, 1000);
		}
	};
	let email = 'bazizi.ali0@gmail.com';
	let phone = '+212 635-259217';
	let emailPlaceholder = 'copy';
	let phonePlaceholder = 'copy';
</script>

<section
	class="flex flex-col justify-center md:h-[calc(50vh)] h-fit text-cream md:px-24 px-8 gap-8 py-10 border-y-[1px] border-slate"
	id="contact"
>
	<div class="flex flex-col justify-center gap-4">
		<Signature class="w-8 h-8" />
		<h1 class="text-7xl font-header">Contact</h1>
		<h3 class="text-xl text-slate">Feel free to contact me</h3>
	</div>
	<div class="flex md:flex-row flex-col justify-around items-center md:h-full h-fit gap-4 py-4">
		<a
			href="https://www.linkedin.com/in/ali-bazizi-b74668224/"
			class="flex justify-center gap-4 py-4 px-16"
			target="_blank"
		>
			<Linkedin class="w-6 h-6" />
			<h1 class="">@AliBazizi</h1>
		</a>
		<a
			href="https://github.com/EDDVAN/"
			class="flex justify-center gap-4 py-4 px-16"
			target="_blank"
		>
			<Github class="w-6 h-6" />
			<h1 class="">@EDDVAN</h1>
		</a>
		<button
			on:click={() => handleCopy('phone')}
			class="flex justify-center gap-4 py-4 px-16 relative links"
		>
			<Phone class="w-6 h-6" />
			<h1 class="">{phone}</h1>
			<span
				class="whitespace-nowrap hidden rounded-full bg-darkvariant px-2.5 py-0.5 text-sm text-slate absolute top-0 right-0 duration-150 ease-in-out"
			>
				{phonePlaceholder}
			</span>
		</button>
		<button
			on:click={() => handleCopy('email')}
			class="flex justify-center gap-4 py-4 px-16 relative links"
		>
			<AtSign class="w-6 h-6" />
			<h1 class="">{email}</h1>
			<span
				class="whitespace-nowrap hidden rounded-full bg-darkvariant px-2.5 py-0.5 text-sm text-slate absolute top-0 right-0 duration-150 ease-in-out"
			>
				{emailPlaceholder}
			</span>
		</button>
	</div>
</section>

<style lang="scss">
	.links:hover {
		& > span {
			display: block;
		}
	}
</style>
