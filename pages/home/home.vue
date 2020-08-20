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
		<swiper indicator-dots autoplay indicator-color="rgbs(255,255,255,.5)" indicator-active-color="#fff" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key="goods_id">
				<image :src="item.image_src" ></image>
			</swiper-item>
		</swiper>
		<!-- 子导航 -->
		<view class="sub-nav">
			<view class="nav-list" v-for="(item,index) in subNavList" :key="index">
				<image :src="item.image_src"></image>
			</view>
		</view>
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
				// 轮播图列表
				swiperList:[],
				// 子导航列表
				subNavList:[],
				// 楼层列表
				floorList:[]
			}
		},
		created() {
			this.getSwiperList()
			this.getsubNavList()
		},
		methods:{
			async getSwiperList(){
				this.swiperList = await this.$request({
					url:'/api/public/v1/home/swiperdata'
				})
			},
			async getsubNavList(){
				this.subNavList = await this.$request({
					url:'/api/public/v1/home/catitems'
				})
			},
			async getFloorList(){
				this.floorList = await this.$request({
					url:'/api/public/v1/home/floordata'
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
		.sub-nav{
			display: flex;
			.nav-list{
				width: 25%;
				text-align: center;
				image{
					width: 128rpx;
					height: 140rpx;
				}
			}
		}
		/* 时尚女装 */
		.clothes{}
		/* 户外运动 */
		.sports{}
		/* 箱包配饰 */
		.accessories{}
	}

</style>
