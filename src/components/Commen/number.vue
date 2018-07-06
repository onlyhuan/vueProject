<template>
<div class="mui-content">
    <div>
    购买数量:
		<div class="mui-numbox">
			<button @click="sub" class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input class="mui-input-numbox" type="number" :placeholder="count"/>
			<button @click="add" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>    
    
</div>
    
</template>


<script>

export default {
    data(){
        return{
            count:1
        }
    },
    props:['stock'],
    created(){
        
    },
    methods:{
        add(){
            if(this.count >= this.stock){
                return
            }
            this.count++;
            this.notify()
        },
        sub(){
            if(this.count === 1){
                return
            }
            this.count--;
            this.notify()
        },
        notify(){
            this.$emit('numberchange',this.count)
        }
    }
}
</script>

<style scoped>
.mui-numbox{
        width: 120px;
        height: 30px;
    }
    
</style>
