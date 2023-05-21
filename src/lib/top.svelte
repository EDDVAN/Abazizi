<script lang="ts">
</script>

<section>
  <div id="left">
    <h3 id="top-h3">My name is</h3>
    <h1>BAZIZI ALI</h1>
    <h3 id="bot-h3">And I'm a <span>Web Developer</span></h3>
  </div>
  <div id="right">
    <img src="/i.png" alt="Bazizi Ali" />
  </div>
</section>

<style lang="scss">
  section {
    width: 100%;
    height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    place-items: center;
    scroll-snap-align: start;
    justify-content: space-around;
    & > #left {
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 0 10rem;
      cursor: pointer;
      & > * {
        padding: 0;
        margin: 0;
      }
      & > #top-h3 {
        text-align: left;
      }
      & > #bot-h3 {
        text-align: right;
      }
      & > h3 {
        font-size: 150%;
        font-family: "Phudu", cursive;
        font-weight: 300;
        & > span {
          font-weight: 600;
        }
      }
      & > h1 {
        font-size: 800%;
        font-family: "Qualy", cursive;
      }
    }
    & > #right {
      place-items: center;
      & > img {
        height: 50rem;
      }
    }
  }
</style>
