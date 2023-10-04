<template>
	<div class="page-item">
		<IconInputCloser />
		<span class="page-item__name">
			{{ name }}
		</span>
	</div>
</template>

<script setup>
	import IconInputCloser from '@/components/icons/IconInputCloser.vue';
	const props = defineProps(['itemIcon', 'name'])
</script>

<style lang="scss">
	.page-item
	{
		display: flex;
		align-items: center;
		font-family: 'Roboto';
	}

	.page-item__name
	{
		color: $primary;
		font-size: 16px;
		font-weight: 500;
		margin-left: 12px;
	}
</style>