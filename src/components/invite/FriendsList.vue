<template>
	<div class="invite-friends-list">
		<h3 v-if="!searchValue" class="invite-friends-list__title">Мои друзья</h3>
		<FriendItem />
	</div>
</template>

<style lang="scss">
	.invite-friends-list { margin-top: 5px; }

	.invite-friends-list__title
	{
		color: #1B1E22;
		font-size: 22px;
		font-weight: 500;
		margin-bottom: 12px;
		margin-top: 0;
	}
</style>

<script setup>
	import FriendItem from '@/components/invite/FriendItem.vue';

	const { searchValue } = defineProps(['searchValue']);
</script>