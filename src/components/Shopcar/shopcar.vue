<template>
    <div class="mui-content">
        <div class="row" v-for="(item,index) in goodslist" :key="item.id">
            <div class="left">
		        <mt-switch v-model="values[index]"></mt-switch>
            </div>
            <div class="center">
                <img :src="item.thumb_path">
            </div>
            <div class="right">
                <h4>
                   {{ item.title }} 
                </h4>
                <span>￥{{ item.sell_price }}</span>
                <number class="num" @numberchange="numberChanged" 
                    :num ="item.count" :id ="item.id"></number>
                <a @click="deleteGoods(item.id)">删除</a>
            </div>
        </div>
        <div class="total">
            <div class="left">
                <h4>
                    总计不含运费：
                </h4> 
                <span>
                    已经选择商品 {{ total }} 件，共计￥{{ totalPrice }}元
                </span>
            </div>
            <div class="right">
				<button  class="mui-btn mui-btn-danger">去结算</button>
			</div>
        </div> 
        {{ values }}
    </div>
</template>

<script>
import vueObj from '../../router/communication';
import number from '../Commen/number.vue';
import { getData, deleteData, update } from '../../router/localstorageHelp';

export default {
    name:'shopcar',
    components:{
        number
    },
    data:function(){
        return {
        //购物车中的商品数据 
           goodslist:[],
        //绑定mt-swich
           values:[],
        // 总价格
           totalPrice:0,
        // 总个数
            total:0
        }
    },
    created(){
        this.getData();
        
    },
    methods:{
        // 获取购物车数据
        getData(){
            let data = getData();
            // 如果没有数据就不发送数据请求
            if(data.length === 0 ){
                return
            }
            let ids = [];
            data.forEach(item => {
                ids.push(item.id);
                // 初始化mt-swich需要绑定的数组
                this.values.push(false);
            });
            let url = 'goods/getshopcarlist/' + ids.join(',');
            this.$http
            .get(url)
            .then((response) => {
                if(response.status === 200 && response.data.status === 0){
                    this.goodslist = response.data.message;
                    // 把本地存储中data的count属性赋给goodslist数组中的每一个对象上
                    data.sort(function (item1,item2) {
                        return item1.id > item2.id
                    })
                    this.goodslist.sort(function (item1,item2) {
                        return item1.id > item2.id
                    })

                    data.forEach((item, index)=>{
                        this.goodslist[index].count = item.count;
                    })

                    // console.log(data);
                    // console.log(this.goodslist);

                }else{
                    console.log('服务器出错')
                }
            })
            .catch((error)=>{
                console.error(err)
            })  
        },
        deleteGoods(id){
            // 1、删除本地存储中的数据
            deleteData(id);
            // 2、删除goodslist中的数据,values中对应的数据
            let index = this.goodslist.findIndex((item)=>{
                return item.id == id;
            })
            this.goodslist.splice(index, 1);
            this.values.splice(index, 1);
            // 3、更新app.vue中的badge
            vueObj.$emit('update');
        },
        numberChanged(obj){
             // 点击number组件的时候 + -
            // 1 更新本地存储  商品的id 加1  或者 减1
            let num = obj.type = 'add' ? 1 : -1;
            update({id:obj.id, num: num});
             // 2 更新badge
            // 触发自定义事件，告知app.vue要更新badge
            vueObj.$emit('update');

            // 3更新goodslist中的数据
            let data = getData();
            data.sort(function (item1,item2) {
                        return item1.id > item2.id
                    })
                    this.goodslist.sort(function (item1,item2) {
                        return item1.id > item2.id
                    })

                    data.forEach((item, index)=>{
                        this.goodslist[index].count = item.count;
                    })
            // 3.1 如果选中switch，计算总数和总价
            let count = 0;
            let totalPrice = 0;
            this.values.forEach((item,index)=>{
                if(item){
                    count += this.goodslist[index].count;
                    totalPrice += this.goodslist[index].count 
                        * this.goodslist[index].sell_price;
                }
            })
            this.totalPrice = totalPrice;
            this.total = count;
        }
        
    },
    watch:{
       'values':function(){
            let count = 0;
            let totalPrice = 0;
            this.values.forEach((item,index)=>{
                if(item){
                    count += this.goodslist[index].count;
                    totalPrice += this.goodslist[index].count 
                        * this.goodslist[index].sell_price;
                }
            })
            this.totalPrice = totalPrice;
            this.total = count;
        }
    }
}
</script>

<style scoped>
.mui-bar-tab ~ .mui-content{
    padding-bottom: 0;
    background-color: #fff;
}
.row{
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(1, 1, 1, 0.3);
    padding: 10px 0px;
}
.row .left{
    margin: 0px  4px;
}
.row img{
    width: 75px;
    height: 75px;
    margin-right: 4px;
}
.row .right h4{
    color: #0094ff;
    font-size: 16px;
    margin-bottom: 8px;
}
.row .right span{
    color: red;
    font-size: 20px;
}
.row .right .num{
    display: inline-block;
}
.row .right a{
    color: gray;
    font-size: 14px;
    margin-left: 5px;
}
.total{
    background-color: rgba(92, 92, 92, 0.2);
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 5px 10px;
    height: 70px;
}
.total .left{
    padding-bottom: 14px;
}
.total .left h4{
    font-weight: bold;
    font-family: '微软雅黑';
}
.total .left span{
    font-size: 14px;
}
.total .right{
    margin-top:8px;
}
</style>