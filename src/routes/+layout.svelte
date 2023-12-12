<script lang="ts">
  import { onMount } from 'svelte';
  import '../styles/app.scss';
  import trophyIcon from './icons/trophy.png';
  import userIcon from './icons/user.png';
  import igIcon from './icons/instagram.png';
  import { navigate } from 'svelte-routing';
  import Leaderboards from './leaderboards/+page.svelte';

  import { initializeApp } from 'firebase/app';
  import { getAnalytics, isSupported } from 'firebase/analytics';
  import { getAuth, type User } from 'firebase/auth';
  import { getDatabase, ref, push, orderByChild, limitToFirst } from 'firebase/database';

  
  // FIREBASE konfigurace -------------------------------------------------------//
  const firebaseConfig = {
  apiKey: "AIzaSyDueIpbx9sx7T1QEhIjqhmaYMpLOzvfAbo",
  authDomain: "bftypetest.firebaseapp.com",
  projectId: "bftypetest",
  storageBucket: "bftypetest.appspot.com",
  messagingSenderId: "312410173260",
  appId: "1:312410173260:web:29d60c54205af064af29e9",
  measurementId: "G-7TFH8FE0FF"
  };
//-------------------------------------------------------------------------------//
  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);
  const leaderboardRef = ref(database, 'leaderboard');
//-------------------------------------------------------------------------------//

  let analytics;
  let user: User | null;
  
  onMount( () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      user = authUser;
    });

    return unsubscribe;
  });
</script>

<svelte:head>
  <title>bftypetest</title>
</svelte:head>

<div class="layout">

  <nav>
    <ul>
      <li class="logo"><a href="/"><h1>bftypetest</h1></a></li>
      <li><a href="leaderboards"><img src={trophyIcon} alt="Trophy Icon" /> </a></li>
      <li>
        {#if user}
          <a href="profile"><img src={userIcon} alt="User Icon" /> Profile</a>
        {:else}
          <a href="login"><img src={userIcon} alt="User Icon" /> Login</a>
        {/if}
      </li>
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
    display: flex;
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
    text-decoration: none;
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
    font-size: 12px;
  }
  footer ul{
    list-style: none;
    display: flex;
    justify-content: right;
    align-items: center;
    
  }
  footer ul li a img{
    width: 15px;
  } 
</style>
