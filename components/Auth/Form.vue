<template>
	<div class="w-full">
		<div class="flex justify-center">
			<div class="w-10 h-10">
				<LogoTwitter />
			</div>
		</div>

		<div class="pt-5 space-y-6">
			<UIInput v-model="data.username" label="Username" />

			<UIInput label="Password" type="password" v-model="data.password" />

			<UIButton @click="handleLogin" liquid :disabled="isButtonDisabled"> Login </UIButton>
		</div>
	</div>
</template>

<script setup>
	const loading = ref(false);
	const data = reactive({
		username: '',
		password: '',
	});

	const isButtonDisabled = computed(() => {
		console.log('loading.value', loading.value);
		return !data.username || !data.password || loading.value;
	});

	async function handleLogin() {
		const { login } = useAuth();

		loading.value = true;

		try {
			await login({
				username: data.username,
				password: data.password,
			});
			console.log('success');
		} catch (error) {
			console.log(error);
		} finally {
			loading.value = false;
		}
	}
</script>
