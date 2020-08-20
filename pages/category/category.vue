<template>
	<div class="category">
		<view class="list">
			<view v-for="(item,index) in categoriesList" :key="item.car_id">
				<text :class="{active:activeIndex===index}" @click="carClick(index)">{{item.cat_name}}</text>
			</view>
		</view>
		<view class="details">
			<view v-for="(item,index) in categoriesList[activeIndex].children" :key="cat_id">
				<view class="details-title">
					<text>/ {{item.cat_name}} /</text>
				</view>
				<view class="details-item">
					<view v-for="(item2,index2) in item.children" :key="cat_id">
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

		.list {
			width: 200rpx;
			background-color: #f5f5f5;

			view {
				text-align: center;
				height: 120rpx;

				text {
					display: inline-block;
					width: 200rpx;
					height: 100rpx;
					padding: 30rpx;
					box-sizing: border-box;
				}
			}

			.active {
				background-color: #FFFFFF;
				color: #ff2d4a;
				font-weight: 700;
				border-left: 6rpx solid #ff3954;
			}
		}

		.details {
			flex: 1;

			.details-item {
				display:flex;
				flex-wrap: wrap;
				 view {
					width: 33.33%;

					image {
						width: 100%
					}
				}
			}
		}
	}
</style>
