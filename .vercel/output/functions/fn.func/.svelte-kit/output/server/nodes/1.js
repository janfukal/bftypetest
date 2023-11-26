

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.5ab1cf4c.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.13cae138.js","_app/immutable/chunks/singletons.30e3bc3d.js"];
export const stylesheets = [];
export const fonts = [];
