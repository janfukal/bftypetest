<script>
  import { onMount } from 'svelte';
  import { getDatabase, ref, onValue } from 'firebase/database';

  let leaderboardData = [];
  let wpmAccuracyRatio = null;

  const database = getDatabase();
  const leaderboardRef = ref(database, 'leaderboard');

  onMount(() => {
    // Načítání dat ze žebříčku z Firebase
    onValue(leaderboardRef, (snapshot) => {
      leaderboardData = [];

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const entry = childSnapshot.val();
          leaderboardData.push(entry);
        });
      }
    });
  });

  // Vaše existující kód pro test (přizpůsobte ho podle potřeb)
  let wordsPerMinute = 0;
  let accuracy = 0;

  function getResults() {
    // ... Vaš kód pro získání výsledků testu ...

    // Výpočet WPM to accuracy ratio
    wpmAccuracyRatio = wordsPerMinute / accuracy;
  }
</script>

<style>
  /* Přidejte svůj styling zde */
  .leaderboards-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
</style>

<div class="leaderboards-container">
  <h2>Leaderboards</h2>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Username</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {#each leaderboardData as { rank, username, score }}
        <tr>
          <td>{rank}</td>
          <td>{username}</td>
          <td>{score}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if wpmAccuracyRatio !== null}
    <p>WPM to Accuracy Ratio: {wpmAccuracyRatio.toFixed(2)}</p>
  {/if}
</div>
