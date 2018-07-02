<template>
    <div class="mui-content">
        <div class="title">
            <h3>{{ news.title }}</h3>
            <span>{{ news.add_time|fmtdate('YYYY-MM-DD') }} &nbsp;&nbsp;&nbsp;{{ news.click }}次点击</span>
        </div>
        <div class="details" v-html="news.content">
            
        </div>
        <!-- 评论 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>

import '../../../assets/css/style.css';
import comment from '../../Commen/comment.vue'
import { Toast } from 'mint-ui';

export default {
    data(){
        return{
            news:{}
        }
    },
    props:['id'],
    created(){
        this.getnewsdetail()   
    },
    methods:{
        // 获取新闻详细信息
        getnewsdetail(){
            this.$http
            .get('getnew/' + this.id)
            .then((response)=>{
                if(response.status === 200 && response.data.status
                 === 0){
                     if(response.data.message.length > 0){
                         this.news = response.data.message[0]
                     }
                 }else{
                     console.log('服务器出错了')
                 }
            })
            .catch((err)=>{
                console.error((err))
            })
        }
        // 根据ID获取新闻对应的评论信息
    },
    components:{
        comment
    }
}
</script>

<style scoped>
    .mui-content {
        background-color: #fff;
  }
    .title{
        padding: 10px 5px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.1);   
    }
    .title h3{
        font-size: 16px;
        font-weight: bold;
        color: #0094ff;
    }
    .title span{
        color:rgba(92, 92, 92, 0.7);
        font-size: 12px;
    }
    .details{
        padding: 5px 5px;
        overflow: hidden;
    }
    /* 评论 */
   
</style>




