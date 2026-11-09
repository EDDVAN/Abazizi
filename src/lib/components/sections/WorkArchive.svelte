<script lang="ts">
	import { portfolio } from '#lib/data/portfolio.js';
	import StudyVisual from '#lib/components/ui/StudyVisual.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
</script>

<section id="work" class="work-section section-pad" aria-labelledby="work-title">
	<div class="section-index eyebrow">
		<span>02 / SELECTED WORK</span><span>BUILT & EXPLORED</span>
	</div>
	<div class="section-heading-row">
		<h2 id="work-title" class="editorial-heading">Behind the<br /><span>interface.</span></h2>
		<p>
			A selection of professional contributions and learning projects. Different challenges. The
			same curiosity.
		</p>
	</div>
	<div class="work-archive">
		{#each portfolio.work as work (work.id)}
			<article class={['work-entry', { 'work-featured': work.id === 'archiving' }]}>
				<div class="work-visual-wrap">
					<StudyVisual kind={work.visual} /><span class="work-number mono">/{work.number}</span>
				</div>
				<div class="work-copy">
					<div class="eyebrow work-category">{work.category}</div>
					<h3>{work.name}</h3>
					<p>{work.description}</p>
					<div class="work-meta mono"><span>{work.context}</span><span>{work.type}</span></div>
				</div>
			</article>
		{/each}
	</div>
	<div class="work-source-note">
		<p>Original conceptual schematics, not product screenshots.</p>
		<a class="inline-link" href={portfolio.github} target="_blank" rel="external noreferrer"
			>Explore my GitHub <Icon name="arrow" size={17} /><span class="sr-only">
				(opens in a new tab)</span
			></a
		>
	</div>
</section>
