<template>
	<div class="event-detail-label">
		<span class="event-detail-label__text">{{ label }}</span>
	</div>
</template>
<script setup>
	const props = defineProps({
		size: { default: 24 },
		name: { default: '' },
		label: { default: '' }
	})

</script>
<style lang="scss">
	.event-detail-label
	{
		display: flex;
		align-items: center;
	}

	.event-detail-label__text
	{
		margin-left: 12px;
		font-family: "Roboto";
		color: #1B1E22;
		font-size: 16px;
		font-weight: 500;
		margin-left: 8px;
		position: relative;
		top: -1px;
		letter-spacing: 0.5px;
	}
</style>