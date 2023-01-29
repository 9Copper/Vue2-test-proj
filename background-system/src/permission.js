import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist   // 白名单，不需权限

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  // const hasToken = getToken()

  //改造的鉴权流程
  const hasGetUserInfo = store.getters.user; //获取本地用户信息

  //判断前往的页面是否需要权限
  if (to.meta.auth) {
    //需要权限
    //是否有用户信息
    if (hasGetUserInfo) {
      //有用户信息
      next();
    } else {
      //没有用户信息
      //判断是否有userToken
      const hasToken = localStorage.getItem("adminToken");
      if (hasToken) {
        //有token，验证token是否有效
        try {
          await store.dispatch("user/getInfo"); // 相当于之前学的whoami
          next();
        } catch (error) {
          await store.dispatch("user/resetToken");
          Message.error("登录已过期，请重新登录!");
          next(`/login?redirect${to.path}`);
          NProgress.done();
        }
      } else {
        //没有token
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    //不需要权限
    //判断去的页面是否是登录页
    if (to.path === "/login" && hasGetUserInfo) {
      //说明现在是在登录的状态下前往登录页，则将其导航到首页
      next({ path: "/" });
    } else {
      next();
    }
    NProgress.done();
  }

  //vue-element-admin原有鉴权流程
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     //有token
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     //进的不是login
  //     // 看一下是否有用户信息
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       //进到这里说明没有用户信息，但是有token，接来下使用localstorage里面的token去服务器拿用户信息
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages(不在白名单里的) that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
