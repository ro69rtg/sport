<template>
	<div class="event-create__input-box" >
		<input
			class="event-create__input"
			type="text"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			:placeholder = "title"
		>
		<p class="event-create__inp-placeholder" v-if="modelValue">{{title}}</p>
		<div
			v-if="modelValue"
			@click = "$emit('update:modelValue', $event.target.value = '')"
		>
			<IconInputCloser class="event-create__input-closer"/>
		</div>
	</div>
</template>
<script setup>
	import IconInputCloser from '@/components/icons/IconInputCloser.vue';
	import {ref} from 'vue';

	const props = defineProps(['modelValue','title']);
	const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss">
	.event-create__input { height: 48px }

	.event-create__input
	{
		caret-color: #32D74B;
		outline:none;
		border: none;
		width: 100%;
		height: 18px;
		font-size: 14px;
		height: 26px;
		padding: 8px 16px 8px 16px;
	}

	.event-create__input-box:first-child .event-create__input
	{
		border-radius: 0;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	.event-create__input-box:last-child .event-create__input
	{
		border-radius: 0;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}
</style>