<script lang="ts">
  import Top from "./lib/top.svelte";
  import Bottom from "./lib/bottom.svelte";
</script>

<main>
  <Top />
  <Bottom />
</main>

<style lang="scss">
  main {
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-snap-type: y mandatory;
    box-sizing: border-box;
  }
</style>
