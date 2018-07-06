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
           <!-- number组件 -->
            <number :stock="info.stock_quantity" @numberchange="numberchanged"></number>
            <div v-if="false" class="ball"></div>
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
                <p>上架时间：{{info.add_time |fmtdate('YYYY-MM-DD HH:ss:mm')}}</p>
            </div>
        </div>



        <div class="footer">
            <a class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</a>
            <a @click="push" class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</a>
        </div>
    </div>
</template>

<script>
import swipe from '../../Commen/swipe.vue'
import number from '../../Commen/number.vue'
import vueObj from '../../../router/communication'

export default {
    data(){
        return{
            imgurl:'getthumimages/' + this.id,
            info:{},
            count:1
        }
    },
    props:['id'],
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
        numberchanged(count){
            this.count = count
        },
        // 点击购物车
        addcart(){
            // 1、获取到number组件中的count
            // 2、更新底部的badge
            // 2.1 点击加入购物车要把number组件的数据传递到APP.vue中
            vueObj.$emit('updateBadge',this.count);
            // 2.2 更新
            // 3、小球运动
            // 4、保存购物车的数据到本地存储
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

