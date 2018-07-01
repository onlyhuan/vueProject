<template>
  <div id="app">
     <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">底部选项卡-div模式</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
				<router-link to="/home" class="mui-tab-item">
					<span class="mui-icon mui-icon-home"></span>
					<span class="mui-tab-label">首页</span>
				</router-link>
				<router-link to="/member" class="mui-tab-item">
					<span class="mui-icon mui-icon-email"></span>
					<span class="mui-tab-label">会员</span>
				</router-link>
				<router-link to="/shopcar" class="mui-tab-item">
					<span class="mui-icon mui-icon-contact"><span class="mui-badge">9</span></span>
					<span class="mui-tab-label">购物车</span>
				</router-link>
				<router-link to="/search" class="mui-tab-item">
					<span class="mui-icon mui-icon-gear"></span>
					<span class="mui-tab-label">搜索</span>
				</router-link>
		</nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
