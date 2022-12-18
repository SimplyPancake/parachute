import { createRouter, createWebHistory } from "vue-router";
import { useAccountStore } from "@/stores/account";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/enterSchedule",
      name: "enterSchedule",
      component: () => import("../views/EnterScheduleView.vue"),
    },
  ],
});

// Check authentication
router.beforeEach(async (to, from, next) => {
  const store = useAccountStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let loggedIn = await store.isLoggedIn();
    console.log(loggedIn);
    if (!loggedIn) {
      next("/login");
    } else {
      next();
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
