import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SearchNew from "./views/SearchNew.vue";
import SignUp from "./views/SignUp.vue";
import LogIn from "./views/LogIn.vue";
import Profile from "./views/Profile.vue";
import Edit from "./views/Edit.vue";
import WishList from "./views/WishList.vue";
import Dashboard from "./views/Dashboard.vue";
import Search from "./views/Search.vue";
import Risk from "./views/RiskQuestionaire.vue";
import PortfolioDetails from "./views/PortfolioDetails.vue";
import Payment from "./views/Payment.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/searchNew",
      name: "searchNew",
      component: SearchNew,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/login",
      name: "login",
      component: LogIn
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit",
      name: "edit",
      component: Edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: WishList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/risk",
      name: "Risk",
      component: Risk,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/portfolios/:portfolioId",
      name: "Details",
      component: PortfolioDetails,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/payment",
      name: "Payment",
      component: Payment,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
