<template>
	<!-- 搜索热区 -->
	<view class="search-link" @click="toSearch">
		<view class="inner">
			<!-- 小程序组件 -->
			<icon type="search" size="16" />
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		// 跳转搜索页面
		toSearch() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		}
	}
};
</script>

<!-- 组件必须加scoped -->
<style lang="less" scoped>
.search-link {
	height: 100rpx;
	background-color: #eb4450;
	padding: 20rpx 16rpx;
	box-sizing: border-box;
	.inner {
		height: 60rpx;
		background-color: #fff;
		border-radius: 8rpx;
		// 子元素居中
		display: flex;
		justify-content: center;
		align-items: center;
		icon {
			margin-top: 4rpx;
		}
		text {
			margin-left: 16rpx;
			color: #bbb;
		}
	}
}
</style>
