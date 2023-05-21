<script lang="ts">
</script>

<section>
  <nav>
    <div id="about"><span>A</span>bout</div>
    <div id="education"><span>E</span>ducation & <span>E</span>xperience</div>
    <div id="tech"><span>T</span>ech <span>S</span>tack</div>
  </nav>
  <article />
</section>

<style lang="scss">
  section {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    scroll-snap-align: start;
  }
  nav {
    width: 100%;
    height: 10hv;
    padding: 0 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    font-size: 250%;
    color: black;
    gap: 0.75rem;
    z-index: 2;
    & > #about {
      border-top: 1rem solid #e91312;
      & > span {
        color: #e91312;
        font-weight: 600;
      }
    }
    & > #education {
      border-top: 1rem solid #ff890d;
      & > span {
        color: #ff890d;
        font-weight: 600;
      }
    }
    & > #tech {
      border-top: 1rem solid #06e8e4;
      & > span {
        color: #06e8e4;
        font-weight: 600;
      }
    }
    & > div {
      background-color: white;
      padding: 1rem 2rem;
      box-sizing: border-box;
    }
  }
  article {
    z-index: 1;
    height: 90vh;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
    background-color: white;
    outline: 1rem solid #e91312;
  }
</style>
