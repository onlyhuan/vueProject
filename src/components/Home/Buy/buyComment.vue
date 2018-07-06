<template>
    <div class="mui-content">
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from '../../Commen/comment'

export default {
    data(){
        return {

        }
    },
    props:['id'],
    components:{
        comment
    },
    created(){

    },
    methods:{

    }
}
</script>

<style scoped>

</style>
