<template>
       <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="(item ,index) in images" :key="index">
                <router-link :to="item.url">
                    <img :src=" item.img ">
                </router-link>
            </mt-swipe-item>
        </mt-swipe>


</template>

<script>
export default {
    data(){
        return {
            images:[],
            humimages:[]
        }
    },
    props:['imgUrl'],
    created(){
        this.getlunbo()
    },
    methods:{
        getlunbo(){
        this.$http
        .get(this.imgUrl)
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
        }
    }
}
</script>

<style scoped>
.mint-swipe{
    height: 250px;
}
.mint-swipe img{
    width: 100%;
    height: 100%;
}
</style>
