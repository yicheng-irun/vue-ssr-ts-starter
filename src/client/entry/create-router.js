import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: () => import(/* webpackChunkName: "index" */'../pages/index/app') },
            { path: '/demo', component: () => import(/* webpackChunkName: "demo" */'../pages/demo/app') },
            {
                path: '/demo2',
                component: () => import(/* webpackChunkName: "page2" */'../pages/demo2/app'),
                children: [
                    {
                        path: 'child1',
                        component: () => import('../pages/demo2/child1/app')
                    },
                    {
                        path: 'child2',
                        component: () => import('../pages/demo2/child2/app')
                    },
                ]
            },
        ]
    });
}


// {
//     index: () => import(/* webpackChunkName: "index" */'./pages/index'),
//     demo: () => import(/* webpackChunkName: "demo" */'./pages/demo'),
//     page2: () => import(/* webpackChunkName: "page2" */'./pages/page2'),
//     'site/404': () => import(/* webpackChunkName: "site" */'./pages/site/404'),
//     'site/500': () => import(/* webpackChunkName: "site" */'./pages/site/500'),
// }