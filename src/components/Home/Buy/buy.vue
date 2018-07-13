<template>
    <div ref="muicontent" style="overflow: scroll" class="mui-content">
        <mt-loadmore :autoFill="false" :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" ref="loadmore" 
        @bottom-status-change="statusChange">
            <ul class="mui-table-view mui-grid-view">
		        <li v-for="item in goods" :key="item.id" class="mui-table-view-cell
                mui-media mui-col-xs-6">
		            <router-link :to=" {name: 'buyDetail', params:{id:item.id}}" >
		                <img class="mui-media-object" :src="item.img_url">
		                <div class="mui-media-body">{{ item.title }}</div>
                    </router-link>
                    <div class="bottom">
                        <h6>
                            <span>￥{{ item.sell_price }}</span>
                            <s>￥{{ item.market_price }}</s>
                        </h6>
                        <div class="sell"> 
                            <span>热卖中</span>
                            <span>剩余{{ item.stock_quantity }}件</span>
                        </div>
                    </div>
                </li>
		    </ul>
        </mt-loadmore> 
            
    </div>
</template>

<script>


export default {
    data(){
        return{
            goods:[],
            allLoaded:false,
            pageindex: 1
        }
    },
    created(){
        this.getgoods()
    },
    mounted(){
        let height = document.documentElement.clientHeight;
        this.$refs.muicontent.style.height = `heigth: ${height}px`;
        // this.$refs.muicontent.style.height = height + 'px';
    },
    methods:{
        getgoods(){
            this.$http
            .get('getgoods?pageindex=' + this.pageindex)
            .then((response)=>{
                if(response.status === 200 && response.data.status === 0){
                    // 判断服务器返回的数组长度是否为0
                    if (response.data.message.length === 0) {
                    // 告诉loadmore数据加载完毕（已经没有数据了）
                        this.allLoaded = true;
                    }
                    this.goods = this.goods.concat(response.data.message); 
                    this.$refs.loadmore.onBottomLoaded();
                }else{
                    console.log('服务器内部出错了')
                }
            })
            .catch((err)=>{
                console.log((err))
            })
        },
        loadBottom() {
            
            this.pageindex++;
            this.getgoods();
            // 发送请求用的是异步请求 
           
        },
        statusChange(status){
            console.log(status);
        }
    }
}
</script>

<style scoped>
.mint-loadmore {
    padding-bottom: 50px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell{
    margin: 0 0px 6px 7px;
    border: 1px solid rgba(92, 92, 92, 0.5);
    box-shadow: 0 0 4px #666; 
}
.mui-col-xs-6 {
    width:48%;
}
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn){
    margin: -19px 6px 0px -26px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell{
    text-align: left;
}
img{
    padding-bottom:10px;
}
.bottom{
    background-color: rgba(92, 92, 92, 0.1);
    text-align: left;
    margin-left: -16px;
    padding-left:10px;
}
.bottom h6{
    padding-top: 8px;
}
.bottom>h6>span{
    font-size: 14px;
    color: red;
    margin-right: 20px;
}
.bottom .sell{
    font-size: 13px;
    color: rgba(92, 92, 92, 0.8);
    display: flex;
    justify-content: space-between;
    margin-top:15px;
    padding-bottom: 8px;
}
</style>


