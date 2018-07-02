import Vue from 'vue'
import Router from 'vue-router'
import member from '@/components/Member/member.vue'
import home from '@/components/Home/home.vue'
import shopcar from '@/components/Shopcar/shopcar.vue'
import search from '@/components/Search/search.vue'


import news from '@/components/Home/News/news.vue'
import buy from  '@/components/Home/Buy/buy.vue'
import contact from '@/components/Home/Contact/contact.vue'
import feedback from '@/components/Home/Feedback/feedback.vue'
import share from '@/components/Home/Share/share.vue'
import video from '@/components/Home/Video/video.vue'


import newsDetail from '@/components/Home/News/newsDetail.vue'
import shareDetail from '@/components/Home/Share/shareDetail.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'mui-active',
  routes: [
    {
      path: '/', redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path:'/member',
      name:'member',
      component:member
    },
    {
      path:'/shopcar',
      name:'shopcar',
      component:shopcar
    },
    {
      path:'/search',
      name:'search',
      component:search
    },
    {
      path:'/news',
      name:'news',
      component:news
    },
    {
      path:'/buy',
      name:'buy',
      component:buy
    },
    {
      path:'/contact',
      name:'contact',
      component:contact
    },
    {
      path:'/feedback',
      name:'feedback',
      component:feedback
    },
    {
      path:'/share',
      name:'share',
      component:share
    },
    {
      path:'/video',
      name:'video',
      component:video
    },
    {
      path:'/news/:id',
      name:'newsDetail',
      component:newsDetail,
      props:true
    },
    {
      path:'/share/:id',
      name:'shareDetail',
      component:shareDetail,
      props:true
    }
  ]
})
