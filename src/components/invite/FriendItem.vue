<template>
	<div class="invite-friend-item">
		<img
			src="https://img.freepik.com/premium-psd/a-cat-with-yellow-eyes-sitting-on-a-yellow-transparent-background_540808-62.jpg"
			alt="img"
			class="invite-friend-item__logo-img"
		>
		<span class="invite-friend-item__name">Александр Е.</span>
		<button
			class="invite-friend-item__btn"
			:class="{'invite' : isInvite,'accepted' : isAccepted, 'sent' : isSent }"
			>
			<span class="invite-friend-item__btn-text" v-if="isInvite" >Пригласить</span>
			<span class="invite-friend-item__btn-text" v-if="isSent" >Отправлено</span>
			<span class="invite-friend-item__btn-text" v-if="isAccepted" >Принял</span>
			<IconInviteFriendsCheck v-if="isAccepted" />
		</button>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import IconInviteFriendsCheck from'@/components/icons/IconInviteFriendsCheck.vue';

	const isInvite = ref(false);
	const isSent = ref(false);
	const isAccepted = ref(true);
</script>
<style lang="scss">
	.invite-friend-item
	{
		border-radius: 8px;
		background: #fff;
		display: flex;
		padding: 8px 13px 8px 12px;
		align-items: center;
		gap: 12px;
		margin-bottom: 10px;
		&:last-child{ margin-bottom: 0; }
	}

	.invite-friend-item__logo-img
	{
		width: 32px;
		height: 32px;
		border-radius: 50%;
		cursor: pointer;
	}

	.invite-friend-item__name
	{
		color: #1B1E22;
		font-size: 14px;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0.25px;
	}

	.invite-friend-item__btn
	{
		display: flex;
		padding: 5px 11px 5px 10px;
		justify-content: center;
		align-items: center;
		gap: 5px;
		border-radius: 6px;
		border: none;
		color: #fff;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.1px;
		margin-left: auto;

		&.invite { background: #239735; }

		&.sent { background: #0A84FF; }

		&.accepted
		{
			background: #32D74B;
			padding: 5px 13px 5px 11px;
		}
	}
</style>