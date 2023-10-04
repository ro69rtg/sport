<template>
	<div class="nav-bar">
		<ul class="nav-bar__list">
			<li class="nav-bar__item" :class="{'active': router.name === 'events'}">
				<router-link class="nav-bar__item-link" to="/events">
					<IconNavBarEvents class="nav-bar__item-icon"/>
					<span class="nav-bar__item-name">
						Список игр
					</span>
				</router-link>
			</li>
			<li class="nav-bar__item nav-bar__create-event" :class="{'active': router.name === 'event-create'}">
				<router-link class="nav-bar__item-link" to="/event-create">
					<IconNavBarCreateEvent class="nav-bar__item-icon" name="CreateGameIcon" size="28" />
					<span class="nav-bar__item-name">
						Создать игру
					</span>
				</router-link>
			</li>
			<li class="nav-bar__item" :class="{'active': router.name === 'profile'}">
				<router-link class="nav-bar__item-link" to="/profile/1">
					<IconNavBarUser class="nav-bar__item-icon" />
					<span class="nav-bar__item-name">
						Профиль
					</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { useRoute } from 'vue-router';
	import IconNavBarEvents from '@/components/icons/IconNavBarEvents.vue';
	import IconNavBarCreateEvent from '@/components/icons/IconNavBarCreateEvent.vue'
	import IconNavBarUser from '@/components/icons/IconNavBarUser.vue'

	const router = useRoute();
</script>

<style lang="scss">
	.nav-bar
	{
		background: #fff;
		position: fixed;
		bottom: 0;
		z-index: 4;
		box-shadow: 0px -4px 20px 0px rgba(0, 0, 0, 0.10);
		width: 100%;
		font-family: 'Roboto';
	}

	.nav-bar__list
	{
		list-style-type: none;
		display: flex;
		align-items: center;
		padding: 10px 30px 20px 30px;
		justify-content: space-between;
		margin: 0;
	}

	.nav-bar__item.active
	{
		.nav-bar__item-link { color: #239735; }

		.nav-bar__item-icon path { fill: #239735; }
	}

	.nav-bar__item-name { margin-top: 10px; }

	.nav-bar__item-link
	{
		display: flex;
		text-decoration: none;
		color: $primary;
		cursor: pointer;
		align-items: center;
		flex-direction: column;
		font-size: 10px;
		font-style: normal;
		font-weight: 400;
		letter-spacing: 0.4px;

		.nav-bar__item-icon path { fill: #B9B9CE; }
	}
</style>