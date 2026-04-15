
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://danielonofre1234.github.io/Proyecto-de-Salud-en-Telemedicina-TODO-18/',
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
    'index.csr.html': {size: 830, hash: '143aee5fa2ba044e1b1003b9e32356731a538682ad88ccdc13e1a092509e4d6e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1084, hash: '4cb7383f5e141b637ab521cab40fafa332ef24237e09457b3eaaf0ee44497d1b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 6033, hash: '826322cc93eee19dfcdc81ef074f802290c19d75895532e81017d8e63961a291', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 10282, hash: '9b20415795d09edaf376645873655ca3f19930b1ae3c327e4917f1477dfbbaad', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'history/index.html': {size: 4729, hash: '58a1e609924283b74048156bdf0c5281bec7e326d3e80240131964924c086943', text: () => import('./assets-chunks/history_index_html.mjs').then(m => m.default)},
    'psychologist/index.html': {size: 10959, hash: 'ee33256be50df2cc51fe2ac9c3d721e1074433fec722f6105eda503fea28b99d', text: () => import('./assets-chunks/psychologist_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 9223, hash: '423ba63be3d46aff2e544cfb5951e49b607a5ad84cdd21eb69f5c1eff7ac5838', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'index.html': {size: 10282, hash: '9b20415795d09edaf376645873655ca3f19930b1ae3c327e4917f1477dfbbaad', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'video-session/index.html': {size: 3043, hash: '97e1656ade1191c4d0ad39ef52ef806a9909bf66cf22160e49e2ba18a0b3ddf6', text: () => import('./assets-chunks/video-session_index_html.mjs').then(m => m.default)},
    'appointments/index.html': {size: 9939, hash: '639fc23f6242f6edd5c9ffd739c131307928b0aad978fcbfde310a182bea3188', text: () => import('./assets-chunks/appointments_index_html.mjs').then(m => m.default)},
    'patients/index.html': {size: 4177, hash: '5c4ad57d242ab71d2e80322a31878609b03d82af360056fe1ac0b7c195b83ac3', text: () => import('./assets-chunks/patients_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 6615, hash: '59e62cc998a8948e035cfe93466775a9445c745dbe6660750149564ed995495a', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 4138, hash: '30e75003045bef39991bc0d8a1e89e316f093b88f3e7f7226c0619682435a28c', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'styles-HOTYT4JM.css': {size: 293, hash: '43JoNVjB8uY', text: () => import('./assets-chunks/styles-HOTYT4JM_css.mjs').then(m => m.default)}
  },
};
