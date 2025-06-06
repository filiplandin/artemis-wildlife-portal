// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Animals from "../components/Animals.vue";
import Charities from "../components/Charities.vue";
import Animal from "../components/Animal.vue";
import Swipe from "../components/Swiper.vue";
import Card from "../components/Card.vue";
import chat from "../components/chat.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/Swipe",
        name: "Swipe",
        component: Swipe,
    },
    {
        path: "/Animals",
        name: "Animals",
        component: Animals,
    },
    {
        path: "/Charities",
        name: "Charities",
        component: Charities,
    },
    {
        path: "/Animals/:id",
        name: "Animal",
        component: Animal,
    },
    {
        path: "/Card",
        name: "Card",
        component: Card,

    },
    {
        path: "/Animals/:id/chat",
        name: "Chat",
        component: chat,

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;