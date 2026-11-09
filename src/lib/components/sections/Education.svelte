<script lang="ts">
	import { portfolio } from '#lib/data/portfolio.js';
</script>

<section id="education" class="education-section section-pad" aria-labelledby="education-title">
	<div class="section-index eyebrow">
		<span>05 / LEARNING ARCHIVE</span><span>ALWAYS IN PROGRESS</span>
	</div>
	<div class="section-heading-row">
		<h2 id="education-title" class="editorial-heading">
			Stay curious.<br /><span>Keep building.</span>
		</h2>
		<p>Formal foundations. Peer learning. A self-directed journey that keeps going.</p>
	</div>
	<div class="education-archive">
		{#each portfolio.education as entry (entry.id)}<article class="education-row">
				<div class="education-date mono">{entry.date}</div>
				<div class="education-qualification">
					<h3>{entry.title}</h3>
					<p>{entry.field}</p>
					{#if entry.institution}<span class="mono">{entry.institution}</span>{/if}
				</div>
				<p class="education-description">{entry.description}</p>
			</article>{/each}
	</div>
</section>
