import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {VitePWA} from 'vite-plugin-pwa'
import {imagetools} from "vite-imagetools";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "VITE");
    return {
        plugins: [
            vue(),
            vueDevTools(),
            imagetools(),
            VitePWA({
                registerType: 'autoUpdate',
                includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
                manifest: {
                    name: 'Чеширский код',
                    short_name: 'Чеширский код',
                    description: 'Организация и проведение квестов',
                    theme_color: '#ffffff',
                    icons: [
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
                }
            })
        ],
        base: mode === "production" ? "/yulya/" : "/",
        build: {
            outDir: "dist",
            assetsDir: "assets",
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
        ssgOptions: {
            script: 'async',
            formatting: 'minify',
            crittersOptions: {
                reduceInlineStyles: false,
            },
            async includedRoutes() {
                let routes = [
                    '/',
                    '/about',
                    '/quests',
                    '/sert',
                    '/action',
                    '/action-games',
                    '/events',
                    '/show-programs'
                ];
                const apiUrl = env.VITE_API_URL;
                await fetch(apiUrl + "/quests/?category=child")
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("ERR");
                        }
                    })
                    .then(data => {
                        if (data.result && Array.isArray(data.result)) {
                            data.result.forEach(item => {
                                if (item.slug) {
                                    routes.push(`/child-quests/${item.slug}`);
                                }
                            });
                        } else {
                            throw new Error("ERR");
                        }
                    })

                await fetch(apiUrl + "/quests/?category=quest")
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then(data => {
                        if (data.result && Array.isArray(data.result)) {
                            data.result.forEach(item => {
                                if (item.slug) {
                                    routes.push(`/quests/${item.slug}`);
                                }
                            });
                        }
                    })

                await fetch(apiUrl + "/quests/?category=action")
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then(data => {
                        if (data.result && Array.isArray(data.result)) {
                            data.result.forEach(item => {
                                if (item.slug) {
                                    routes.push(`/action-games/${item.slug}`);
                                }
                            });
                        }
                    });
                return routes;
            }
        }
    }
});
