import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomePage.vue";
import About from "@/views/AboutPage.vue";
import Login from "@/views/LoginPage.vue";
import Registration from "@/views/RegistrationPage";
import DoctorsMenu from "@/views/doctors/DoctorsMenuPage";
import ChoseDoctor from "@/views/doctors/ChoseDoctorPage";
import Admin from "@/views/admins/AdminPage";
import UserMenu from "@/views/UsersMenuPage";
import CalendarAppointmentPage from "@/views/CalendarAppointmentPage";
import myAppointmentPage from "@/views/MyAppointmentPage";
import AppointmentsUserForDoctorPage from "@/views/doctors/AppointmentsUserForDoctorPage";
import UserProfilePage from "@/views/ProfilePage";




const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/myAppointment",
        component: myAppointmentPage,
    },
    {
        path: "/appointments",
        component: AppointmentsUserForDoctorPage,
    },
    {
        path: "/profile",
        component: UserProfilePage,
    },
    {
        path: "/choseDoctor/:speciality?",
        component: ChoseDoctor,
    },
    {
        path: "/calendarAppointment/:id?",
        component: CalendarAppointmentPage,
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
        component: Registration,
    },
    {
        path: "/admin",
        component: Admin,
    },
    {
        path: "/doctorsMenu",
        component: DoctorsMenu,
    },
    {
        path: "/usersMenu",
        component: UserMenu,
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;