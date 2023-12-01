<template>
	<div :class="{ dark: darkMode }">
		<div class="bg-white dark:bg-dim-900">
			<div v-if="isAuthLoading">
				<div class="flex items-center justify-center h-screen">
					<UiSpinner />
				</div>
			</div>

			<!-- App -->
			<div v-else-if="user" class="min-h-full">
				<div class="grid grid-cols-12 mx-auto sm:px-6 md:gap-3 lg:max-w-7xl lg:px-8 lg:gap-5">
					<!-- Left sidebar -->
					<div class="hidden md:block col-span-1 xl:col-span-2">
						<div class="sticky top-0">
							<SidebarLeft />
						</div>
					</div>

					<!-- Main content -->
					<main class="col-span-12 md:col-span-8 xl:col-span-6">
						<RouterView />
					</main>

					<!-- Right sidebar -->
					<div class="hidden md:block md:col-span-3 xl:col-span-4">
						<div class="sticky top-0">
							<SidebarRight />
						</div>
					</div>
				</div>
			</div>

			<!-- AuthPage -->
			<AuthPage v-else />
		</div>
	</div>
</template>
<script setup>
	const darkMode = ref(false);
	const { useAuthUser, initAuth, useAuthLoading } = useAuth();
	const user = useAuthUser();
	const isAuthLoading = useAuthLoading();

	onBeforeMount(() => {
		initAuth();
	});
</script>