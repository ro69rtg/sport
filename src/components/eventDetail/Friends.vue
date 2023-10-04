<template>
	<div class="event-detail-friends">
		<button class="event-detail-friends__button">
			<div class="event-detail-friends__button-block">
				<Icon name="InviteFriends" size="20" />
				<span class="event-detail-friends__button-label">Пригласить друзей</span>
			</div>
			<IconArrowRight />
		</button>
	</div>
</template>

<script setup>
	import IconArrowRight from '@/components/icons/IconArrowRight';
</script>

<style lang="scss">
	.event-detail-friends__button
	{
		border: none;
		outline: none;
		padding: 6px 12px;
		width: 100%;
		height: 48px;
		box-sizing: border-box;
		color: #fff;
		font-family: 'Roboto';
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
		border-radius: 8px;
		background: $button;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.event-detail-friends__button-label { margin-left: 12px; }

	.event-detail-friends__button-block
	{
		display: flex;
		align-items: center;
	}
</style>