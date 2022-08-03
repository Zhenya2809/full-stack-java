import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomePage.vue";
import About from "@/views/AboutPage.vue";
import Login from "@/views/LoginPage.vue";
import Registration from "@/views/RegistrationPage";
import Admin from "@/views/AdminPage.vue";
import DoctorsMenuPage from "@/views/doctorsMenuPage";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/registration",
        component: Registration
    },
    {
        path: "/admin",
        component: Admin
    },
    {
        path: "/doctorsMenu",
        component: DoctorsMenuPage
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;