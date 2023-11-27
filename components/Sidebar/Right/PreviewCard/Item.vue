<template>
	<div
		class="w-full text-left p-3 border-b hover:bg-gray-100 dark:hover:bg-dim-300 dark:text-white"
		:class="[defaultTransition, twitterBorderColor]"
	>
		<slot></slot>
	</div>
</template>

<script setup>
	const { defaultTransition, twitterBorderColor } = useTailwindConfig();
</script>
