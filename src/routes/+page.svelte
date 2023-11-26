<script lang="ts">
  import{ onMount } from 'svelte'

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
    wordsPerMinute = getWordsPerMInute()
    accuracy = getAccuracy()
  }

  function updateGameState() {
    setLetter()
    checkLetter()
    nextLetter()
    updateLine()
    resetLetter()
    moveCaret()
  }

  function setLetter(){
    const isWordCompleted = letterIndex > words[wordIndex].length - 1
    
    if (!isWordCompleted){
        letterEl = wordsEl.children[wordIndex].children[letterIndex] as HTMLSpanElement
    }
  }

  function checkLetter(){
    const currentLetter = words[wordIndex][letterIndex]

    if (typedLetter === currentLetter){
        letterEl.dataset.letter = 'spravne'
        increaseScore()
    }

    if (typedLetter !== currentLetter){
        letterEl.dataset.letter = 'spatne'
    }
  }

  function increaseScore(){
    correctLetters += 1
  }

  function nextLetter(){
    letterIndex += 1
  }

  function nextWord() {
    const isNotFirstLetter = letterIndex !== 0
    const isOneLetterWord = words[wordIndex].length === 1

    if (isNotFirstLetter || isOneLetterWord) {
      wordIndex += 1
      letterIndex = 0
      increaseScore()
      moveCaret()
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
    const offset = 4
    caretEl.style.top = `${letterEl.offsetTop + offset}px`
    caretEl.style.left = `${letterEl.offsetLeft + letterEl.offsetWidth}px`
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
    if (event.code == 'Space')
    {
        event.preventDefault()
        if (game === 'probiha') 
        {
          nextWord()
        }
    }

    if (game === 'cekani na input')
    {
        startGame()
    }
  }
  onMount(async () => {
    getWords(100)
    focusInput()
  })
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

    width: 100%;
    max-height: calc(var(--line-height) * var(--lines) * 1.42);
    display: flex;
    flex-wrap: wrap;
    gap: 0.6em;
    position: relative;
    font-size: 1.5rem;
    line-height: var(--line-height);
    overflow: hidden;
    user-select: none;

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
  .caret {
    position: absolute;
    height: 1.8rem;
    top: 0;
    border-right: 1px solid var(--primary);
    animation: caret 1s infinite;
    transition: all 0.2s ease;
  }

  .game {
    position: relative;

    .input {
      position: absolute;
      opacity: 0;
    }

    .time {
      position: absolute;
      top: -48px;
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
    }
  }

  .results {
    .title {
      font-size: 2rem;
      color: var(--fg-200);
    }

    .score {
      font-size: 4rem;
      color: var(--primary);
    }
    
    .play {
      margin-top: 1rem;
    }
  }
</style>
