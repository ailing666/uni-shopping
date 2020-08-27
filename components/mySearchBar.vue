<template>
	<view class="header">
		<view class="wrapper">
			<icon class="search-icon" type="search" size="16"></icon>
			<input type="text" confirm-type="search" v-model.trim="inputVal" @confirm="confirmHandler" />
			<icon class="clear-icon" type="clear" size="16" color="#ccc" v-show="inputVal" @click="inputVal = ''"></icon>
		</view>
	</view>
</template>

<script>
export default {
	props: ['keyword'],
	data() {
		return {
			// 输入框的值
			//prop赋值给data属性，避免子改父prop
			inputVal: this.keyword
		};
	},
	methods: {
		confirmHandler() {
			// 如果输入内容有的话,$emit事件,并传输入内容
			if (this.inputVal) {
				this.$emit('search', this.inputVal);
			}
		}
	},
	watch: {
		keyword(newValue) {
			// 父组件onLoad改变keyword,子组件prop变化后,再设置给data.inputVal
			this.inputVal = newValue;
		}
	}
};
</script>

<style lang="less" scoped>
.header {
	height: 120rpx;
	background-color: #eee;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	.wrapper {
		background-color: #fff;
		display: flex;
		align-items: center;
		height: 60rpx;
		width: 100%;
		input {
			flex: 1;
			box-sizing: border-box;
		}
		.search-icon {
			margin-left: 44rpx;
			margin-right: 10rpx;
		}

		.clear-icon {
			margin-right: 44rpx;
		}
	}
}
</style>
