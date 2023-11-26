

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.fca125ac.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.13cae138.js"];
export const stylesheets = ["_app/immutable/assets/2.ed98018b.css"];
export const fonts = [];
