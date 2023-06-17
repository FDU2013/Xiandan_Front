import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Login from "@/views/Login";
import Register from "@/views/Register";
import Post from "@/views/Post";
import Main from "@/components/container"
import PostList from "@/views/Post/PostList";
import PostDetail from "@/views/Post/PostDetail";
import AddPost from "@/views/Post/AddPost";
import MyRecord from "@/views/Record/MyRecord";
import NotDealRecord from "@/views/Record/NotDealRecord";
import evaluation from "@/views/Evaluation";
import othersInform from "@/views/OtherMainPage";

const routes = [
  {
    path: "/",
    name: '/',
    redirect:'/login'
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:'/register',
    name:'register',
    component: Register
  },
  {
    path:'/evaluation',
    name:'evaluation',
    component: evaluation
  },
  {
    path: '/post',
    name:'post',
    component: Post
  },
  {
    path: '/postList',
    name:'postList',
    component: PostList
  },
  {
    path: '/postDetail',
    name:'postDetail',
    component: PostDetail
  },
  {
    path:'/addPost',
    name:'addPost',
    component: AddPost
  },
  {
    path: '/myRecord',
    name:'myRecord',
    component: MyRecord
  },
  {
    path: '/notDealRecord',
    name:'notDealRecord',
    component: NotDealRecord
  },
  {
    path: '/othersInform',
    name:'othersInform',
    component: othersInform
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
	// 判断有没有登录
	if (!sessionStorage.getItem('user')) {
		if (to.name == "login"||to.name == "main"||to.name == "/"||to.name == "register") {
			next();
		} else {
      alert("请先登录！")
			router.push('login')
		}
	} else {
		next();
	}
});


export default router
