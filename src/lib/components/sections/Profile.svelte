<script lang="ts">
	import { portfolio } from '#lib/data/portfolio.js';
</script>

<section
	id="profile"
	class="profile-section section-grid section-pad"
	aria-labelledby="profile-title"
>
	<div class="section-index eyebrow"><span>01 / PROFILE</span><span>THE WAY I WORK</span></div>
	<h2 id="profile-title" class="editorial-heading">
		From an idea.<br />To a <span>working system.</span>
	</h2>
	<div class="profile-copy">
		<p class="lead-copy">{portfolio.summary}</p>
		<p>{portfolio.approach}</p>
		<a class="inline-link" href="#experience"
			>The experience behind the work <span aria-hidden="true">↗</span></a
		>
	</div>
	<div class="profile-principle">
		<span class="eyebrow">PRACTICE / END TO END</span>
		<p>Understand.<br />Build.<br /><span>Keep improving.</span></p>
		<span class="mono">CLIENT NEEDS → WORKING SOLUTIONS</span>
	</div>
	<div class="language-archive">
		<span class="eyebrow">LANGUAGES / CONNECTIONS</span>
		<dl>
			{#each portfolio.languages as language (language.name)}<div>
					<dt>{language.name}</dt>
					<dd>{language.level}</dd>
				</div>{/each}
		</dl>
	</div>
</section>
