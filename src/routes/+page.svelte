<script lang="ts">
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Profile from '#lib/components/sections/Profile.svelte';
	import WorkArchive from '#lib/components/sections/WorkArchive.svelte';
	import Experience from '#lib/components/sections/Experience.svelte';
	import TechnicalArchive from '#lib/components/sections/TechnicalArchive.svelte';
	import Education from '#lib/components/sections/Education.svelte';
	import Contact from '#lib/components/sections/Contact.svelte';
	import ThemeLaboratory from '#lib/components/theme/ThemeLaboratory.svelte';
</script>

<svelte:head>
	<title>Ali Bazizi — Full Stack Developer / Digital Identity</title>
	<meta
		name="description"
		content="Ali Bazizi, a Full Stack Developer and Software Engineer in Casablanca, Morocco. Explore SaaS experience, selected work, technical foundations, and a personal learning archive."
	/>
	<meta property="og:title" content="Ali Bazizi — Full Stack Developer" />
	<meta
		property="og:description"
		content="Interfaces, systems, and the human behind the code. A digital identity from Casablanca, Morocco."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<div class="portfolio-shell" id="top">
	<SiteHeader />
	<main id="main">
		<Hero /><Profile /><WorkArchive /><Experience /><TechnicalArchive /><Education /><Contact />
	</main>
	<SiteFooter />
</div>
<ThemeLaboratory />
<noscript
	><p class="noscript-notice">
		The portfolio content and contact links work without JavaScript. Enable JavaScript to explore
		and save color collections.
	</p></noscript
>
