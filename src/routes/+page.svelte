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

  type Game = 'cekani na input' | 'probiha' | 'konec'
  type Word = string

  let game: Game = 'cekani na input'
  let seconds = 30;
  let typedLetter = ''

  let words: Word[] = []
  let wordIndex = 0
  let letterIndex = 0
  let correctLetters = 0
  let toggleReset = false

  let wordsPerMinute = 0;
  let accuracy = 0;

  let wordsEl: HTMLDivElement
  let letterEl: HTMLSpanElement
  let inputEl: HTMLInputElement
  let caretEl: HTMLDivElement

  function resetGame() {
    toggleReset = !toggleReset
    
    setGameState('cekani na input')
    getWords(100)

    seconds = 30
    typedLetter = ''
    wordIndex = 0
    letterIndex = 0
    correctLetters = 0

    wordsPerMinute = 0
    accuracy = 0
  }

  function getWordsPerMInute(){
    const word = 5
    const minutes = 0.5
    return Math.floor(correctLetters / word / minutes)
  }

  function getAccuracy() {
    const totalLetters = getTotalLetters(words)
    return Math.floor((correctLetters / totalLetters) * 100)
  }

  function getTotalLetters(words: Word[]) {
    return words.reduce((count, word) => count + word.length, 0)
  }

function getResults() {
  wordsPerMinute = getWordsPerMInute();
  accuracy = getAccuracy();
  
  const newEntry = {
    username: '',
    ratio: wordsPerMinute / accuracy,
    date: new Date().toISOString(),
  };

  push(leaderboardRef, newEntry);
}

  function updateGameState() {
    setLetter()
    checkLetter()
    nextLetter()
    updateLine()
    resetLetter()
    moveCaret()
    focusInput()
  }

  function setLetter(){
    const isWordCompleted = letterIndex > words[wordIndex].length - 1
    
    if (!isWordCompleted){
        letterEl = wordsEl.children[wordIndex].children[letterIndex] as HTMLSpanElement
    }
  }

  function checkLetter() {
  const currentLetter = words[wordIndex][letterIndex];

  if (typedLetter === currentLetter && typedLetter !== ' ') {
    letterEl.dataset.letter = 'spravne';
    increaseScore();

    const originalAnimation = caretEl.style.animation;

    caretEl.style.animation = 'none';
    setTimeout(() => {
      caretEl.style.animation = 'blink 1.8s infinite';
    }, 500);
  }

  if (typedLetter !== currentLetter) {
    letterEl.dataset.letter = 'spatne';
  }
}

  function increaseScore(){
    correctLetters += 1
  }

  function nextLetter(){
    letterIndex += 1
  }

  function nextWord() {
  const isNotFirstLetter = letterIndex !== 0;
  const isOneLetterWord = words[wordIndex].length === 1;

  if (isNotFirstLetter || isOneLetterWord) {
    wordIndex += 1;
    letterIndex = 0;
    increaseScore();
    moveCaret();

    if (wordIndex < words.length) {
      letterEl = wordsEl.children[wordIndex].children[letterIndex] as HTMLSpanElement;
      moveCaret();
    }
  }
}

  function updateLine(){
    const wordEl = wordsEl.children[wordIndex]
    const wordsY = wordsEl.getBoundingClientRect().y
    const wordY = wordEl.getBoundingClientRect().y

    if (wordY > wordsY) {
      wordEl.scrollIntoView({ block: 'center' })
    }
  }

  function resetLetter(){
    typedLetter = ''
  }

  function moveCaret() {
  const offset = 4;
  caretEl.style.top = `${letterEl.offsetTop + offset}px`;

  if (letterIndex === 0) {
    caretEl.style.left = `${letterEl.offsetLeft}px`;
  } else {
    caretEl.style.left = `${letterEl.offsetLeft + letterEl.offsetWidth}px`;
  }
}

  function startGame() {
    setGameState('probiha')
    setGameTimer()
  }

  function setGameTimer() {
    function gameTimer() {
      if (seconds > 0) {
        seconds -= 1
      }

      if (game === 'cekani na input' || seconds === 0) {
        clearInterval(interval)
      }

      if (seconds === 0) {
        setGameState('konec')
        getResults()
      }
    }

    const interval = setInterval(gameTimer, 1000)
  }

  async function getWords(limit: number) {
    const response = await fetch(`/api/words?limit=${limit}`)
    words = await response.json()
  }

  function focusInput() {
    inputEl.focus()
  }

  function setGameState(state: Game){
    game = state
  }

