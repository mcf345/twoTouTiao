import Vue from "vue";
import VueRouter from "vue-router";

// 1.直接引入登入组件 同步加载路由（按需） 只要页面刷新，所有的页面数据全部一次性加载  1000个界面（有可能第一次加载文件的时候就会很慢）
// 用户只能同事看一个界面 >> 只把用户当前访问的界面返回给用户
// import login from '@/views/login';

//2.直接import('路径') 路由的懒加载
//访问到某一个路由的时候再去加载当前路由文件  好处就是加载快

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
