
const pages = {
    index: () => {
        return import(/* webpackChunkName: "index" */'./pages/index');
    },
    demo: () => {
        return import(/* webpackChunkName: "demo" */'./pages/demo');
    },
    page2: () => {
        return import(/* webpackChunkName: "page2" */'./pages/page2');
    },
    'site/404': () => {
        return import(/* webpackChunkName: "site" */'./pages/site/404');
    },
    'site/500': () => {
        return import(/* webpackChunkName: "site" */'./pages/site/500');
    },
};

export default pages;
