<template>
    <div class="mui-content" data-custom-mui-content>
        <div class="title">
            <h4>{{ sharedetail.title }}</h4>
            <span>{{ sharedetail.add_time | fmtdate('YYYY-MM-DD')}}</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>点击次数:{{ sharedetail.click}}</span>
        </div>
        <!-- 九宫格 -->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
                 <vue-preview class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" 
                    v-for="(item,index) in thumimages" :key="index" :slides="thumimages">
		            
                        <img class="mui-media-body" :src="item.src">
                    
                 </vue-preview>  
		</ul> 
        <p class="content" v-html="sharedetail.content">
          
        </p>
        <!-- 评论 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
import Vue from 'vue'
import comment from '../../Commen/comment.vue'
import VuePreview from 'vue-preview'
Vue.use(VuePreview)




export default {
    data(){
        return {
            sharedetail:{},
            thumimages:[]
        }
    },
    props:['id'],
    created(){
        this.getsharedetail();
        this.getthumimages()
    },
    methods:{
        // 获取图片详情
        getsharedetail(){
            let url = 'getimageInfo/' + this.id;
            this.$http
            .get(url)
            .then((response)=>{
                if(response.status === 200 && response.data.status ===0){
                    if(response.data.message.length > 0){
                        this.sharedetail = response.data.message[0]
                    }  
                }else{
                    console.log('服务器内部出错了')
                }
            })
            .catch((err)=>{
                console.error((err))
            })
        },
        // 获取缩略图
        getthumimages(){
            let url = 'getthumimages/' + this.id;
            this.$http
            .get(url)
            .then((response)=>{
                if(response.status === 200 && response.data.status ===0){
                    this.thumimages = response.data.message;
                    this.thumimages.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                        item.msrc = item.src
                    });
                }else{
                    console.log('服务器内部出错了')
                }
            })
            .catch((err)=>{
                console.error((err))
            })
        }
    },
    // VuePreview插件
        getthumbImgList(){
            let {data} =  this.$http.get('getthumimages/' + this.id);
            if(data.status === 0){
                data.message.forEach(item=>{
                    item.w = 600;
                    item.h = 400;
                    item.msrc = item.src;
                })
                this.thumimages = data.message
        }
    },
    components:{
        comment
    },
}
</script>

<style scoped >

.mui-content{
    background-color: #fff;
}
.title{
        padding: 10px;
    }
    .title h4{
        color: dodgerblue;
    }
    .title span{
        font-size: 13px;
        color: rgba(92, 92, 92, 0.6);
    }
    /* 九宫格 */
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border-left: 0px;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right: 0px;
        border-bottom: 0px;
        padding: 0;
        margin: 0;
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        padding-right: 8px;
        height: 100px;
    }
    /* .mui-table-view-cell > a:not(.mui-btn){
        padding: 0px;
    } */
    
    
</style>
