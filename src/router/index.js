import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomePage.vue";
import About from "@/views/users/AboutPage.vue";
import Login from "@/views/LoginPage.vue";
import Registration from "@/views/RegistrationPage";
import DoctorsMenu from "@/views/admins/DoctorsMenuPage.vue";
import ChoseDoctor from "@/views/users/ChoseDoctorPage.vue";
import Admin from "@/views/admins/AdminPage";
import UserMenu from "@/views/admins/UsersMenuPage.vue";
import CalendarAppointmentPage from "@/views/users/CalendarAppointmentPage.vue";
import myAppointmentPage from "@/views/users/MyAppointmentPage.vue";
import AppointmentsUserForDoctorPage from "@/views/doctors/AppointmentsUserForDoctorPage";
import UserProfilePage from "@/views/userandadmin/ProfilePage.vue";
import DoctorProfilePage from "@/views/doctors/doctorProfilePage.vue";
import TreatmentPage from "@/views/doctors/TreatmentPage.vue";



const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/treatment",
        component: TreatmentPage,
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
    },
    {
        path: "/doctorProfilePage",
        component: DoctorProfilePage,
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;