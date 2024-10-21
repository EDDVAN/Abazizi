<script>
	import Footer from '$lib/components/footer.svelte';
	import Nav from '$lib/components/nav.svelte';
	import '../app.css';
</script>

<main class="flex flex-col min-h-screen bg-dark">
	<Nav />
	<slot />
	<Footer />
</main>
