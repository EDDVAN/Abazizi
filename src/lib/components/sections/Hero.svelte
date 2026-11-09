<script lang="ts">
	import { asset } from '$app/paths';
	import { portfolio } from '#lib/data/portfolio.js';
	import Icon from '#lib/components/ui/Icon.svelte';
</script>

<section class="hero section-grid" aria-labelledby="identity-title">
	<div class="hero-kicker eyebrow">
		<span class="status-square"></span> FULL STACK DEVELOPER
		<span class="hero-edition">PERSONAL INDEX / 001</span>
	</div>
	<div class="hero-name">
		<h1 id="identity-title">
			<span>ALI</span><span>BAZIZI<span class="name-period">.</span></span>
		</h1>
		<span class="hero-name-annotation mono" aria-hidden="true">[ HUMAN BEHIND THE CODE ]</span>
	</div>
	<figure class="identity-portrait">
		<div class="portrait-topline mono"><span>FIG. 01 / THE DEVELOPER</span><span>AB—01</span></div>
		<div class="portrait-stage">
			<div class="portrait-grid" aria-hidden="true"></div>
			<div class="portrait-orbit" aria-hidden="true"><span></span><span></span></div>
			<img
				src={asset('images/ali-bazizi-960.webp')}
				srcset={`${asset('images/ali-bazizi-480.webp')} 480w, ${asset('images/ali-bazizi-960.webp')} 960w`}
				sizes="(max-width: 700px) 85vw, 35vw"
				alt="Ali Bazizi"
				width="960"
				height="1210"
				fetchpriority="high"
			/>
			<span class="portrait-cross cross-tl" aria-hidden="true">+</span><span
				class="portrait-cross cross-tr"
				aria-hidden="true">+</span
			><span class="portrait-cross cross-bl" aria-hidden="true">+</span><span
				class="portrait-cross cross-br"
				aria-hidden="true">+</span
			>
			<span class="portrait-side-label mono" aria-hidden="true">INTERFACE / SYSTEM / HUMAN</span>
		</div>
		<figcaption class="portrait-bottomline mono">
			<span>CASABLANCA, MOROCCO</span><span>↗ FULL STACK</span>
		</figcaption>
	</figure>
	<div class="hero-introduction">
		<p>{portfolio.introduction}</p>
		<div class="hero-actions">
			<a href="#work" class="button button-accent">Explore my work <Icon /></a><a
				href={asset(portfolio.resume)}
				class="resume-link"
				download>Résumé <Icon name="download" size={17} /></a
			>
		</div>
	</div>
	<div class="hero-footer mono">
		<span>WEB DEVELOPMENT / SAAS / SYSTEMS</span><a href="#profile"
			>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a
		>
	</div>
</section>
