<template>
    <div class="mui-content">
        <!-- 轮播图 -->
        <div class="detail">
            <swipe :imgUrl="imgurl"></swipe>
        </div>


        <div class="sell">
            <h4>{{info.title}}</h4>
            <div class="price">
                市场价：<s>￥{{info.market_price}}</s>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                销售价：<span>￥{{info.sell_price}}</span>
            </div>
        <div class="num"> 
            <span>购买数量:</span> 
           <!-- number组件 -->
            <number class="number" :stock="info.stock_quantity" 
                @numberchange="numberchanged"></number>
            <transition
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                v-on:after-leave="afterLeave"
            >
                <div v-show="isShow" class="ball"></div>
            </transition>
            
        </div> 
            <div class="buttom">
                <div class="mui-btn mui-btn-primary">立即购买</div>
                <button @click="addcart" type="button" class="mui-btn mui-btn-danger">加入购物车</button>
            </div>      
        </div>


        <div class="param">
            <h5>商品详情</h5>
            <div class="info"> 
                <p>商品编号：{{info.goods_no}}</p>
                <p>库存情况：{{info.stock_quantity}}件</p>
                <p>上架时间：{{info.add_time | fmtdate('YYYY-MM-DD HH:ss:mm')}}</p>
            </div>
        </div>



        <div class="footer">
            <a class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</a>
            <a @click="push" class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</a>
        </div>
    </div>
</template>

<script>
import swipe from '../../Commen/swipe.vue';
import number from '../../Commen/number.vue';
import vueObj from '../../../router/communication';
import { setData } from '../../../router/localstorageHelp';

export default {
    data(){
        return{
            imgurl:'getthumimages/' + this.id,
            info:{},
            count:1,
            // 控制小球动画显示隐藏
            isShow:false
        }
    },
    props: ['id'],
    created(){
        this.getinfo()
    },
    methods:{
        // 获取商品参数区和价格，标题等
        getinfo(){
            this.axios
            .get('goods/getinfo/' + this.id)
            .then((response)=>{
                if(response.status === 200 && response.data.status === 0){
                    if(response.data.message.length === 0){
                        return
                    }
                    this.info = response.data.message[0]
                }else{
                    console.log('服务器出错了')
                }
            })
            .catch((err)=>{
                console.error((err))
            })
        },
        push(){
           this.$router.push({name: 'buyComment', params: {id: this.id}})
        },
        numberchanged(obj){
            this.count = obj.count;
        },
        // 点击购物车
        addcart(){
            // 1、获取到number组件中的count
            // 2、更新底部的badge
            // 2.1 点击加入购物车要把number组件的数据传递到APP.vue中
            // vueObj.$emit('updateBadge',this.count);
            // 2.2 更新
            // 3、小球运动
            this.isShow = true
           
            // 4、保存购物车的数据到本地存储
           setData({id: this.id, count:this.count})
        },
        // 小球运动的钩子函数
        beforeEnter: function (el) {
            el.style.transform = 'translate(0,0)'
        },
        enter: function (el, done) {
            // Element.getBoundingClientRect()获取元素的大小及其相对于视口的位置
            // 获取元素的位置
            let elX = el.getBoundingClientRect().left;
            let elY = el.getBoundingClientRect().top;
            // 获取badge的位置需要操作dom
            let badge = document.querySelector('.mui-badge');
            let badgeX = badge.getBoundingClientRect().left;
            let badgeY = badge.getBoundingClientRect().top;
            // 两位置相减就是小球要运动的距离
            let x = badgeX - elX;
            let y = badgeY - elY;

            el.style.transform = `translate(${x}px,${y}px)`;
            done()
        },
        afterEnter: function (el) {
            this.isShow = false;
        },
        afterLeave: function (el) {
             // 当动画小球完全离开的时候，更新badge
            // 触发事件
            vueObj.$emit('updateBadge',this.count);
        }
    },
    components:{
        swipe,
        number
    }
}
</script>

<style scoped>
    .mui-content{
        background-color: #fff;
    }
    .detail, .sell, .param, .footer{
        border: 1px solid rgba(92, 92, 92, 0.7);
        margin: 6px;
        border-radius: 5px;
    }
    .sell h4{
        color: dodgerblue;
        margin: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
    .price, .num, .buttom {
        margin-left: 18px;
        font-size: 15px;
        
    }
    .price{
        padding-bottom:6px;
    }
    .price span{
        color: red;
        font-size: 18px;
    }
    .num{
        position: relative;
        margin-left: 18px;
        font-size: 15px;
    }
    .num .number{
        display: inline-block;
    }
    .ball{
        position: absolute;
        top: 3px;
        left: 115px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: red;
        transition: all 0.5s linear;
        z-index: 1000;
    }
    .buttom{
        padding-bottom: 14px;
        padding-top: 8px;
    }
    
    .param h5{
        font-weight: bold;
        margin: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5); 
    }
    .param .info{
        margin-left: 40px;
        margin-bottom: 10px;
    }
    .param .info p{
        margin: 0;
               
    }
  
    .footer a{
        display: block;
        margin: 8px;
    }
    .footer a button{
        width: 100%;
    }
</style>

