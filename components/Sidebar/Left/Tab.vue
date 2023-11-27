<template>
	<NuxtLink
		to="#"
		class="flex items-center p-3 w-min rounded-full hover:bg-gray-200 dark:hover:bg-dim-200 text-black dark:text-white"
		:class="defaultTransition"
	>
		<div class="w-6 h-6">
			<slot name="icon"></slot>
		</div>
		<div class="ml-2 text-xl hidden xl:block" :class="textClasses">
			<slot name="name"></slot>
		</div>
	</NuxtLink>
</template>

<script setup>
	const { defaultTransition } = useTailwindConfig();

	const props = defineProps({
		active: {
			type: Boolean,
			required: false,
		},
	});

	const textClasses = computed(() => {
		return props.active ? 'font-semibold' : 'font-normal';
	});
</script>
