<script lang="ts">
  import '../styles/app.scss'
</script>

<svelte:head>
  <title>bftypetest</title>
</svelte:head>

<div class="layout">
  <nav>
    <h1><a href="https://bftypetest.vercel.app/">bftypetest</a></h1>
    <div><a href="signup.php">Login | Register</a></div>
  </nav>
  
  <main>
    <slot />
  </main>

  <footer>
    <span>BF PROJECT @ Střední průmyslová škola Třebíč</span>
    <div>Jan Fukal | Tomáš Buriánek</div>
  </footer>
</div>

<style lang="scss">
  h1 {
    font-family: 'Lexend Deca', sans-serif;
    font-size: 1.8rem;
    color: var(--fg-200);
    letter-spacing: 2px;
  }

  .layout {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: center;
    padding: 2rem;
  }

  nav{
    color: var(--fg-200);
    display: flex;
    justify-content: space-between;
   
  }
  a{
    color: var(--fg-200);
    background-color: var(--bg-50);
    padding: 10px;
    border-radius: 10px;
    letter-spacing: 2px;
    
    &:link{
      text-decoration: none;
    }
  }
  
  footer{
    color: var(--fg-200);
    display: flex;
    justify-content: space-between;
  }
</style>
