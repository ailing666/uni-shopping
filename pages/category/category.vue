<template>
	<div class="category">
		<mySearchLink></mySearchLink>
		<view class="content">
			<view class="list">
				<view v-for="(item,index) in categoriesList" :key="item.car_id" :class="{active:activeIndex===index}">
					<text @click="carClick(index)">{{item.cat_name}}</text>
				</view>
			</view>
			<view class="details">
				<image class="title-img" src="../../static/images/titleImage.png" mode=""></image>
				<view v-for="(item,index) in categoriesList[activeIndex].children" :key="item.cat_id">
					<view class="details-title" v-if="item.children">
						<text>/<text class="cat-name">{{item.cat_name}}</text>/</text>
					</view>
					<view class="details-item">
						<view v-for="(item2,index2) in item.children" :key="item2.cat_id" @click="toSearchDetails(item2.cat_name)">
							<image :src="item2.cat_icon" mode=""></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	import mySearchLink from '../../components/mySearchLink.vue'
	export default {
		components: {
			mySearchLink
		},
		data() {
			return {
				activeIndex: 0,
				categoriesList: []
			}
		},
		onLoad() {
			this.getCategoriesList()
		},
		methods: {
			carClick(index) {
				this.activeIndex = index
			},
			toSearchDetails(val) {
				uni.navigateTo({
					url: '/pages/searchDetails/searchDetails?name=' + val
				})
			},
			async getCategoriesList() {
				this.categoriesList = await this.$request({
					url: '/api/public/v1/categories'
				})
			}
		}
	}
</script>

<style lang="less">
	.category {
		.content {
			display: flex;
			position: absolute;
			top: 100rpx;
			left: 0;
			right: 0;
			bottom: 0;

			.list {
				width: 198rpx;
				background-color: #f5f5f5;
				color: #434345;
				overflow: scroll;

				view {
					display: flex;
					align-items: center;
					text-align: center;
					height: 120rpx;

					text {
						width: 198rpx;
						height: 70rpx;
						line-height: 70rpx;
						border-left: 8rpx solid transparent;
					}
				}

				.active {
					background-color: #FFFFFF;
					color: #ff2d4a;

					text {
						font-weight: 700;
						border-left: 8rpx solid #ff3954;
					}
				}
			}

			.details {
				flex: 1;
				color: #434345;
				overflow: scroll;

				.title-img {
					height: 180rpx;
					width: 520rpx;
					margin: 20rpx;
				}

				.details-title {
					width: 100%;
					text-align: center;
					height: 110rpx;
					line-height: 110rpx;
					color: #e3e3e3;


					.cat-name {
						color: #434345;
						margin: 0 30rpx;
					}
				}

				.details-item {
					display: flex;
					flex-wrap: wrap;
					align-items: center;

					view {
						width: 33.33%;
						display: flex;
						margin: 10rpx 0;
						flex-direction: column;
						align-items: center;

						image {
							width: 120rpx;
							height: 120rpx;
						}
					}
				}
			}
		}
	}
</style>
