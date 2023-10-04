<template>
	<h3 class="auth-stage-header__title">{{ title }}</h3>
	<h3 v-if="name" class="auth-stage-header__title">{{ name }}</h3>
	<span class="auth-stage-header__text">{{ description }}</span>
</template>

<script setup>
defineProps({
	title: String,
	description: String,
	name: String
})
</script>

<style lang="scss">
.auth-stage-header__title
{
	font-size: 32px;
	font-weight: 500;
	line-height: 40px;
	color:#1B1E22;
	margin-bottom: 8px;
	letter-spacing:-0.5px;
	&:nth-child(2){ margin-top: -10px; }
}

.auth-stage-header__text
{
	font-size: 16px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0.5px;
	color:#8E8E9A;
	display:block;
}
</style>