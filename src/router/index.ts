import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import MainLayout2 from '@/components/layouts/MainLayout.vue'
import FileListSidebar from '@/components/layouts/FileListSidebar.vue';
import { useGoogleAuth } from '@/plugins/auth';

const MainRoutes: RouteRecordRaw = {
  path: '/',
  component: MainLayout2,
  redirect: { name: 'files' },
  children: [
    {
      name: 'files',
      path: '/files',
      meta: {
        title: 'Files',
        root: true,
      },
      components: {
        default: () => import('@/views/FilesView.vue'),
        sidebar: FileListSidebar,
      },
    },
    {
      name: 'file',
      path: '/file/:id',
      meta: {
        title: 'File',
        root: true,
      },
      components: {
        default: () => import('@/views/FileView.vue'),
        sidebar: FileListSidebar,
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
        default: () => import('@/views/FavoritesView.vue'),
        sidebar: FileListSidebar,
      },
    },
    {
      name: 'auth',
      path: 'auth',
      components: {
        default: () => import('@/views/auth/AuthView.vue')
      },
    },
  ]
};

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/auth/Error.vue')
    },
    MainRoutes
  ]
});

router.beforeEach(async (to, from, next) => {
  const authProvider = useGoogleAuth()
  const isLogedIn = await authProvider.isLogedIn();

  console.log('isLogedIn', isLogedIn, to.path);
  if ('/auth' == to.path){
    if (isLogedIn)
      return next({ name: 'files' });
    
    return next();
  }

  if (isLogedIn)
    return next();
  
  return next({ name: 'auth' });
});

export default router
