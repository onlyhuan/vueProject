<template>
    <div class="mui-content">
        <div class="title">
            <h3>{{ news.title }}</h3>
            <span>{{ news.add_time|fmtdate('YYYY-MM-DD') }} &nbsp;&nbsp;&nbsp;{{ news.click }}次点击</span>
        </div>
        <div class="details" v-html="news.content">
            
        </div>
        <!-- 评论 -->
        <div class="comment">
            <h4>提交评论</h4>

            <div class="submitcomment">
                <textarea v-model="content" placeholder="请输入评论内容"></textarea>
                <button @click="send" class="mui-btn mui-btn-primary">发表</button>
            </div>

            

            <div class="list">
                <h4>评论列表</h4>
            </div>
            
            <div class="item" v-for="(item,index) in comments" :key="index">
                <div class="content">{{ item.content }}</div>
                <div>
                    <span class="user">{{ item.user_name }}</span>
                    <span>{{ item.add_time|fmtdate('YYYY-MM-DD HH:mm:ss') }}</span>
                </div>
            </div>

            <div class=" more">
                <button @click="loadmore" class="mui-btn mui-btn-primary mui-btn-outlined">加载更多</button>
            </div>
        </div>
    </div>
</template>

<script>

import '../../../assets/css/style.css';
import { Toast } from 'mint-ui';

export default {
    data(){
        return{
            news:{},
            comments: [],
            content:'',
            pageindex:1
        }
    },
    props:['id'],
    created(){
        this.getnewsdetail();
        this.getcomments()
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
        },
        // 根据ID获取新闻对应的评论信息
        getcomments(){
            let url = 'getcomments/' + this.id + '?pageindex=' + this.pageindex;
            this.$http
            .get(url)
            .then((response)=>{
                if(response.status === 200 && response.data.status === 0 ){
                    this.comments = this.comments.concat(response.data.message)
                }else{
                    console.log('服务器出错了')
                }
            })
            .catch((err)=>{
                console.error('err')
            })
        },
        // 发表评论
        send(){
            if(this.content.length === 0){
                Toast('请输入内容');
                return;
            }
            let  url = 'postcomment/' + this.id;
            this.$http
            .post(url,'content=' + this.content)
            .then((response)=>{
                if(response.status === 200 && response.data.status === 0){
                    
                    this.comments.unshift({
                        user_nmae:'匿名用户',
                        add_time: new Date(),
                        content: this.content
                    })
                    this.content = '';
                }else{
                    
                }
                Toast(response.data.message);
            })
            .catch((err)=>{
                console.error((err))
            })
        },
        // 加载更多
        loadmore(){
           this.pageindex++;
           this.getcomments()
        }
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
    .submitcomment{
        text-align: center;
        padding: 0 10px;
    }
    .submitcomment textarea{
        margin-top: 10px;
        height: 60px; 
        /* width: 96%; */
        padding: 0; 
    }
    .mui-btn-primary{
        width: 100%;
    } 
    .comment .list{
        border-top: 1px solid rgba(92, 92, 92, 0.4);
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
        margin: 20px 0 0 0;
        vertical-align:middle;
        padding: 10px 0;
    }
    .comment .item{
        margin: 0 0 10px 0;
        padding:20px 10px;
        border-bottom:  1px solid rgba(92, 92, 92, 0.4);
    }
    .item .content{
        padding-bottom: 8px;
    }
    .item div{
        display: flex;
        justify-content: space-between;
    }
    .item span{
        color: skyblue;
        font-size: 15px;
    }
    .more{
        margin-top: 2px;
        margin-bottom: 10px;
        padding: 5px 10px;
        text-align: center;
    }
</style>




