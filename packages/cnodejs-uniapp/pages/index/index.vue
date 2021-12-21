<template>
	<scroll-view scroll-y="true" class="scroll">
		<view v-for="item in topics" :key="item.id" class="topic">
			<view class="topic-title">
				<text class="topic-title-text">{{item.title}}</text>
			</view>
			<view class="topic-author">
				<view class="topic-author-avatar-wrapper">
					<image class="topic-author-avatar" lazy-load="" mode="scaleToFill" :src="item.author.avatar_url" />
				</view>
				<view class="topic-author-name">
					<text class="topic-author-name-text">
						{{item.author.loginname}}
					</Text>
				</view>
				<text class="topic-author-time">
					{{dateFormat(item.create_at)}}
				</Text>
			</view>

			<view class="topic-content">
				<text class="topic-content-text">
					{{contentFormat(item.content)}}
				</text>
			</view>
			<view class="topic-footer">
				<text class="topic-footer-text">
					<text>{{`${item.visit_count} 阅读`}}</text>
					<text>{" • "}</text>
					<text>{{`${item.reply_count} 评论`}}</text>
				</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import dayjs from 'dayjs';
	export default {
		data() {
			return {
				title: 'Hello Word!',
				topics: [],
			}
		},
		onLoad() {
			uni.request({
				method: 'GET',
				url: 'https://cnodejs.org/api/v1/topics', //仅为示例，并非真实接口地址。
				success: (res) => {;
					this.topics = res.data.data;
				}
			});
		},
		methods: {
			dateFormat(value) {
				return dayjs(value).format("YYYY/MM-DD HH:mm:ss");
			},
			contentFormat(value) {
				return (value || '').replace(/<[^>]+>/gi, '').replace(/\n/g, ' ');
			}
		}
	}
</script>

<style>
	.scroll {
		background-color: #f5f5f5;
	}

	.topic {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		padding: 12px 16px;
		background-color: #fff;
	}

	.topic-title {
		margin-bottom: 0px;
	}

	.topic-title-text {
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;
	}

	.topic-author {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		height: 36px;
	}

	.topic-author-avatar-wrapper {
		margin: 0 4px;
		width: 22px;
		height: 22px;
		border-radius: 11px;
		overflow: hidden;
		background-color: #eee;
	}

	.topic-author-avatar {
		width: 22px;
		height: 22px;
	}

	.topic-author-name {
		margin: 0 4px;
	}

	.topic-author-name-text {
		font-size: 14px;
		font-weight: 500;
		color: "#666";
	}

	.topic-author-time {
		color: #999;
		font-size: 13px;
	}

	.topic-content {
		margin-bottom: 10px;
	}

	.topic-content-text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		white-space: normal;
		-webkit-line-clamp: 2;
		color: #232323;
		font-size: 14px;
		line-height: 20px;
	}

	.topic-footer-text {
		color: #999;
		font-size: 13px;
		line-height: 20px;
	}
</style>
