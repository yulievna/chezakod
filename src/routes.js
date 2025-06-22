import HomeView from "@/views/HomeView.vue";
import AboutUsView from "@/views/AboutUsView.vue";
import QuestsView from "@/views/QuestsView.vue";
import CertificatesView from "@/views/CertificatesView.vue";
import PromotionsView from "@/views/PromotionsView.vue";
import ActionGames from "@/views/ActionGames.vue";
import EventsView from "@/views/EventsView.vue";
import ShowProgramsView from "@/views/ShowProgramsView.vue";
import TimetableView from "@/views/TimetableView.vue";

export const routes = [
    {
        path: '/yulya',
        component: HomeView,
    },
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        component: AboutUsView
    },
    {
        path: '/quests',
        name: 'quests',
        component: QuestsView,
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
        component: CertificatesView
    },
    {
        path: '/action',
        name: 'promotions',
        component: PromotionsView
    },
    {
        path: '/action-games',
        name: 'action-games',
        component: ActionGames,
    },
    {
        path: '/action-games/:id',
        name: 'AboutActionGame',
        component: () => import("@/views/AboutActionGame.vue"),
        props: true,
    },
    {
        path: '/events',
        name: 'events',
        component: EventsView
    },
    {
        path: '/show-programs',
        name: 'show-programs',
        component: ShowProgramsView
    },
    {
        path: '/timetable',
        name: 'timetable',
        component: TimetableView
    }
];