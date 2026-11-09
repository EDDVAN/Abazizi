<script lang="ts">
	import { portfolio } from '#lib/data/portfolio.js';
</script>

<section id="stack" class="technical-section section-pad" aria-labelledby="stack-title">
	<div class="section-index eyebrow">
		<span>04 / TECHNICAL ARCHIVE</span><span>TOOLS, NOT LIMITS</span>
	</div>
	<div class="section-heading-row">
		<h2 id="stack-title" class="editorial-heading">
			The right tool.<br /><span>The right problem.</span>
		</h2>
		<p>A toolkit across the stack. Selected around the requirements, not the other way around.</p>
	</div>
	<div class="skill-archive">
		{#each portfolio.skills as group, index (group.name)}<div class="skill-row">
				<div class="skill-row-heading">
					<span class="mono">0{index + 1}</span>
					<h3>{group.name}</h3>
					<span class="eyebrow skill-annotation">{group.annotation}</span>
				</div>
				<ul>
					{#each group.items as item (item)}<li>{item}</li>{/each}
				</ul>
			</div>{/each}
	</div>
</section>
