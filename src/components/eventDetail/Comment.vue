<template>
	<div class="event-detail-comment">
		<div class="event-detail-comment__block">
			<IconEventDetailComment class="event-detail-date-and-time__icon"/>
			<span class="event-detail-comment__title">
				Комментарии
			</span>
		</div>
		<div class="event-detail-comment__block event-detail-comment__block-note">
			<div class="event-detail-comment__content">
				<p class="event-detail-comment__content-text">
					{{comment}}
				</p>
			</div>
		</div>
	</div>
</template>
<script setup>
	import LabelItem from '@/components/eventDetail/Label.vue';
	import IconEventDetailComment from '@/components/icons/IconEventDetailComment.vue';

	const props = defineProps(['comment']);

</script>
<style lang="scss">
	.event-detail-comment { font-family:"Roboto"; }

	.event-detail-comment__block
	{
		width: 100%;
		display: flex;
		align-items: center;
		gap: 12px;
		padding-bottom: 12px;
	}

	.event-detail-comment__block-note { padding-bottom: 0; }

	.event-detail-comment__title
	{
		color: #1B1E22;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.event-detail-comment__content { padding-left: 36px; }

	.event-detail-comment__content-text
	{
		color: $secondary-text;
		margin: 0;
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
	}
</style>