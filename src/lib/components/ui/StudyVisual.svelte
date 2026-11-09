<script lang="ts">
	let { kind }: { kind: string } = $props();
</script>

<div class={['study-visual', `study-${kind}`]} aria-hidden="true">
	<div class="study-coordinate mono">
		<span>CONCEPTUAL STUDY</span><span
			>{kind === 'archive' ? 'SYS / 01' : kind === 'shell' ? 'SYS / 02' : 'SYS / 03'}</span
		>
	</div>
	{#if kind === 'archive'}
		<svg viewBox="0 0 640 320" fill="none">
			<path
				class="study-gridline"
				d="M0 80h640M0 160h640M0 240h640M80 0v320M160 0v320M240 0v320M320 0v320M400 0v320M480 0v320M560 0v320"
			/>
			<g class="study-stroke"
				><path
					d="m124 100 100-44 100 44-100 46-100-46Zm0 38 100 46 100-46M124 176l100 46 100-46M124 214l100 46 100-46"
				/><path d="M324 100h76v100h60M324 214h76" stroke-dasharray="4 6" /><rect
					x="460"
					y="150"
					width="100"
					height="100"
				/><path d="M478 174h64M478 192h46M478 210h55M478 228h32" /></g
			>
			<circle class="study-accent-fill" cx="400" cy="150" r="5" /><path
				class="study-accent-stroke"
				d="m213 99 11 5 11-5M215 111l9 4 9-4"
			/>
		</svg>
		<div class="study-bottom mono"><span>DOCUMENTS</span><span>CONNECTED ARCHIVE ↗</span></div>
	{:else if kind === 'shell'}
		<svg viewBox="0 0 640 320" fill="none">
			<path
				class="study-gridline"
				d="M0 80h640M0 160h640M0 240h640M80 0v320M160 0v320M240 0v320M320 0v320M400 0v320M480 0v320M560 0v320"
			/>
			<path
				class="study-stroke"
				d="m115 108 58 52-58 52M215 212h92M390 87h80v146h-80M470 160h70M350 160h40"
			/>
			<rect class="study-accent-fill" x="276" y="206" width="32" height="8" /><path
				class="study-accent-stroke"
				d="M95 66h-25v190h25M545 66h25v190h-25"
			/>
		</svg>
		<div class="study-bottom mono"><span>INPUT / INTERPRET / EXECUTE</span><span>UNIX</span></div>
	{:else}
		<svg viewBox="0 0 640 320" fill="none">
			<path
				class="study-gridline"
				d="M0 80h640M0 160h640M0 240h640M80 0v320M160 0v320M240 0v320M320 0v320M400 0v320M480 0v320M560 0v320"
			/>
			<path
				class="study-stroke"
				d="M108 50h178v74h-68v122h-110V50ZM432 52h92v72h-40v124h-108v-64h56V52Z"
			/>
			<g class="study-rays"
				><path
					d="m320 260-34-136m34 136 4-200m-4 200 44-200m-44 200 88-200m-88 200 112-136m-112 136 112-92"
				/></g
			>
			<circle class="study-accent-fill" cx="320" cy="260" r="7" /><circle
				class="study-accent-stroke"
				cx="320"
				cy="260"
				r="18"
			/>
		</svg>
		<div class="study-bottom mono"><span>SPACE → PERSPECTIVE</span><span>3D</span></div>
	{/if}
</div>
