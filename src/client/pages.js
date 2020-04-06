
const pages = {
    demo: () => import('./pages/demo/app.vue'),

    home: () => import(/* webpackChunkName: "home" */'./pages/home/app.vue'),


    'site/404': () => import(/* webpackChunkName: "site/404" */'./pages/site/404/app.vue'),
    'site/500': () => import(/* webpackChunkName: "site/500" */'./pages/site/500/app.vue'),
};

export default pages;
