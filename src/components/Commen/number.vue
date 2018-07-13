<template>
<div class="mui-content">
		<div class="number">
			<div @click="add" class="left">+</div><div class="middle"> {{ count }}
            </div><div class="right" @click="sub">-</div>
		</div>  
</div>
    
</template>


<script>

export default {
    data(){
        return{
            count: 1,
            type:''
        }
    },
    props:['stock', 'num', 'id'],
    created(){
        this.count = this.num ? this.num : 1;
    },
    methods:{
        add() {
            if(this.count >= this.stock){
                return;
            }
            this.count++;
            this.type = 'add';
            this.notify()
        },
        sub() {
            if(this.count === 1){
                return;
            }
            this.count--;
            this.type = 'sub';
            this.notify()
        },
        notify(){
            this.$emit('numberchange', {id: this.id, count: this.count, type: this.type})
        }
    }
}
</script>

<style scoped>
.number {
  display: inline-block;
  text-align: center;
}

.number .left,
.number .middle,
.number .right {
  display: inline-block;
  width: 30px;
  height: 25px;
  border: 1px solid rgba(92, 92, 92, 0.5);
}

.number .middle {
  width: 40px;
  border-right: 0px;
  border-left: 0px;
}
    
</style>
