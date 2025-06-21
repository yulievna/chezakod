import './assets/styles/main.css';
import {ViteSSG} from 'vite-ssg';
import App from './App.vue';
import {routes} from './routes.js';
import {TemplateParamsPlugin} from '@unhead/vue/plugins';

export const createApp = ViteSSG(
    App,
    {
        routes: routes,
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                    el: to.hash
                }
            } else {
                return {
                    top: 0
                }
            }
        },
        base: "/yulya/"
    },
    (ctx) => {
        ctx.app.config.globalProperties.$router = ctx.router

        ctx.head.push({
            titleTemplate: "%s %sep %siteName",
            templateParams: {
                sep: "·",
                siteName: "Чеширский КОД"
            }
        });
        ctx.head.use(TemplateParamsPlugin);
    },
)
