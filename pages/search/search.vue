<template>
	<view class="wrapper">
		<mySearchBar @search="toSearchList" />
		<view class="history-search">
			<view class="title">
				<text class="title">历史搜索</text>
				<icon type="clear" size="18" @click="clearHistory"></icon>
			</view>
			<view>
				<view v-for="(item, index) in history" :key="index" @click="toSearchList(item)">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mySearchBar from '../../components/mySearchBar';

	const HISTORY_KEY = 'history';

	export default {
		data() {
			return {
				// 页面初始时,storage=>history
				//一定要给默认值
				history: []
			};
		},
		components: {
			mySearchBar
		},
		onShow() {
			// 搜索列表页面返回搜索页面时和页面初始化,storage=>data属性
			this.history = uni.getStorageSync(HISTORY_KEY) || [];
		},
		methods: {
			// 清空历搜索
			clearHistory() {
				// 弹框提示
				uni.showModal({
					title: '提示',
					content: '你确定要清空历史搜索吗？',
					success: res => {
						// console.log(res)
						if (res.confirm) {
							// 用户确定
							// 清空界面
							this.history = [];
							// 清除指定key的storage
							uni.removeStorageSync(HISTORY_KEY);
						}
					}
				});
			},
			// 跳转搜索列表页面
			toSearchList(inputVal) {
				console.log('inputVal',inputVal);
				uni.navigateTo({
					url: '/pages/searchDetails/searchDetails?catName=' + inputVal
				});
			}
		}
	};
</script>

<style lang="less">
	.search {
		background-color: #eee;
		padding: 30rpx 15rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		position: relative;

		icon {
			position: absolute;
			top: 50rpx;
			left: 38rpx;
		}

		input {
			height: 60rpx;
			flex: 1;
			background-color: #fff;
			padding-left: 70rpx;
			box-sizing: border-box;
			border-radius: 4rpx;
		}

		button {
			width: 160rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 8rpx;
			font-size: 28rpx;
			border: 1rpx solid #bfbfbf;
			background-color: #eee;
			margin-left: 20rpx;
		}
	}

	.history-search {
		color: #333;
		font-size: 28rpx;
		padding: 30rpx 30rpx 30rpx 15rpx;

		.title {
			display: flex;
			justify-content: space-between;
		}

		view {
			display: flex;
			flex-wrap: wrap;
			margin-top: 30rpx;

			view {
				height: 64rpx;
				line-height: 64rpx;
				padding: 0 26rpx;
				background-color: #ddd;
				margin: 0 30rpx 16rpx 0;
			}
		}
	}
</style>
