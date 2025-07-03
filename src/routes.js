export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import("@/views/AboutUsView.vue")
    },
    {
        path: '/quests',
        name: 'quests',
        component: () => import("@/views/QuestsView.vue"),
    },
    {
        path: '/quests/:id',
        name: 'AboutQuest',
        component: () => import("@/views/AboutQuest.vue"),
        props: true,
    },
    {
        path: '/child-quests/:id',
        name: 'AboutChildQuest',
        component: () => import("@/views/AboutQuest.vue"),
        props: true,
    },
    {
        path: '/sert',
        name: 'certificates',
        component: () => import("@/views/CertificatesView.vue"),
    },
    {
        path: '/action',
        name: 'promotions',
        component: () => import("@/views/PromotionsView.vue")
    },
    {
        path: '/action-games',
        name: 'action-games',
        component: () => import("@/views/ActionGames.vue"),
    },
    {
        path: '/action-games/:id',
        name: 'AboutActionGame',
        component: () => import("@/views/AboutQuest.vue"),
        props: true,
    },
    {
        path: '/events',
        name: 'events',
        component: () => import("@/views/EventsView.vue"),
    },
    {
        path: '/show-programs',
        name: 'show-programs',
        component: () => import("@/views/ShowProgramsView.vue"),
    },
    {
        path: '/timetable',
        name: 'timetable',
        component: () => import("@/views/TimetableView.vue"),
    }
];