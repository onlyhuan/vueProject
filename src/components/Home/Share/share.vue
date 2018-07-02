<template>
    <div class="mui-content">
        <!-- 列表 -->
        <div class="title">
            <ul :style="ulWidth">
                <li>
                    <a  @click.prevent="getimages(-1)" href="javascript:;">
                        全部
                    </a>
                </li>
                <li v-for="item in menus" :key="item.id">
                    <a @click.prevent="getimages(item.id)" href="javascript:;">
                        {{item.title}}
                    </a>
                </li>
            </ul>
        </div>
        <!-- 图片 -->

        <div class="images">
            <ul>
                <li v-for="item in images" :key="item.id">
                    <router-link :to="{name:'shareDetail', params:{id:item.id}}" >
                        <img :src="item.img_url">
                        <p class="cover">
                            <span>
                                {{item.title}}
                            </span><br>
                            {{item.zhaiyao}}
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            menus:[],
            ulWidth:'width:600px',
            images:[]
        }
    },
    created(){
        this.getmenus();
        this.getimages(-1)
    },
    methods:{
        // 获取分类数据
        getmenus(){
            this.$http
            .get('getimgcategory')
            .then((response)=>{
                if(response.status === 200 && response.data.status ===0 ){
                    this.menus = response.data.message;
                    // 计算ul的宽度
                    this.ulWidth = 'width:' + (85 * this.menus.length + 50) + 'px';
                }else{
                    console.log('服务器出错了')
                }
            })
            .catch((err)=>{
                console.error((err))
            })
        },
        // 获取图片
        getimages(id){
            let url = 'getimages/' + id;
            this.$http
            .get(url)
            .then((response)=>{
                if(response.status === 200 && response.data.status ===0 ){
                    this.images = response.data.message;
                }else{
                    console.log('服务器出错了')
                }
            })
            .catch((err)=>{
                console.error((err))
            })
        }
    }
}
</script>

<style scoped>
    .title {
        overflow-x: auto;
        overflow-y: hidden;
    }
    /* ::-webkit-scrollbar{
        display: none;
    } */
    .title ul{
        width: 1000px;
        display: inline-block;
        margin: 0;
        padding: 0;
    }
    .title li{
        list-style: none;
        display: inline-block;
        margin: 20px 8px;
    }
    /* 图片 */
    .images ul{
        margin: 0;
        padding: 0;
        margin-bottom: 10px;
    }
    .images li{
        position: relative;
        list-style: none;
        width: 100%;
    }
    .images a{
        display: block;
        width: 100%;
    }
    .images img{
        width:100%;
        height: 300px;
    }
    .images .cover>span {
      font-weight: bold;
  }
    .cover{
        position: absolute;
        left: 0px;
        bottom: 0px;
        color: #fff;
        background-color: rgba(92, 92, 92, 0.4);
        width: 100%;
        margin-bottom: 5px;
    }
</style>


