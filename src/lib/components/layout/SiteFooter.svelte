<script lang="ts">
	import { getTheme } from '#lib/theme/context.js';
	import Icon from '#lib/components/ui/Icon.svelte';
	const theme = getTheme();
</script>

<footer class="site-footer">
	<div class="footer-identity">
		<span class="footer-monogram" aria-hidden="true">ab↗</span><span class="mono"
			>© {new Date().getFullYear()} ALI BAZIZI<br />CASABLANCA, MOROCCO</span
		>
	</div>
	<button class="footer-theme mono" type="button" onclick={() => (theme.open = true)}
		><span class="status-square"></span>{theme.current.name.toUpperCase()} / {theme.appearance.toUpperCase()}<span
			>{theme.label.toUpperCase()} ↗</span
		></button
	><a class="back-top mono" href="#top">BACK TO TOP <Icon name="up" size={17} /></a>
</footer>
