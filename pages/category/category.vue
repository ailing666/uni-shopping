<template>
	<div class="category">
		<view class="list">
			<view v-for="(item,index) in categoriesList" :key="item.car_id" :class="{active:activeIndex===index}">
				<text @click="carClick(index)">{{item.cat_name}}</text>
			</view>
		</view>
		<view class="details">
			<image class="title-img" src="../../static/images/titleImage.png" mode=""></image>
			<view  v-for="(item,index) in categoriesList[activeIndex].children" :key="cat_id">
				<view class="details-title" v-if="item.children" >
					<text class="cat-name">{{item.cat_name}}</text>
				</view>
				<view class="details-item">
					<view  v-for="(item2,index2) in item.children" :key="cat_id">
						<image :src="item2.cat_icon" mode=""></image>
						<text>{{item2.cat_name}}</text>
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				categoriesList: []
			}
		},
		created() {
			this.getCategoriesList()
		},
		methods: {
			carClick(index) {
				this.activeIndex = index
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
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		.list {
			width: 200rpx;
			background-color: #f5f5f5;
			color: #434345;
			overflow: scroll;

			view {
				display: flex;
				align-items: center;
				text-align: center;
				height: 120rpx;

				text {
					width: 200rpx;
					height: 70rpx;
					line-height: 70rpx;
				}
			}

			.active {
				background-color: #FFFFFF;
				color: #ff2d4a;
				font-weight: 700;

				text {
					border-left: 6rpx solid #ff3954;
				}
			}
		}

		.details {
			flex: 1;
			color: #434345;
			overflow: scroll;

			.title-img {
				height: 200rpx;
				width: 93%;
				margin: 20rpx;
			}

			.details-title {
				width: 100%;
				text-align: center;
				margin: 40rpx 0;

				&::before {
					content: "/　　　";
					color: #e3e3e3;
				}

				&::after {
					content: "　　　/";
					color: #e3e3e3;
				}

				.cat-name {
					color: #434345;
				}
			}

			.details-item {
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				view {
					width: 33.33%;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 100rpx;
						height: 130rpx;
					}
				}
			}
		}
	}
</style>
