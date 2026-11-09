<script lang="ts">
	import { collections } from '#lib/data/themes.js';
	import { getTheme } from '#lib/theme/context.js';
	import AppearanceToggle from './AppearanceToggle.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	const theme = getTheme();
	function manageDialog(dialog: HTMLDialogElement) {
		if (theme.open && !dialog.open) dialog.showModal();
		if (!theme.open && dialog.open) dialog.close();
	}
	function close() {
		theme.open = false;
	}
</script>

<dialog
	id="theme-laboratory"
	{@attach manageDialog}
	class="theme-laboratory"
	aria-labelledby="laboratory-title"
	aria-describedby="laboratory-description"
	onclose={close}
>
	<div class="laboratory-heading">
		<div class="eyebrow"><span class="status-square"></span> IDENTITY SYSTEM / 10 × 02</div>
		<button
			class="icon-button close-laboratory"
			type="button"
			aria-label="Close color laboratory"
			onclick={close}><Icon name="close" /></button
		>
		<h2 id="laboratory-title">A different<br /><span>frequency.</span></h2>
		<p id="laboratory-description">
			Ten collections. Two appearances. Find the one that feels like you.
		</p>
	</div>
	<div class="laboratory-appearance">
		<span class="eyebrow">01 / APPEARANCE</span>
		<AppearanceToggle />
	</div>
	<div class="laboratory-scroll">
		<div class="laboratory-section-label eyebrow">
			<span>02 / COLOR COLLECTION</span><span>SELECT TO PREVIEW</span>
		</div>
		<div class="collection-grid" role="group" aria-label="Color collections">
			{#each collections as collection, index (collection.id)}
				<button
					type="button"
					class="collection-option"
					aria-label={`Preview ${collection.name}`}
					aria-pressed={theme.collection === collection.id}
					onclick={() => theme.preview(collection.id)}
					data-collection-option={collection.id}
				>
					<div class="collection-swatch" aria-hidden="true">
						{#each Object.values(collection.colors) as color (color.name)}<span
								style:--swatch={color.value}
							></span>{/each}
					</div>
					<div class="collection-name">
						<span>{collection.name}</span><span class="collection-index mono"
							>{theme.collection === collection.id ? '✓' : String(index + 1).padStart(2, '0')}</span
						>
					</div>
					<p>{collection.personality}</p>
					<div class="collection-previews" aria-hidden="true">
						<span
							style:--sample-bg={collection.light['color-background']}
							style:--sample-fg={collection.light['color-text']}>Aa <span>LIGHT</span></span
						>
						<span
							style:--sample-bg={collection.dark['color-background']}
							style:--sample-fg={collection.dark['color-text']}>Aa <span>DARK</span></span
						>
					</div>
				</button>
			{/each}
		</div>
	</div>
	<div class="laboratory-footer">
		<div class="laboratory-current">
			<span class="eyebrow">{theme.label.toUpperCase()}</span><strong
				>{theme.current.name} <span>/ {theme.appearance}</span></strong
			>
		</div>
		<p class="laboratory-status" role="status" aria-live="polite">{theme.message}</p>
		<button
			class="button button-accent lock-theme"
			type="button"
			onclick={() => theme.lock()}
			data-testid="lock-theme">Lock this theme <Icon name="check" size={18} /></button
		>
		<div class="laboratory-secondary-actions">
			<button
				type="button"
				class="text-button"
				disabled={!theme.committed}
				onclick={() => theme.returnToLocked()}
				data-testid="restore-theme">Return to locked theme</button
			>
			<button
				type="button"
				class="text-button"
				onclick={() => theme.reset()}
				data-testid="reset-theme">Reset to default</button
			>
		</div>
		{#if theme.committed}<p class="saved-preference mono">
				LOCKED: {collections.find((item) => item.id === theme.committed?.collection)?.name} / {theme
					.committed.appearance}
			</p>{/if}
	</div>
</dialog>
