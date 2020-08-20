<template>
	<view class="home">
		<!-- 搜索区域 -->
	<view class="header">
		<view class="search">
			 <icon type="search" size="20"/>
			 <text>搜索</text>
		</view>
	</view>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key="goods_id">
				<image :src="item.image_src" ></image>
			</swiper-item>
	
		</swiper>
		<!-- 子导航 -->
		<view class="sub-nav"></view>
		<!-- 时尚女装 -->
		<view class="clothes">
		</view>
		<!-- 户外运动 -->
		<view class="sports">
		</view>
		<!-- 箱包配饰 -->
		<view class="accessories">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[]
			}
		},
		created() {
			this.getSwiperList()
		},
		methods:{
			async getSwiperList(){
				this.swiperList = await this.$request({
					url:'/api/public/v1/home/swiperdata'
				})
			}
		}
	}
</script>

<style lang="less">
	.home{
		.header{
			padding:20rpx 16rpx;
			background-color: #eb4450;
			/* 搜索区域 */
			.search{
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #fff;
				height: 60rpx;
				color: #bbb;
				border-radius: 8rpx;
				icon{
					margin-right: 16rpx;
				}
			}
		}

		/* 轮播图 */
		swiper{
			width: 100vw;
			height: 340rpx;
			swiper-item{
				image{
					width: 100%;
					height: 340rpx;
				}
			}
		}
		/* 子导航 */
		.sub-nav{}
		/* 时尚女装 */
		.clothes{}
		/* 户外运动 */
		.sports{}
		/* 箱包配饰 */
		.accessories{}
	}

</style>
