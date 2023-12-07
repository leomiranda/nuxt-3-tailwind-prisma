<template>
	<div>
		<MainSection title="Tweet" :loading="loading">
			<Head>
				<Title>Tweet</Title>
			</Head>

			<TweetDetails :user="user" :tweet="tweet" />
		</MainSection>
	</div>
</template>
<script setup>
	const loading = ref(false);
	const tweet = ref(null);
	const route = useRoute();
	const { getTweetById } = useTweets();
	const { useAuthUser } = useAuth();
	const user = useAuthUser();

	watch(
		() => route.fullPath,
		() => {
			if (!route.params.id || route.params.id === 'undefined') {
				return;
			}
			getTweet();
		}
	);

	async function getTweet() {
		loading.value = true;
		try {
			const response = await getTweetById(route.params.id);

			tweet.value = response.tweet;
		} catch (error) {
			console.log(error);
		} finally {
			loading.value = false;
		}
	}

	onBeforeMount(() => {
		getTweet();
	});
</script>
