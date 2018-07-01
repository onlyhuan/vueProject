<template>
    <div class="mui-content">
        <!-- 轮播 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="(item ,index) in images" :key="index">
                <router-link :to="item.url">
                    <img :src=" item.img ">
                </router-link>
            </mt-swipe-item>
        </mt-swipe>
        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="item in menus" :key="item.url">
                        <router-link :to="item.url">
		                    <span class="mui-icon icon-news" :class="item.className"></span>
		                    <div class="mui-media-body"> {{ item.title}} </div>
                        </router-link>
                    </li>
		        </ul>
    </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "mint-ui";
import 'mint-ui/lib/style.css';


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  name: "home",
  data() {
    return {
        images:[],
        menus:[]
    }
  },
  created(){
      this.getlunbo(),
      this.getmenus()
  },
  methods:{
    //   获取轮播
      getlunbo(){
          this.$http
          .get('getlunbo')
          .then((response)=>{
              if(response.status === 200 && response.data.status === 0){
                  this.images = response.data.message;
              }else{
                  console.log('服务器出错了')
              }
          })
          .catch((err)=>{
            console.error((err))
          })
      },
    //   获取九宫格
      getmenus(){
          this.$http
          .get('getmenus')
          .then((response)=>{
              if(response.status === 200 && response.data.status === 0){
                this.menus = response.data.message
              }else{
                console.log('服务器出错了')
              }
          })
          .catch((err)=>{
              console.error((err))
          })
      }
  }
};
</script>

<style scoped>
/* 九宫格 */
.icon-news {
  width: 50px;
  height: 50px;
  background-image: url("../../../static/images/menu1.png");
  background-repeat: round;
}
.icon-share {
  width: 50px;
  height: 50px;
  background-image: url("../../../static/images/menu2.png");
  background-repeat: round;
}
.icon-buy {
  width: 50px;
  height: 50px;
  background-image: url("../../../static/images/menu3.png");
  background-repeat: round;
}
.icon-Feedback {
  width: 50px;
  height: 50px;
  background-image: url("../../../static/images/menu4.png");
  background-repeat: round;
}
.icon-contac {
  width: 50px;
  height: 50px;
  background-image: url("../../../static/images/menu5.png");
  background-repeat: round;
}
.icon-video {
  width: 50px;
  height: 50px;
  background-image: url("../../../static/images/menu6.png");
  background-repeat: round;
}
.mui-content > .mui-table-view:first-child {
  margin-top: 0px;
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}
/* 轮播图 */
.mint-swipe{
    height: 250px;
}
.mint-swipe img{
    width: 100%;
    height: 100%;
}
</style>

