
export default {
  basePath: '/Proyecto-de-Salud-en-Telemedicina-TODO-18',
  allowedHosts: [],
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
