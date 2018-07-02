<template>
    <div class="mui-content">
        <!-- 轮播 -->
        <swipe :imgUrl="img_url"></swipe>
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
import swipe from "../Commen/swipe"


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  name: "home",
  data() {
    return {
        menus:[],
        img_url:'getlunbo'
    }
  },
  created(){
        this.getmenus()
  },
  methods:{
    //   获取轮播
    
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
  },
components:{
    swipe
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

</style>

