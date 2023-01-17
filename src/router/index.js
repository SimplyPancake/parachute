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
      path: "/enterSchedule",
      name: "enterSchedule",
      component: () => import("../views/EnterScheduleView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      meta: {
        requiresAdmin: true,
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
  ],
});

// Check authentication
// TODO: clean up this mess
router.beforeEach(async (to, from, next) => {
  const store = useAccountStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let loggedIn = await store.isLoggedIn();
    if (!loggedIn) {
      next("/login");
    }
    // check if user is admin
    if (to.matched.some((record) => record.meta.requiresAdmin)) {
      if (store.isAdmin) {
        next();
      } else {
        next("/");
      }
    }
    next();
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
