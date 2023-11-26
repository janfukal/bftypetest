import { c as create_ssr_component } from "../../chunks/ssr.js";
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: 'h1.svelte-cxizno{font-family:"Lexend Deca", sans-serif;font-size:1.8rem;color:var(--fg-200);letter-spacing:2px}.layout.svelte-cxizno{height:100%;display:grid;grid-template-rows:auto 1fr;align-items:center;padding:2rem}nav.svelte-cxizno{color:var(--fg-200);display:flex;justify-content:space-between}a.svelte-cxizno{color:var(--fg-200);background-color:var(--bg-50);padding:10px;border-radius:10px;letter-spacing:2px}a.svelte-cxizno:link{text-decoration:none}footer.svelte-cxizno{color:var(--fg-200);display:flex;justify-content:space-between}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1ghzuyd_START -->${$$result.title = `<title>bftypetest</title>`, ""}<!-- HEAD_svelte-1ghzuyd_END -->`, ""} <div class="layout svelte-cxizno"><nav class="svelte-cxizno" data-svelte-h="svelte-iccqrk"><h1 class="svelte-cxizno"><a href="https://bftypetest.vercel.app/" class="svelte-cxizno">bftypetest</a></h1> <div><a href="signup.php" class="svelte-cxizno">Login | Register</a></div></nav> <main>${slots.default ? slots.default({}) : ``}</main> <footer class="svelte-cxizno" data-svelte-h="svelte-fplg82"><span>BF PROJECT @ Střední průmyslová škola Třebíč</span> <div>Jan Fukal | Tomáš Buriánek</div></footer> </div>`;
});
export {
  Layout as default
};
