<template>
	<div class="pages-invite-friends">
		<Search :search-value="searchValue" @update:search-value="updateSearchValue" />
		<FriendsList :search-value="searchValue" />
	</div>
</template>

<style lang="scss">
	.invite-friends { padding: 14px 12px; }
</style>

<script setup>
	import { ref } from 'vue';
	import Search from '@/components/Search.vue';
	import FriendsList from '@/components/invite/FriendsList.vue';

	const searchValue = ref("");

	const updateSearchValue = (newValue) =>
	{
		searchValue.value = newValue;
		if(!searchValue.value.length)
			console.log("Null value");
		else
			console.log(searchValue.value);
	};
</script>