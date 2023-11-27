<template>
	<div
		class="m-2 border rounded-2xl bg-gray-50 dark:bg-dim-700 overflow-hidden"
		:class="twitterBorderColor"
	>
		<h3
			class="p-3 text-xl font-bold text-gray-900 border-b dark:text-white"
			:class="twitterBorderColor"
		>
			{{ title }}
		</h3>
		<slot></slot>
		<button
			class="w-full text-left p-3 text-sm text-blue-400 hover:bg-gray-100 dark:hover:bg-dim-300"
			:class="defaultTransition"
		>
			Show more
		</button>
	</div>
</template>

<script setup>
	const { twitterBorderColor, defaultTransition } = useTailwindConfig();
	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
	});
</script>
