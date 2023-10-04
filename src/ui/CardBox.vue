<template>
	<div class="card">
		<slot />
	</div>
</template>
<style lang="scss">
	.card
	{
		margin-bottom: 12px;
		border-radius: 8px;
		padding: 16px 12px;
		background: #fff;
		overflow: hidden;
		&:nth-child(5)
		{
			padding: 12px 0 12px 12px;
		}
	}
</style>