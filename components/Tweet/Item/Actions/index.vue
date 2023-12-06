<template>
	<div class="flex items-center justify-around w-full">
		<TweetItemActionsIcon color="blue" @on-click="emits('onCommentClick')" :size="size">
			<template v-slot:icon="{ classes }">
				<ChatBubbleOvalLeftEllipsisIcon :class="classes" />
			</template>

			<template v-if="showStats" v-slot:default>
				{{ props.tweet.repliesCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon :size="size">
			<template v-slot:icon="{ classes }">
				<ArrowPathIcon :class="classes" />
			</template>

			<template v-if="showStats" v-slot:default>
				{{ generateRandomNumber() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon :size="size">
			<template v-slot:icon="{ classes }">
				<HeartIcon :class="classes" />
			</template>

			<template v-if="showStats" v-slot:default>
				{{ generateRandomNumber() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon :size="size">
			<template v-slot:icon="{ classes }">
				<ArrowUpTrayIcon :class="classes" />
			</template>

			<template v-if="showStats" v-slot:default>
				{{ generateRandomNumber() }}
			</template>
		</TweetItemActionsIcon>
	</div>
</template>
<script setup>
	import {
		ChatBubbleOvalLeftEllipsisIcon,
		ArrowPathIcon,
		HeartIcon,
		ArrowUpTrayIcon,
	} from '@heroicons/vue/24/outline';

	const emits = defineEmits(['onCommentClick']);

	const props = defineProps({
		tweet: {
			type: Object,
			required: true,
		},
		compact: {
			type: Boolean,
			default: false,
		},
	});

	const showStats = computed(() => props.compact);
	const size = computed(() => (props.compact ? 5 : 6));

	function generateRandomNumber() {
		return Math.floor(Math.random() * 100);
	}
</script>
