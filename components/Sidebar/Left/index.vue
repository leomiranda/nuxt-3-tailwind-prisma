<template>
	<div class="h-screen flex flex-col items-center xl:items-start">
		<div
			class="p-2 my-2 hover:bg-blue-50 dark:hover:bg-white/20 rounded-full w-min"
			:class="defaultTransition"
		>
			<NuxtLink to="/">
				<div class="w-8 h-8">
					<LogoTwitter />
				</div>
			</NuxtLink>
		</div>

		<div class="mt-2 flex flex-col gap-3 items-center xl:items-start">
			<SidebarLeftTab active>
				<template v-slot:icon>
					<HomeIcon />
				</template>
				<template v-slot:name> Home </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<HashtagIcon />
				</template>
				<template v-slot:name> Explore </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<BellIcon />
				</template>
				<template v-slot:name> Notifications </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<InboxIcon />
				</template>
				<template v-slot:name> Messages </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<BookmarkIcon />
				</template>
				<template v-slot:name> Bookmarks </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<DocumentTextIcon />
				</template>
				<template v-slot:name> Lists </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<UserIcon />
				</template>
				<template v-slot:name> Profile </template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<EllipsisHorizontalCircleIcon />
				</template>
				<template v-slot:name> More </template>
			</SidebarLeftTab>

			<div class="hidden xl:block">
				<UiButton liquid size="lg" @on-click="emits('onTweet')">
					<span class="font-bold"> Tweet </span>
				</UiButton>
			</div>
			<div class="block xl:hidden rounded-full">
				<UiButton @on-click="emits('onTweet')">
					<div class="w-6 h-6 font-bold"><PencilIcon /></div>
				</UiButton>
			</div>
		</div>

		<Menu as="div" class="relative inline-block text-left mx-auto mt-auto">
			<MenuButton>
				<div
					class="flex flex-row items-center justify-center px-2 py-2 mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
					:class="defaultTransition"
				>
					<div class="flex flex-row">
						<img :src="props.user.profileImage" class="w-10 h-10 rounded-full" />
						<div class="flex-col hidden ml-2 xl:block text-left">
							<h1 class="text-sm font-bold text-gray-800 dark:text-white">
								{{ user.name }}
							</h1>
							<p class="text-sm text-gray-400">
								{{ user.handle }}
							</p>
						</div>
					</div>

					<!-- ICON -->
					<div class="hidden ml-auto xl:block dark:text-gray-500">
						<div class="w-6 h-6">
							<ChevronDownIcon />
						</div>
					</div>
				</div>
			</MenuButton>
			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-in"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<MenuItems
					class="absolute left-0 bottom-20 mt-2 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden"
				>
					<div class="px-1 py-1 hover:bg-gray-100">
						<MenuItem>
							<button @click="emits('onLogout')" class="w-full text-left p-1">Logout</button>
						</MenuItem>
					</div>
				</MenuItems>
			</transition>
		</Menu>
	</div>
</template>

<script setup>
	import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
	import { HomeIcon } from '@heroicons/vue/20/solid';
	import {
		HashtagIcon,
		BellIcon,
		InboxIcon,
		BookmarkIcon,
		DocumentTextIcon,
		UserIcon,
		EllipsisHorizontalCircleIcon,
		PencilIcon,
		ChevronDownIcon,
	} from '@heroicons/vue/24/outline';
	const { defaultTransition } = useTailwindConfig();

	const emits = defineEmits(['onTweet', 'onLogout']);

	const props = defineProps({
		user: {
			type: Object,
			required: true,
		},
	});
</script>
