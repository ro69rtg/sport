<template>
	<label class="event-create-visible">
		<div class="event-create-visible__info" >
			<IconEye
				class="event-create-visible__info-icon"
				v-if="!visibleEye"
			/>
			<IconCreateEventEyeNone
				class="event-create-visible__info-icon"
				v-if="visibleEye"
			/>
			<h3 class="event-create-visible__info-title">{{ visibleStatusRu }}</h3>
			<IconCreateEventImportant />
		</div>
		<div class="event-create-visible__box">
			<div class="event-create-visible__cwitch">
				<input class="event-create-visible__cwitch-input" type="checkbox"
					v-model ="visibleEye"
					v-on:click = "changeVision"
				>
				<span class="event-create-visible__slider event-create-visible__round"></span>
			</div>
		</div>
	</label>
</template>

<script setup>
	import IconEye from '@/components/icons/IconEye.vue';
	import IconCreateEventEyeNone from '@/components/icons/IconCreateEventEyeNone.vue';
	import IconCreateEventImportant from	'@/components/icons/IconCreateEventImportant.vue';
	import {ref, watch} from 'vue';

	const emit = defineEmits(['update'])
	const props = defineProps(['gameType']);
	const visibleEye = ref(false);
	let visibleStatus = "private";
	let visibleStatusRu = "Публичная";

	watch(() => props.gameType, (value) =>{chekVision()})

	function chekVision()
	{
		if(props.gameType === 'public')
		{
			visibleStatusRu = "Публичная";
			visibleStatus = "public";
			visibleEye.value = false;
		}
		else
		{
			visibleStatusRu = "Приватная";
			visibleStatus = "private";
			visibleEye.value = true;
		}
	}

	chekVision()
	function changeVision()
	{
		if (visibleEye.value)
		{
			visibleStatusRu = "Публичная"
			visibleStatus = "public";
			emit('update', visibleStatus)
		}
		else
		{
			visibleStatusRu = "Приватная"
			visibleStatus = "private";
			emit('update' , visibleStatus )
		}
	}
</script>

<style lang="scss">
	.event-create-visible__slider
	{
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #E5E5ED;
		-webkit-transition: .4s;
		transition: .4s;
	}

	.event-create-visible__slider:before
	{
		position: absolute;
		content: "";
		height: 10px;
		width: 10px;
		left: 5.5px;
		bottom: 3px;
		background-color: #8E8E9A;
		-webkit-transition: .4s;
		transition: .4s;
	}

	.event-create-visible__info
	{
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0.5px;
		display: flex;
		align-items: center;
		width: 45%;
		align-items: center;
	}

	.event-create-visible__info-title
	{
		font-size: 16px;
		line-height: 24px;
		font-weight: 500;
		letter-spacing: 0.5px;
		margin-right: 5px;
	}

	.event-create-visible__cwitch
	{
		position: relative;
		top: 2.5px;
		display: inline-block;
		width: 32px;
		height: 16px;
	}

	.event-create-visible__cwitch-input:checked + .event-create-visible__slider{ background-color:#239735; }

	.event-create-visible__cwitch-input:checked + .event-create-visible__slider:before
	{
		-webkit-transform: translateX(13px);
		-ms-transform: translateX(13px);
		transform: translateX(13px);
		background-color: #fff;
	}

	.event-create-visible__slider.event-create-visible__round { border-radius: 34px;}

	.event-create-visible__slider.event-create-visible__round:before { border-radius: 50%; }

	.event-create-visible__cwitch-input { display:none; }

	.event-create-visible
	{
		height: 36px;
		align-items: center;
		display: flex;
		justify-content: space-between;
		outline:none;
		border:none;
		padding: 6px 12px;
	}

	.event-create-visible__info-icon{ margin-right: 12px; }
</style>