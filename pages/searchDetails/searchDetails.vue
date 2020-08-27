<template>
	<view>
		<view class="top-header" :style="{ position: isFixed ? 'fixed' : 'static' }">
			<!-- 头部 -->
			<mySearchBar @search="search" :keyword="keyword" />

			<!-- 过滤菜单 -->
			<view class="filter-menu">
				<view class="active">综合</view>
				<view>销量</view>
				<view>价格</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="goods-list" :style="{ marginTop: isFixed ? '220rpx' : '0' }">
			<view class="goods" v-for="(item, index) in goodsList" :key="index" @click="toItem(item.goods_id)">
				<image :src="item.goods_small_logo" alt=""></image>
				<view class="right">
					<view class="goods-name text-line2">{{ item.goods_name }}</view>
					<view class="price">￥<text>{{ item.goods_price }}</text>.00</view>
				</view>
			</view>
		</view>
		<!-- 最后一页提示 -->
		<view class="btm-line" v-show="isLastPage">--我是有底线的--</view>
	</view>
</template>

<script>
	import mySearchBar from '@/components/mySearchBar';

	const PAGE_SIZE = 6; //页容量
	const HISTORY_KEY = 'history';

	export default {
		components: {
			mySearchBar
		},
		data() {
			return {
				// 搜索商品列表
				goodsList: [],
				keyword: '',
				isLastPage: false,
				//是否在请求中
				//默认输入框+过滤栏固定定位
				isFixed: false
			};
		},
		onLoad(options) {
			// vue实例添加属性
			this.pageNum = 1;
			//是否在请求中
			this.isRequesting = false;

			this.keyword = options.catName;
			this.queryGoodsList();
			// 搜索页面或者分类跳转,都把关键字添加到storage
			this.addHistoryList(this.keyword)
		},
		// 下拉时会触发
		onPullDownRefresh() {
			// 请求第一页数据
			this.reload();
			this.isFixed = false;
		},
		// 上拉加载更多
		onReachBottom() {
			// 如果已经是最后一页,阻止发请求
			if (!this.isLastPage) {
				this.pageNum++;
				this.queryGoodsList();
			}
		},
		// 页面滚动时,设置固定
		onPageScroll() {
			this.isFixed = true;
		},
		methods: {
			// 关键字添加到storage
			addHistoryList(keyword) {
				// 取storage
				let historyList = uni.getStorageSync(HISTORY_KEY)
				// 更新storage
				let _historyList = [keyword, ...historyList];
				_historyList = [...new Set(_historyList)];
				// 存storage
				// 历史搜索改变应该存储到storage
				uni.setStorageSync(HISTORY_KEY, _historyList);
			},
			// 跳转到商详
			toItem(goodsId) {
				wx.navigateTo({
					url: '/pages/item/item?goodsId=' + goodsId
				});
			},
			search(inputVal) {
				// 子传给父的值,然后再reload
				this.keyword = inputVal;
				this.reload();
				// 在搜索列表页面输入时,也添加关键字到history
				this.addHistoryList(inputVal)
			},
			// 输入框键盘右下角按钮点击事件
			reload() {
				this.isLastPage = false;
				// 重新搜索时, 需要重置isLastPage;
				this.pageNum = 1;
				this.goodsList = []; //清空
				// 按关键字搜索
				this.queryGoodsList();
			},
			async queryGoodsList(keyword) {
				// 请求前,如果有请求正在处理,等待
				if (this.isRequesting) {
					return;
				}
				// 请求开始前,设置请求中
				this.isRequesting = true;

				let data = await this.$request({
					url: '/api/public/v1/goods/search',
					data: {
						query: this.keyword,
						pagenum: this.pageNum,
						pagesize: PAGE_SIZE
					},
					// 请求不需要Loading
					showLoading: false
				});
				// 请求结束后,设置不要请求中
				this.isRequesting = false;
				// 请求结束后,主动停止下拉动画
				uni.stopPullDownRefresh();
				// this.goodsList = data.goods;
				// 追加,不能直接赋值
				this.goodsList = [...this.goodsList, ...data.goods];
				// 如果数组总长度大于或者等于data.total
				if (data.total <= this.goodsList.length) {
					this.isLastPage = true;
				}
			}
		}
	};
</script>

<style lang="less">
	.top-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff;
	}

	.goods-list {
		margin-top: 220rpx;
	}

	.filter-menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;

		view.active {
			color: #eb4450;
		}
	}

	.goods {
		border-top: 1rpx solid #ddd;
		height: 260rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		display: flex;
		align-items: center;

		image {
			width: 200rpx;
			height: 200rpx;
		}

		.right {
			flex: 1;
			margin-left: 26rpx;

			.price {
				color: #eb4450;
				font-size: 24rpx;
				margin-top: 80rpx;

				text {
					font-size: 36rpx;
				}
			}
		}
	}

	.btm-line {
		text-align: center;
	}
</style>
