<template>
	<div class="user-info" @click="router.push('/profile/edit/1')">
		<div class="user-info__personal">
			<div class="user-info__avatar">
				<div class="user-info__avatar-empty" v-if="!currentUser.avatar">
					{{ shortName }}
				</div>
				<img class="user-info__avatar-icon" :src="userAvatar" alt="" v-else>
			</div>
			<div>
				<span class="user-info__firstname">
					{{currentUser.name}}
				</span>
				<span class="user-info__lastname">
					{{currentUser.lastname}}
				</span>
				<span class="user-info__email">
					{{ currentUser.email }}
				</span>
			</div>
		</div>
		<button class="user-info__link">
			<IconArrowRight />
		</button>
	</div>
</template>

<script setup>
	import { useUserStore } from '@/stores/user';
	import IconArrowRight from '@/components/icons/IconArrowRight.vue'
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const userStore = useUserStore();

	const shortName = computed(() =>
	{
		return (userStore.currentUser.name).slice(0,1).toUpperCase();
	})
	const currentUser = computed(() =>
	{
		return userStore.currentUser
	})
	const userAvatar = computed(() =>
	{
		if(currentUser.value.avatar)
		{
			return 'https://sport-up.odva.fun'+currentUser.value.avatar
		}
	})
</script>

<style lang="scss">
	.user-info
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		cursor: user-info;
	}

	.user-info__avatar { margin-right: 15px; }

	.user-info__avatar-icon,.user-info__avatar-empty
	{
		border-radius: 50%;
		height: 52px;
		width: 52px;
		object-fit: cover;
	}

	.user-info__avatar-empty
	{
		display: flex;
		align-items: center;
		justify-content: center;
		background: $primary-background;
	}

	.user-info__personal
	{
		display: flex;
		align-items: center;
	}

	.user-info__firstname,.user-info__lastname
	{
		font-family: 'Roboto';
		font-weight: 500;
		color: $primary;
		font-style: normal;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.user-info__lastname { margin-left: 5px; }

	.user-info__email
	{
		display: block;
		margin-top: 5px;
		font-size: 12px;
		font-weight: 400;
		color: $secondary-text;
	}

	.user-info__link { border: none; }
</style>