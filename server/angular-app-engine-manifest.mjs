
export default {
  basePath: 'https://danielonofre1234.github.io/Proyecto-de-Salud-en-Telemedicina-TODO-18',
  allowedHosts: [],
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
