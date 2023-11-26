export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.064a31fb.js","app":"_app/immutable/entry/app.1563eb32.js","imports":["_app/immutable/entry/start.064a31fb.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/singletons.30e3bc3d.js","_app/immutable/entry/app.1563eb32.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.13cae138.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/words",
				pattern: /^\/api\/words\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/words/_server.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
