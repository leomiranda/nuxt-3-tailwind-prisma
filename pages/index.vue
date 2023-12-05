<template>
	<div>
		<MainSection title="Home" :loading="loading">
			<Head>
				<title>Home / Twitter</title>
			</Head>

			<div class="border-b" :class="twitterBorderColor">
				<TweetForm :user="user" />
			</div>

			<TweetListFeed :tweets="homeTweets" />
		</MainSection>
	</div>
</template>

<script setup>
	const { getHomeTweets } = useTweets();
	const homeTweets = ref([]);
	const { twitterBorderColor } = useTailwindConfig();
	const loading = ref(false);
	const { useAuthUser } = useAuth();
	const user = useAuthUser();

	onBeforeMount(async () => {
		loading.value = true;
		try {
			const { tweets } = await getHomeTweets();
			homeTweets.value = tweets;
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	});
</script>
