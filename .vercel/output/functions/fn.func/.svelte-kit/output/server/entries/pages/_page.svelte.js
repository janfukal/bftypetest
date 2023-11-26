import { c as create_ssr_component, d as add_attribute, e as escape, f as each } from "../../chunks/ssr.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.words.svelte-1y9o4x6.svelte-1y9o4x6{--line-height:1.3em;--lines:3;width:100%;max-height:calc(var(--line-height) * var(--lines) * 1.42);display:flex;flex-wrap:wrap;gap:0.6em;position:relative;font-size:1.5rem;line-height:var(--line-height);overflow:hidden;user-select:none}.words.svelte-1y9o4x6 .letter.svelte-1y9o4x6{opacity:0.4;transition:all 0.3s ease}.word.svelte-1y9o4x6>.letter[data-letter="spravne"]{opacity:0.8}.word.svelte-1y9o4x6>.letter[data-letter="spatne"]{color:var(--primary);opacity:1}.caret.svelte-1y9o4x6.svelte-1y9o4x6{position:absolute;height:1.8rem;top:0;border-right:1px solid var(--primary);animation:caret 1s infinite;transition:all 0.2s ease}.game.svelte-1y9o4x6.svelte-1y9o4x6{position:relative}.game.svelte-1y9o4x6 .input.svelte-1y9o4x6{position:absolute;opacity:0}.game.svelte-1y9o4x6 .time.svelte-1y9o4x6{position:absolute;top:-48px;font-size:1.5rem;color:var(--fg-100);opacity:0;transition:all 0.3s ease}.game[data-game=probiha].svelte-1y9o4x6 .time.svelte-1y9o4x6{opacity:1}.game.svelte-1y9o4x6 .reset.svelte-1y9o4x6{width:100%;display:grid;justify-content:center;margin-top:2rem}.results.svelte-1y9o4x6 .title.svelte-1y9o4x6{font-size:2rem;color:var(--fg-200)}.results.svelte-1y9o4x6 .score.svelte-1y9o4x6{font-size:4rem;color:var(--primary)}.results.svelte-1y9o4x6 .play.svelte-1y9o4x6{margin-top:1rem}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let game = "cekani na input";
  let seconds = 30;
  let typedLetter = "";
  let words = [];
  let wordsEl;
  let inputEl;
  let caretEl;
  $$result.css.add(css);
  return `${`<div class="game svelte-1y9o4x6"${add_attribute("data-game", game, 0)}><input class="input svelte-1y9o4x6" type="text"${add_attribute("this", inputEl, 0)}${add_attribute("value", typedLetter, 0)}> <div class="time svelte-1y9o4x6">${escape(seconds)}</div> <div class="words svelte-1y9o4x6"${add_attribute("this", wordsEl, 0)}>${each(words, (word) => {
    return `<span class="word svelte-1y9o4x6">${each(word, (letter) => {
      return `<span class="letter svelte-1y9o4x6">${escape(letter)}</span>`;
    })} </span>`;
  })} <div class="caret svelte-1y9o4x6"${add_attribute("this", caretEl, 0)}></div></div> <div class="reset svelte-1y9o4x6"><button aria-label="reset" data-svelte-h="svelte-iepo4c">reset</button></div></div>`} ${``}`;
});
export {
  Page as default
};
