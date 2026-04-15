
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Proyecto-de-Salud-en-Telemedicina-TODO-18/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/login"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/register"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/forgot-password"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/appointments"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/patients"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/history"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/video-session"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/psychologist"
  },
  {
    "renderMode": 2,
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/admin"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Proyecto-de-Salud-en-Telemedicina-TODO-18",
    "route": "/Proyecto-de-Salud-en-Telemedicina-TODO-18/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 796, hash: 'e102cdec747c2733a008417190fd19c02c7987b9b574cdcbd9603c0daefc248b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1050, hash: 'a4f4155bcb875c52c98358cf6296a33ba464cedc1da224fe7027ea57aec6c057', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 5999, hash: '714db6ec8a36a37b95a8a5d990cc807ac8d213e9deddf4a89f282e0748736c95', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'index.html': {size: 10214, hash: 'c64d70b4837ed74ad20bc3e4dafe04563f134f67d5501d4491152b78fc72e780', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'history/index.html': {size: 4695, hash: 'c8fb4f42b3045e8314bdf442ab69e0d48338661c16dd8bb9c34ce80a727e1f70', text: () => import('./assets-chunks/history_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 9155, hash: 'c368e6d5b79388f29d508023dfcdb780b690ea76b8be15aa46a1cf7efa2beb93', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'psychologist/index.html': {size: 10925, hash: '235b0adad46e59c177e2f2e5dc3dd57cad716dadde45dfb3042088815e035bfc', text: () => import('./assets-chunks/psychologist_index_html.mjs').then(m => m.default)},
    'appointments/index.html': {size: 9905, hash: 'd56e88593c543efa6745b61139f8eac9953d7f931a224096124fd390d9d40304', text: () => import('./assets-chunks/appointments_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 4074, hash: '4f456159cc6ab037148156b5c369797ae1340d8016a96a240a808387c24155e5', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'video-session/index.html': {size: 3009, hash: 'c46368e55cde83ba56ea449a117cbb63b4fcd128c607f023f3d9b02f9445c314', text: () => import('./assets-chunks/video-session_index_html.mjs').then(m => m.default)},
    'patients/index.html': {size: 4143, hash: 'bf325ce88c0a8b5d4ebc7c198b27474f3a69e40ce105dbf9a206b5f3db15f21c', text: () => import('./assets-chunks/patients_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 6581, hash: '465816f04ef997f3ff2477479631cb9cc669fc57b69ff7a1dd04a44f515b1763', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 10214, hash: 'c64d70b4837ed74ad20bc3e4dafe04563f134f67d5501d4491152b78fc72e780', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-HOTYT4JM.css': {size: 293, hash: '43JoNVjB8uY', text: () => import('./assets-chunks/styles-HOTYT4JM_css.mjs').then(m => m.default)}
  },
};
