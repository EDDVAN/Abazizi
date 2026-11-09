<script lang="ts">
	import { asset } from '$app/paths';
	import { portfolio } from '#lib/data/portfolio.js';
</script>

<section id="experience" class="experience-section section-pad" aria-labelledby="experience-title">
	<div class="section-index eyebrow"><span>03 / EXPERIENCE</span><span>IN PRACTICE</span></div>
	<div class="experience-intro">
		<h2 id="experience-title" class="editorial-heading">
			Real needs.<br /><span>Useful systems.</span>
		</h2>
		<p>{portfolio.experience.summary}</p>
	</div>
	<div class="experience-record section-grid">
		<div class="experience-date mono">
			{portfolio.experience.dates}<span class="record-label">01 / PROFESSIONAL RECORD</span>
		</div>
		<div class="experience-role">
			<h3>{portfolio.experience.company}</h3>
			<p>{portfolio.experience.role}</p>
			<div class="industry-list mono">
				<span>SALES</span><span>FINANCE</span><span>PROJECT TRACKING</span>
			</div>
		</div>
		<div class="experience-details">
			<ul>
				{#each portfolio.experience.responsibilities as responsibility (responsibility)}<li>
						{responsibility}
					</li>{/each}
			</ul>
			<div class="contributions">
				<h4 class="eyebrow">NOTABLE CONTRIBUTIONS</h4>
				{#each portfolio.experience.contributions as contribution (contribution)}<p>
						<span aria-hidden="true">↗</span>{contribution}
					</p>{/each}
			</div>
		</div>
	</div>
	<p class="source-caption mono">
		ROLE AND DATES AS LISTED IN THE <a href={asset(portfolio.resume)}>LINKED RÉSUMÉ ↗</a>
	</p>
</section>
