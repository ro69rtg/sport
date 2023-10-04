<template>
	<div class="event-detail-members">
		<div class="event-detail-members__block">
			<div class="event-detail-members__box">
				<IconEventDetailMembers />
				<span class="event-detail-members__title">Участники</span>
			</div>

			<div class="event-detail-members__count">
				<span class="event-detail-members__count-accepted">{{ game.members.length }}</span>
				<span class="event-detail-members__count-slash" >/</span>
				<span class="event-detail-members__count-total">{{ game.membersCount }}</span>
			</div>
		</div>

		<div
			class="event-detail-members__list"
			v-for="user in game.members"
			:key="user.id"
		>
			<div class="event-detail-members__user">
				<div class="event-detail-members__info">
					<div class="event-detail-members__row">
						<div class="event-detail-members__avatar">
							<img
								:src="url + JSON.parse(user.avatar)[0].path"
								@error="imageLoadOnError"
								v-if="!isIconError"
								@click="router.push(`/profile/` + user.id)"
							>
							<div v-if="!user.avatar || isIconError" class="user-avatar__default">
								<span class="user-avatar__default-text">{{ user.name[0] }}</span>
							</div>
						</div>
						<div class="event-detail-members__info-box">
							<div class="event-detail-members__info-name">
								<span>{{ user.name }}</span>
								<div class="event-detail-members__info-nick">
									<span>{{ user.email }}</span>
								</div>
							</div>
							<span class="event-detail-members__info-payment">
								Не оплачено
							</span>

							<div class="event-detail-members__options">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="event-detail-members__join" v-if="!isPassedEvent">
			<button class="event-detail-members__join-button" v-if="!isJoin" @click="joinToEvent">
				<IconEventDetailPlus class="event-detail-members__join-plus" />
				<span class="event-detail-members__join-text">Участвовать</span>
			</button>
			<button class="event-detail-members__close-button" v-if="isJoin">
				<IconEventDetailExit class="event-detail-members__join-plus" />
				<span class="event-detail-members__close-text">Выйти из игры</span>
			</button>
		</div>
		<div class="event-detail-members__passed" v-if="isPassedEvent">
			<button class="event-detail-members__rating-button" v-if="isJoin" @click="router.push('/rating/')">
				<IconEventMembersRating class="event-detail-members__join-plus" />
				<span class="event-detail-members__rating-text">Оценить участников</span>
			</button>
			<button class="event-detail-members__close-button" v-if="role === 'admin' ">
				<IconEventDetailClose class="event-detail-members__join-plus" />
				<span class="event-detail-members__close-text">Закрыть игру</span>
			</button>
		</div>
	</div>
</template>

<script setup>
	import IconEventDetailPlus from '@/components/icons/IconEventDetailPlus.vue';
	import IconEventDetailExit from '@/components/icons/IconEventDetailExit.vue';
	import IconEventDetailMembers from '@/components/icons/IconEventDetailMembers.vue';
	import IconEventDetailClose from '@/components/icons/IconEventDetailClose.vue';
	import IconEventMembersRating from '@/components/icons/IconEventMembersRating.vue';
	import { useUserStore } from '@/stores/user';
	import { ref ,computed } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const userStore = useUserStore();

	const isIconError = ref();
	const url = process.env.MAIN_HOST;
	const emit = defineEmits();
	const props = defineProps({
		game: Object,
		isJoin: Boolean,
		isPassedEvent: Boolean,
		role: String
	});

	const game = { ...props.game };
	const joinToEvent = function ()
	{
		emit("joinToEvent");
	}

	const imageLoadOnError = (e) => isIconError.value = true;
</script>

<style lang="scss">
	.event-detail-members__title
	{
		color: #1B1E22;
		font-family: Roboto;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.event-detail-members .event-detail-members__block
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 12px;
		font-family: Roboto;
	}

	.event-detail-members__block { margin-bottom: 12px; }

	.event-detail-members__count
	{
		display: flex;
		gap: 4px;
	}

	.event-detail-members__count-accepted,
	.event-detail-members__count-slash,
	.event-detail-members__count-total
	{
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.event-detail-members__count-accepted { color: #239735; }

	.event-detail-members__count-slash { color: #B9B9CE; }

	.event-detail-members__count-total { color: #1B1E22; }

	.event-detail-members__join-button
	{
		border: none;
		border-radius: 8px;
		background: #239735;
		display: flex;
		padding: 10px 24px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		width: 96%;
		margin-bottom: 10px;
	}

	.event-detail-members__join-text
	{
		color: var(--White, #FFF);
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.event-detail-members__list { padding-top: 18px; }

	.event-detail-members__user
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 13px;
		flex-wrap: wrap;

		&:last-child .event-detail-members__info-box { border: none; }
	}

	.event-detail-members__info { width: 100%; }

	.event-detail-members__info-box
	{
		display: flex;
		width: 100%;
		padding-bottom: 12px;
		border-bottom: 1px solid #E5E5ED;
		padding-right: 12px;
	}

	.event-detail-members__row
	{
		width: 100%;
		display: flex;
		align-items: center;
	}

	.event-detail-members__info-payment
	{
		align-self: flex-start;
		font-family: 'Roboto';
		background: $secondary-text;
		border-radius: 3px;
		padding: 1.5px 3px;
		color: #fff;
		margin-left: 8px;
		font-size: 8px;
		font-weight: 600;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		position: relative;
		top: 3px;

		&.active
		{
			background: #239735;
			margin-left: 9px;
		}
	}

	.event-detail-members__info-name
	{
		font-family: Roboto;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0.25px;
	}


	.event-detail-members__info-nick
	{
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		letter-spacing: 0.1px;
		color: $secondary-text;
		position: relative;
		top: 1px;
	}

	.event-detail-members__options
	{
		position: relative;
		top: 6px;
		right: 2px;
		margin-left: auto;

		& .fill-current
		{
			width: 20px;
			height: 21px;
		}
	}

	.event-detail-members__avatar
	{
		min-height: 32px;
		min-width: 32px;
		max-height: 32px;
		max-width: 32px;
		overflow: hidden;
		margin-right: 12px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(10, 132, 255, 0.5);
		color: #fff;
		object-fit: cover;
		position: relative;
		top: -6px;
	}

	.event-detail-members__box
	{
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.event-detail-members__close-button
	{
		display: flex;
		padding: 10px 24px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		width: 96%;
		background: #E5E5ED;
		border: none;
	}

	.event-detail-members__close-text
	{
		color: #1B1E22;
		font-family: Roboto;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.event-detail-members__rating-button
	{
		display: flex;
		padding: 10px 24px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		background: #FF9F0A;
		border: none;
		transition: background-color 0.3s ease;
		width:96%;
		-webkit-tap-highlight-color:rgba(0,0,0,0);

		&:hover,&:active,&:focus{ background: #FF840A; }
	}

	.event-detail-members__rating-text
	{
		color: #FFF;
		font-family: Roboto;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.event-detail-members__passed
	{
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
</style>