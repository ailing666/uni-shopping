<template>
	<div class="category">
		<view class="list">
			<view v-for="(item,index) in categoriesList" :key="item.car_id">
				<text  :class="{active:activeIndex===index}" @click="carClick(index)">{{item.cat_name}}</text>
			</view>
		</view>
		<view class="details">

		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:0,
				categoriesList: []
			}
		},
		created() {
			this.getCategoriesList()
		},
		methods: {
			carClick(index){
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
	.category{
		.list{
			width: 200rpx;
			background-color: #f5f5f5;
			view{
				text-align: center;
				height: 120rpx;
				text{
					display: inline-block;
					width: 200rpx;
					height: 100rpx;
					padding: 30rpx;
				box-sizing: border-box;
				}
				
			}
			.active{
				background-color: #FFFFFF;
				color: #ff2d4a;
				font-weight: 700;
				border-left: 6rpx solid #ff3954;
			}
		}
	}
</style>
