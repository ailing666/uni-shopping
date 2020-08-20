<template>
	<view class="home">
		<!-- 搜索区域 -->
		<view class="header">
			<view class="search">
				<icon type="search" size="20" />
				<text>搜索</text>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay indicator-color="rgbs(255,255,255,.5)" indicator-active-color="#fff" :interval="3000"
		 :duration="1000">
			<swiper-item v-for="item in swiperList" :key="goods_id">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 子导航 -->
		<view class="sub-nav">
			<view class="nav-list" v-for="(item,index) in subNavList" :key="index">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<view class="floor" v-for="(item,index) in floorList" :key="index">
			<!-- 时尚女装 -->
			<view class="title">
				<image :src="item.floor_title.image_src"></image>
			</view>
			<view class="content" v-for="(item,index) in item.product_list" :key="index">
				<image :src="item.image_src"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图列表
				swiperList: [],
				// 子导航列表
				subNavList: [],
				// 楼层列表
				floorList: []
			}
		},
		created() {
			this.getSwiperList()
			this.getsubNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				this.swiperList = await this.$request({
					url: '/api/public/v1/home/swiperdata'
				})
			},
			async getsubNavList() {
				this.subNavList = await this.$request({
					url: '/api/public/v1/home/catitems'
				})
			},
			async getFloorList() {
				this.floorList = await this.$request({
					url: '/api/public/v1/home/floordata'
				})
			}
		}
	}
</script>

<style lang="less">
	.home {
		.header {
			padding: 20rpx 16rpx;
			background-color: #eb4450;

			/* 搜索区域 */
			.search {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #fff;
				height: 60rpx;
				color: #bbb;
				border-radius: 8rpx;

				icon {
					margin-right: 16rpx;
				}
			}
		}

		/* 轮播图 */
		swiper {
			width: 100vw;
			height: 340rpx;

			swiper-item {
				image {
					width: 100%;
					height: 340rpx;
				}
			}
		}

		/* 子导航 */
		.sub-nav {
			display: flex;

			.nav-list {
				width: 25%;
				text-align: center;

				image {
					width: 128rpx;
					height: 140rpx;
				}
			}
		}

		float: left;

		.floor {
			overflow: hidden;
			.title {
				margin: 10rpx 0;
				image {
					height: 56rpx;
				}
			}

			.content {
				float: left;

				image {
					width: 232rpx;
				}

				&:nth-child(2) {
					margin-right: 10rpx;
				}

				&:nth-child(n+3) {
					width: 232rpx;
					height: 235rpx;

					image {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}

					margin-right: 10rpx;
				}

				&:nth-last-child(-n+2) {
					margin-top: 10rpx;
				}
			}
		}
	}
</style>
