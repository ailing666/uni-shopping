<template>
	<view class="wrapper">
		<swiper class="swiper" indicator-dots autoplay circular indicator-color="#ccc" indicator-active-color="#fff">
			<block v-for="(item, index) in goods.pics" :key="index">
				<swiper-item><image class="swiper-img" :src="item.pics_big" @click="prevImg(index)"></image></swiper-item>
			</block>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info">
			<view class="price">￥{{ goods.goods_price }}</view>
			<view class="name-favo">
				<view class="name">{{ goods.goods_name }}</view>
				<view class="favo">
					<text class="iconfont icon-share"></text>
					<text>分享</text>
					<button open-type="share">分享</button>
				</view>
			</view>
			<view class="express">快递: 免运费</view>
		</view>
		<view class="promote">
			<view>
				<text class="name">促销</text>
				<text class="detail">满300减30元</text>
			</view>
			<view class="brother">
				<text class="name">已选</text>
				<text class="detail gray">黑色/S/1件</text>
			</view>
		</view>
		<!-- 图文介绍 -->
		<view class="goods-detail">
			<view class="tabs">
				<text class="active">图文介绍</text>
				<text>规格参数</text>
			</view>
			<view class="main">
				<!-- <view v-html="goods.goods_introduce">图文介绍</view> -->
				<rich-text :nodes="goods.goods_introduce"></rich-text>
				<view v-show="false">商品参数</view>
			</view>
		</view>
		<view class="fixed-bottom">
			<view class="icon-text">
				<text class="iconfont icon-kefu"></text>
				<text>联系客服</text>
				<button open-type="contact">客服</button>
			</view>
			<view class="icon-text" @click="toCart">
				<text class="iconfont icon-cart"></text>
				<text>购物车</text>
			</view>
			<view class="btn add-cart-btn" @click="add2Cart">加入购物车</view>
			<view class="btn buy-btn">立即购买</view>
		</view>
	</view>
</template>

<script>
const CART_KEY = 'cart';

export default {
	data() {
		return {
			// 当前商品详情
			goods: {}
		};
	},
	onLoad(options) {
		console.log(options.goodsId);
		this.goodsId = options.goodsId;
		this.queryGoodsDetail();
	},
	// 开启分享
	onShareAppMessage() {
		// 定制分享弹窗
		return {
			title: this.goods.goods_name,
			// path: //分享后，别人点击时去到的路径。默认是当前页面
			imageUrl: this.goods.pics[0].pics_big //自定义图片
		};
	},
	methods: {
		// 对象的方式把当前商品加入购物车
		add2Cart() {
			// 取storage
			let cartObj = uni.getStorageSync(CART_KEY) || {};
			//更新
			// 获取当前商品id
			let goodsId = this.goods.goods_id;
			// 判断是否是首次添加
			// if (cartObj[goodsId]) {
			// 	//非首次添加,num+1,checked:true
			// 	cartObj[goodsId].checked = true;
			// 	cartObj[goodsId].num = cartObj[goodsId].num + 1;
			// } else {
			// 	// 首次添加checked:true,num=1
			// 	cartObj[goodsId] = {
			// 		checked: true,
			// 		num: 1
			// 	};
			// }
			//
			cartObj[goodsId] = {
				checked: true,
				// 如果首次添加,num1:1;否则num++
				num: cartObj[goodsId] ? cartObj[goodsId].num + 1 : 1
			};
			// 存storage
			uni.setStorageSync(CART_KEY, cartObj);
			// 加入成功提示
			uni.showToast({
				title: '加入购物车成功！'
			});
		},
		// 跳转购物车
		toCart() {
			uni.switchTab({
				url: '/pages/cart/cart'
			});
		},
		// 预览图片
		prevImg(index) {
			// let urls = [];
			// this.goods.pics.forEach(item => {
			// 	urls.push(item.pics_big);
			// });

			let urls = this.goods.pics.map(item => {
				return item.pics_big;
			});
			uni.previewImage({
				// current:urls[index],
				current: index,
				// urls:urls
				urls
			});
		},
		async queryGoodsDetail() {
			this.goods = await this.$request({
				url: '/api/public/v1/goods/detail?goods_id=' + this.goodsId
			});
		}
	}
};
</script>
<style lang="less">
.iconfont {
	font-size: 40rpx;
}
.wrapper {
	background-color: #f4f4f4;
	padding-bottom: 98rpx;
}

.swiper {
	height: 720rpx;
}

.swiper-img {
	width: 100%;
	height: 720rpx;
}

.goods-info {
	padding: 40rpx 0 30rpx 20rpx;
	background-color: #fff;

	.price {
		color: #eb4450;
		font-size: 40rpx;
	}

	.name-favo {
		display: flex;
		height: 78rpx;
		margin-top: 14rpx;

		.name {
			color: #333;
			flex: 1;
			font-size: 28rpx;
			padding-right: 78rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2; // 控制多行的行数
			-webkit-box-orient: vertical;
		}

		.favo {
			border-left: 1px solid #ddd;
			width: 144rpx;
			color: #999;
			font-size: 24rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			button {
				position: absolute;
				opacity: 0;
			}
		}
	}

	.express {
		color: #999;
		font-size: 24rpx;
		margin-top: 20rpx;
	}
}

.promote {
	margin-top: 20rpx;

	view {
		background-color: #fff;
		height: 96rpx;
		line-height: 96rpx;
		font-size: 28rpx;
		margin-top: 20rpx;
		padding-left: 20rpx;

		&.brother {
			margin-top: 0;
		}

		.name {
			color: #404040;
		}

		.detail {
			color: #ff4055;
			margin-left: 40rpx;

			&.gray {
				color: #dfdfdf;
			}
		}
	}
}

.goods-detail {
	margin-top: 20rpx;
	background-color: #fff;

	.tabs {
		display: flex;

		text {
			flex: 1;
			text-align: center;
			color: #404040;
			font-size: 22rpx;
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;

			&.active {
				color: #ff4055;
				border-bottom: 10rpx solid #ff2644;
			}
		}
	}
}

.fixed-bottom {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 98rpx;
	display: flex;
	background-color: #fff;

	.icon-text {
		flex: 2;
		font-size: 20rpx;
		color: #404040;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		button {
			position: absolute;
			opacity: 0;
		}
	}

	.btn {
		flex: 3;
		color: #fff;
		text-align: center;
		line-height: 98rpx;

		&.add-cart-btn {
			background-color: #ffb400;
		}

		&.buy-btn {
			background-color: #ff2d4a;
		}
	}
}
</style>