function handleKeydown(event: KeyboardEvent) {
  const isLetter = /^[a-zA-Z]$/.test(event.key);

  if (isLetter && game === 'cekani na input') {
    startGame();
  }

  if (event.code === 'Space' && game === 'probiha') {
    event.preventDefault();
    nextWord();
    moveCaret(); 
  }
}
onMount(async () => {
  getWords(100);
  focusInput();

  const leaderboardSnapshot = await get(leaderboardRef, orderByChild('ratio'), limitToFirst(10));
  const leaderboardData = [];

  if (leaderboardSnapshot.exists()) {
    leaderboardSnapshot.forEach((childSnapshot) => {
      const entry = childSnapshot.val();
      leaderboardData.push(entry);
    });
  }

  const currentUserRatio = wordsPerMinute / accuracy;

  if (
    leaderboardData.length < 10 ||
    currentUserRatio > leaderboardData[leaderboardData.length - 1].ratio
  ) {
    const newEntry = {
      username: '',
      ratio: currentUserRatio,
      date: new Date().toISOString(),
    };

    const newLeaderboardRef = push(leaderboardRef);
    set(newLeaderboardRef, newEntry);

    const limitedLeaderboard = leaderboardData.concat(newEntry).sort((a, b) => b.ratio - a.ratio).slice(0, 10);

    set(leaderboardRef, limitedLeaderboard);
  }
});
</script>

{#if game !== 'konec'}
<div class="game" data-game={game}>
  <input
    bind:this={inputEl}
    bind:value={typedLetter}
    on:input={updateGameState}
    on:keydown={handleKeydown}
    class="input"
    type="text"
  />

  <div class="time">{seconds}</div>

  {#key toggleReset}
    <div bind:this={wordsEl} class="words">
    {#each words as word}
      <span class="word">
        {#each word as letter}
          <span class="letter">{letter}</span>
        {/each}
      </span>
    {/each}
    <div bind:this={caretEl} class="caret" />
    </div>
    {/key}
    <div class="reset">
      <button on:click={resetGame} aria-label="reset">
        reset
      </button>
    </div>
  </div>
{/if}

{#if game === 'konec'}
  <div class="results">
    <div>
      <p class="title">WPM</p>
      <p class="score">{Math.trunc(wordsPerMinute)}</p>
    </div>

    <div>
      <p class="title">Přesnost</p>
      <p class="score">{Math.trunc(accuracy)}%</p>
    </div>
    <button on:click={resetGame} class="play">Psát znovu</button>
  </div>
{/if}

<style lang="scss">
  .words {
    --line-height: 1.3em;
    --lines: 3;
    position: relative;
    width: 40%;
    max-height: calc(var(--line-height) * var(--lines) * 1.42);
    display: flex;
    flex-wrap: wrap;
    gap: 0.6em;
    font-size: 1.5rem;
    line-height: var(--line-height);
    overflow: hidden;
    user-select: none;
    justify-content: left;
    align-items: center;
    margin: 0 auto;

    .letter {
      opacity: 0.4;
      transition: all 0.3s ease;
    }
  }
  .word > :global(.letter[data-letter='spravne'])
      {
        opacity: 0.8;
      }

  .word > :global(.letter[data-letter='spatne'])
      {
        color: var(--primary);
        opacity: 1;
      }

  @keyframes blink {
    0%, 50%, 100% {
        opacity: 1;
    }
    25%, 75% {
    opacity: 0;
    }
  }
  .caret {
    display: block;
    position: absolute;
    height: 1.8rem;
    top: 0;
    left: -1px;
    border-right: 3px solid #6008c4;
    animation: blink 1.8s infinite;
    transition: all 0.2s ease;
  }

  .game {
    position: relative;
    margin: 0 auto;
    .input {
      position: absolute;
      opacity: 0;
    }

    .time {
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      color: var(--fg-100);
      opacity: 0;
      transition: all 0.3s ease;
    }

    &[data-game='probiha'] .time {
      opacity: 1;
    }

    .reset {
      width: 100%;
      display: grid;
      justify-content: center;
      margin-top: 2rem;
      padding-bottom: 30px;
    }
  }

  .results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
      font-size: 2rem;
      color: var(--fg-200);
    }

    .score {
      display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
      font-size: 4rem;
      color: var(--primary);
    }
    
    .play {
      margin-top: 1rem;
      padding-bottom: 30px;
    }
  }
</style>
