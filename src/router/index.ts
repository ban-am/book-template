import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import MainLayout from '@/components/layouts/MainLayout.vue'
import { useGoogleAuth } from '@/plugins/auth';
import BlankLayout from '@/components/layouts/BlankLayout.vue';

const MainRoutes: RouteRecordRaw = {
  path: '/',
  component: MainLayout,
  redirect: { name: 'library' },
  children: [
    {
      name: 'library',
      path: '/library',
      meta: {
        title: 'Library',
        root: true,
      },
      components: {
        default: () => import('@/views/LibraryView.vue')
      },
    },
    {
      name: 'favorites',
      path: '/favorites',
      meta: {
        title: 'Favorites',
        root: true,
      },
      components: {
        default: () => import('@/views/LibraryView.vue')
      },
    },
    {
      name: 'file',
      path: '/file/:id',
      components: {
        default: () => import('@/views/FileView.vue')
      },
    },
  ]
}

const AuthRoutes: RouteRecordRaw = {
  path: '/auth',
  component: BlankLayout,
  redirect: { name: 'auth-login' },
  children: [
    {
      name: 'auth-login',
      path: 'login',
      components: {
        default: () => import('@/views/auth/LoginView.vue')
      },
    },
  ]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/auth/Error.vue')
    },
    MainRoutes,
    AuthRoutes
  ]
});

router.beforeEach(async (to, from, next) => {
  const authProvider = useGoogleAuth()
  const isLogedIn = await authProvider.isLogedIn();

  if ('/auth/login' == to.path){
    if (isLogedIn)
      return next({ name: 'library' });
    
    return next();
  }

  if (isLogedIn)
    return next();
  
  return next({ name: 'auth-login' });

  // // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/auth/login'];
  // const authRequired = !publicPages.includes(to.path);
  // const auth: any = useGoogleAuth();

  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //     if (authRequired && !auth.user) {
  //         auth.returnUrl = to.fullPath;
  //         return next('/auth/login');
  //     } else next();
  // } else {
  //     next();
  // }
  // const userStore = useUserStore();

  // userStore.loadAccessToken();

  // if (!userStore.token) {

  //   window.location.href = "https://accounts.google.com/o/oauth2/auth?"
  //     + "client_id=192037497972-7ervgpvt65ks51p02n8cbfmmqf2mdbeo.apps.googleusercontent.com&"
  //     + "response_type=token&"
  //     + "redirect_uri=https://localhost:5174&"
  //     + "scope=https://www.googleapis.com/auth/drive.readonly";
  //   return;
  // }

  
  return next();

});

export default router
