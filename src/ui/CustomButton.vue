<template>
	<div class="custom-button">
		<button>
			{{ text }}
		</button>
	</div>
</template>

<script setup>
	const props = defineProps(['text'])
</script>

<style lang="scss">
	.custom-button
	{
		button
		{
			background: $button;
			width: 100%;
			display: flex;
			padding: 10px 24px;
			align-items: center;
			justify-content: center;
			color: #fff;
			border-radius: 8px;
			border: none;
			font-family: 'Roboto';
			font-size: 16px;
			height: 44px;
			font-weight: 500;
			box-sizing: border-box;
		}
		button:disabled,
		button[disabled]{
		pointer-events: none;
		opacity: 0.4;
		}
	}
</style>