import Vue from 'vue';
import runtime from './lib/runtime';
import './comps/layout.styl';
import pages from './pages';


export default async function createApp () {
    const page = runtime.page;
    let f = pages[page];
    if (!f) {
        throw new Error(`pages中未找到 ${page}
已有的pages配置如下:
${Object.keys(pages).join('\n')}
`);
    }

    const factfunc = await f();
    const {App, Store} = factfunc.default;
    const store = Store();
    const app = new Vue({
        store: store.instance,
        render: h => h(App),
    });
    return { app, store };
}
