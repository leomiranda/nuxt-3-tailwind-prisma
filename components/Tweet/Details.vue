<template>
	<div>
		<TweetItem :tweet="props.tweet" />

		<TweetForm
			placeholder="Tweet your reply"
			:reply-to="props.tweet"
			:user="props.user"
			@on-success="handleFormSuccess"
		/>

		<TweetListFeed :tweets="replies" />
	</div>
</template>
<script setup>
	const props = defineProps({
		tweet: {
			type: Object,
			required: true,
		},
		user: {
			type: Object,
			required: true,
		},
	});

	const replies = computed(() => props.tweet?.replies || []);

	const handleFormSuccess = async (tweet) => {
		console.log('🚀 ~ file: Details.vue:30 ~ handleFormSuccess ~ tweet:', tweet);
		await navigateTo({
			path: `/status/${tweet.id}`,
		});
	};
</script>
