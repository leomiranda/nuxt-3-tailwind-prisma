<template>
	<div v-if="loading" class="flex items-center justify-center py-6">
		<UiSpinner />
	</div>
	<div v-else>
		<TweetFormInput :user="props.user" @on-submit="handleFormSubmit" />
	</div>
</template>

<script setup>
	const loading = ref(false);
	const { postTweet } = useTweets();
	const props = defineProps({
		user: {
			type: Object,
			required: true,
		},
	});

	const handleFormSubmit = async (tweet) => {
		loading.value = true;
		await postTweet({
			text: tweet.text,
			mediaFiles: tweet.mediaFiles,
		});
		loading.value = false;
	};
</script>
