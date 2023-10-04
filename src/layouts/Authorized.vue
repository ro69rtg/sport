<template>
	<header class="layouts-authorized__header"> </header>
	<main>
		<keep-alive>
			<div class="layouts-authorized__wrapper">
				<slot></slot>
			</div>
		</keep-alive>
		<NavBar />
	</main>
	<div class="layouts-authorized__footer"> </div>
</template>
<script setup>
	import NavBar from '@/components/NavBar.vue'
</script>
.<style lang="scss">
	.layouts-authorized__wrapper
	{
		padding-bottom: 80px;
	}
</style>