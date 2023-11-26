

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.7f93bf16.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.13cae138.js"];
export const stylesheets = ["_app/immutable/assets/0.bb0cab5b.css"];
export const fonts = [];
