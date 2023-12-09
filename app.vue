<template>
	<div :class="{ dark: darkMode }">
		<div class="bg-white dark:bg-dim-900">
			<LoadingPage v-if="isAuthLoading" />

			<!-- App -->
			<div v-else-if="user" class="min-h-full">
				<div class="grid grid-cols-12 mx-auto sm:px-6 md:gap-3 lg:max-w-7xl lg:px-8 lg:gap-5">
					<!-- Left sidebar -->
					<div class="hidden md:block col-span-1 xl:col-span-2">
						<div class="h-screen sticky top-0">
							<SidebarLeft @on-tweet="handleOpenTweet" @on-logout="handleUserLogout" :user="user" />
						</div>
					</div>

					<!-- Main content -->
					<main class="sticky col-span-12 md:col-span-8 xl:col-span-6">
						<RouterView />
					</main>

					<!-- Right sidebar -->
					<div class="hidden md:block md:col-span-3 xl:col-span-4">
						<div class="top-0">
							<SidebarRight />
						</div>
					</div>
				</div>
			</div>

			<!-- AuthPage -->
			<AuthPage v-else />

			<UiModal :is-open="postTweetModal" @on-close="handleModalClose">
				<TweetForm :reply-to="replyTweet" show-reply :user="user" @on-success="handleFormSuccess" />
			</UiModal>
		</div>
	</div>
</template>
<script setup>
	const darkMode = ref(false);
	const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
	const { usePostTweetModal, openPostTweetModal, closePostTweetModal, useReplyTweet } = useTweets();
	const user = useAuthUser();
	const isAuthLoading = useAuthLoading();
	const postTweetModal = usePostTweetModal();
	const emitter = useEmitter();
	const replyTweet = useReplyTweet();

	emitter.$on('replyTweet', (tweet) => {
		openPostTweetModal(tweet);
	});

	emitter.$on('toggleDarkMode', () => {
		darkMode.value = !darkMode.value;
	});

	onBeforeMount(() => {
		closePostTweetModal();
		initAuth();
	});

	function handleFormSuccess(tweet) {
		closePostTweetModal();
		navigateTo({
			path: `/status/${tweet.id}`,
		});
	}

	function handleModalClose() {
		closePostTweetModal();
	}

	function handleOpenTweet() {
		openPostTweetModal(null);
	}

	function handleUserLogout() {
		logout();
	}
</script>
