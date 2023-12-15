import {createWebHistory, createRouter} from 'vue-router'

/** 动态路由配置 */
interface RouteSettings {
    /**
     * 是否开启动态路由功能？
     * 1. 开启后需要后端配合，在查询用户详情接口返回当前用户可以用来判断并加载动态路由的字段（该项目用的是角色 roles 字段）
     * 2. 假如项目不需要根据不同的用户来显示不同的页面，则应该将 async: false
     */
    async: boolean
    /** 当动态路由功能关闭时：
     * 1. 应该将所有路由都写到常驻路由里面（表明所有登陆的用户能访问的页面都是一样的）
     * 2. 系统自动给当前登录用户赋值一个没有任何作用的默认角色
     */
    defaultRoles: Array<string>
    /**
     * 是否开启三级及其以上路由缓存功能？
     * 1. 开启后会进行路由降级（把三级及其以上的路由转化为二级路由）
     * 2. 由于都会转成二级路由，所以二级及其以上路由有内嵌子路由将会失效
     */
    thirdLevelRouteCache: boolean
}

const routeSettings: RouteSettings = {
    async: false,
    defaultRoles: ["DEFAULT_ROLE"],
    thirdLevelRouteCache: false
}


/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
 noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
 title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
 icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
 breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
 activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
 }
 */

// 公共路由
export const constantRoutes = [
    {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/weathermap',
        name: 'weather',
        component: () => import('@/views/WeatherMap.vue'),
    },
    {
        path: '/pollutionmap',
        name: 'pollution',
        component: () => import('@/views/PollutionMap.vue'),
    },
    {
        path: '/sankeymap',
        name: 'sankey',
        component: () => import('@/views/SankeyMap.vue'),
    },
    {
        path: '/clustermap',
        name: 'cluster',
        component: () => import('@/views/ClusterMap.vue'),
    },
    {
        path: '/predict',
        name: 'predict',
        component: () => import('@/views/Predict.vue'),
    },
    {
        path: '/health',
        name: 'health',
        component: () => import('@/views/Health.vue'),
    },
    {
        path: '/economy',
        name: 'economy',
        component: () => import('@/views/Economy.vue'),
    },
    {
        path: '/tianjin',
        name: 'tianjin',
        component: () => import('@/views/Tianjin.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/views/Logout.vue'),
    },
    {
        path: '/temps',
        name: 'temps',
        component: () => import('@/views/temps.vue'),
    },
    {
        path: '/cluster',
        name: 'logout',
        component: () => import('@/views/cluster_1.vue'),
    },

    {
        path: "/404",
        name: 'not-found',
        component: () => import('@/views/NotFound.vue'),
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "404"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
});

export default router;