<script lang="ts">
  import '../styles/app.scss'
  import trophyIcon from './icons/trophy.png';
  import userIcon from './icons/user.png';
  import igIcon from './icons/instagram.png';
</script>
<svelte:head>
  <title>bftypetest</title>
</svelte:head>

<div class="layout">

  <nav>
    <ul>
      <li class="logo"><a href="/"><h1>bftypetest</h1></a></li>
      <li><a href="leaderboards.php"><img src={trophyIcon} alt="Trophy Icon" /> </a></li>
      <li><a href="signup.php"> <img src={userIcon} alt="User Icon" /> </a></li>
    </ul>
  </nav>

  <main>
    <slot />
  </main>

  <footer>
    <ul>
      <li><a href="https://www.instagram.com/bflmpsvz.dev/" target="_blank"> <img src={igIcon} alt="Instagram Icon" /> </a></li>
      <li>bflmpsvz @ Střední průmyslová škola Třebíč</li>
    </ul>
  </footer>

</div>
<style lang="scss">
  .layout {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: center;
  }
  img{
    width: 20px;
    filter: invert(100);
    margin-top: 6px;
  }
  nav{
    background-color: rgb(36,36,36);
    height: 60px;
    margin-bottom: 55px;
  }
  nav ul{
    list-style: none;
    display: flex; /* Add display: flex; to make list items appear in a row */
    justify-content: center;
    align-items: center;
  }
  nav ul li{
    display: flex;
  }
  .logo {
    margin-right: 10px;
  }
  a {
    color: var(--fg-200);
    padding: 10px;
    letter-spacing: 2px;
    text-decoration: none; /* Move this line outside of &:link */
  }
  a:hover{
    filter: brightness(40%);
    transition: .1s;
  }
  footer{
    color: var(--fg-200);
    justify-content: right;
    margin: 20px;
    padding: 0;
  }
  footer ul{
    list-style: none;
    display: flex; /* Add display: flex; to make list items appear in a row */
    justify-content: right;
    align-items: center;
  }
</style>
