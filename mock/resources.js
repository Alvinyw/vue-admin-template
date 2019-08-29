  const resource = [
      {
      path: '/',
      component: 'layout',
      redirect: '/dashboard',
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: 'dashboard/index',
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }]
    },

    // 商户管理
    {
      path: '/merchant',
      component: 'layout',
      meta: {
        title: '商户管理',
        icon: 'table'
      },
      children: [{
          path: '/access',
          name: 'access',
          component: 'merchant/access/index',
          meta: {
            title: '商户准入管理'
          }
        },
        {
          path: '/apply',
          name: 'apply',
          component: 'merchant/apply/index',
          meta: {
            title: '资源申请管理'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: 'merchant/user/index',
          meta: {
            title: '商户用户管理'
          }
        }
      ]
    },

    // 客户管理
    {
      path: '/customer',
      component: 'layout',
      redirect: '/customer/index',
      children: [{
        path: 'index',
        name: 'customerIndex',
        component: 'customer/index',
        meta: {
          title: '客户管理',
          icon: 'user'
        }
      }]
    },

    // 订单管理
    {
      path: '/order',
      component: 'layout',
      redirect: '/order/index',
      children: [{
        path: 'index',
        name: 'orderIndex',
        component: 'order/index',
        meta: {
          title: '订单管理',
          icon: 'nested'
        }
      }]
    },

    // 产品管理
    {
      path: '/product',
      component: 'layout',
      redirect: '/product/index',
      children: [{
        path: 'index',
        name: 'productIndex',
        component: 'product/index',
        meta: {
          title: '产品管理',
          icon: 'tree'
        }
      }]
    },

    // 统计管理
    {
      path: '/statistics',
      component: 'layout',
      redirect: '/statistics/index',
      children: [{
        path: 'index',
        name: 'statisticsIndex',
        component: 'statistics/index',
        meta: {
          title: '统计管理',
          icon: 'form'
        }
      }]
    },

    // 系统管理
    {
      path: '/system',
      component: 'layout',
      redirect: '/system/index',
      children: [{
        path: 'index',
        name: 'systemIndex',
        component: 'system/index',
        meta: {
          title: '系统管理',
          icon: 'example'
        }
      }]
    }
  ]

  export default [
    // get resources
    {
      url: '/user/getResource',
      type: 'get',
      response: config => {
        // mock error
        if (!resource) {
          return {
            code: 60204,
            message: 'get resources failed.'
          }
        }

        return {
          code: 20000,
          data: resource
        }
      }
    }
  ]
