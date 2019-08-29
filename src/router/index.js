import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },

  // // 商户管理
  // {
  //   path: '/merchant',
  //   component: Layout,
  //   meta: {
  //     title: '商户管理',
  //     icon: 'table'
  //   },
  //   children: [{
  //       path: '/access',
  //       name: 'access',
  //       component: () => import('@/views/merchant/access/index'),
  //       meta: {
  //         title: '商户准入管理'
  //       }
  //     },
  //     {
  //       path: '/apply',
  //       name: 'apply',
  //       component: () => import('@/views/merchant/apply/index'),
  //       meta: {
  //         title: '资源申请管理'
  //       }
  //     },
  //     {
  //       path: '/user',
  //       name: 'user',
  //       component: () => import('@/views/merchant/user/index'),
  //       meta: {
  //         title: '商户用户管理'
  //       }
  //     }
  //   ]
  // },

  // // 客户管理
  // {
  //   path: '/customer',
  //   component: Layout,
  //   redirect: '/customer/index',
  //   children: [{
  //     path: 'index',
  //     name: 'customerIndex',
  //     component: () => import('@/views/customer/index'),
  //     meta: {
  //       title: '客户管理',
  //       icon: 'user'
  //     }
  //   }]
  // },

  // // 订单管理
  // {
  //   path: '/order',
  //   component: Layout,
  //   redirect: '/order/index',
  //   children: [{
  //     path: 'index',
  //     name: 'orderIndex',
  //     component: () => import('@/views/order/index'),
  //     meta: {
  //       title: '订单管理',
  //       icon: 'nested'
  //     }
  //   }]
  // },

  // // 产品管理
  // {
  //   path: '/product',
  //   component: Layout,
  //   redirect: '/product/index',
  //   children: [{
  //     path: 'index',
  //     name: 'productIndex',
  //     component: () => import('@/views/product/index'),
  //     meta: {
  //       title: '产品管理',
  //       icon: 'tree'
  //     }
  //   }]
  // },

  // // 统计管理
  // {
  //   path: '/statistics',
  //   component: Layout,
  //   redirect: '/statistics/index',
  //   children: [{
  //     path: 'index',
  //     name: 'statisticsIndex',
  //     component: () => import('@/views/statistics/index'),
  //     meta: {
  //       title: '统计管理',
  //       icon: 'form'
  //     }
  //   }]
  // },

  // // 系统管理
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/index',
  //   children: [{
  //     path: 'index',
  //     name: 'systemIndex',
  //     component: () => import('@/views/system/index'),
  //     meta: {
  //       title: '系统管理',
  //       icon: 'example'
  //     }
  //   }]
  // },


  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [{
  //     path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //     meta: {
  //       title: 'External Link',
  //       icon: 'link'
  //     }
  //   }]
  // },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
