import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue';
import AdminLogin from '@/components/AdminLogin';
import ArticleList from '@/components/ArticleList.vue';
import Article from '@/components/Article.vue'
import ArticleInfo from '@/components/ArticleInfo.vue'
import Album from '@/components/Album.vue'
import AddAlbum from '@/components/AddAlbum.vue'
import AlbumGroup from '@/components/AlbumGroup.vue'
import Taglist from '@/components/Taglist.vue'
import Base from '@/components/Base.vue'
import LearnInfo from '@/components/LearnInfo.vue'
import LearnList from '@/components/LearnList.vue'
import Think from '@/components/Think.vue'
import ThinkInfo from '@/components/ThinkInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/adminlogin',
      name:'login',
      component: AdminLogin
    },
    { path: '/', redirect: '/home' },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'articlelist',
          name:'articlelist',
          component:ArticleList
        },
        {
          path:'articleinfo',
          name:'articleinfo',
          component:ArticleInfo
        },
        {
          path:'article',
          name:'article',
          component:Article
        },
        {
          path:'album',
          name:'album',
          component:Album
        },
        {
          path:'addalbum',
          name:'addalbum',
          component:AddAlbum
        },
        {
          path:'albumgroup',
          name:'albumgroup',
          component:AlbumGroup
        },
        {
          path:'taglist',
          name:'taglist',
          component:Taglist
        },
        {
          path:'base',
          name:'base',
          component:Base
        },
        {
          path:'learnlist',
          name:'learnlist',
          component:LearnList
        },
        {
          path:'learninfo',
          name:'learninfo',
          component:LearnInfo
        },
        {
          path:'think',
          name:'think',
          component:Think
        },
        {
          path:'thinkinfo',
          name:'thinkinfo',
          component:ThinkInfo
        },
      ]
    }
  ]
})
