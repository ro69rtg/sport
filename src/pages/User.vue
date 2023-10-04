<template>
	<div class="pages-user" v-if="currentUser">
		<div class="container-fluid">
			<div class="pages-user__header">
				<span class="pages-user__label"> Профиль </span>
				<ShareBtn @click="share" />
			</div>
			<div class="pages-user__block">
				<Info />
				<Achivements />
			</div>

			<div class="pages-user__block pages-user__block--events">
				<Events />
			</div>

			<div class="pages-user__block">
				<Payment />
			</div>

			<div class="pages-user__block pages-user__block--about">
				<div class="pages-user__about" @click="router.push('/about')">
					<div class="pages-user__about-row">
						<IconProfileAboutService />
						<span class="pages-user__about-row-title">О сервисе</span>
					</div>
					<div class="pages-user__about-row-link">
						<IconArrowRight />
					</div>
				</div>
			</div>

			<button @click="logout" class="pages-user__btn">Выйти</button>
		</div>
	</div>
</template>

<script setup>
	import CustomButton from '@/ui/CustomButton.vue'
	import Info from '@/components/user/Info.vue'
	import Achivements from '@/components/user/Achivements.vue'
	import Events from '@/components/user/Events.vue';
	import Payment from '@/components/user/Payment.vue'
	import { useUserStore } from '@/stores/user'
	import { computed , onMounted } from 'vue'
	import { useRouter } from 'vue-router';
	import { useNavBarStore } from '@/stores/navBar';
	import ShareBtn from '@/components/ShareBtn.vue';
	import IconArrowRight from '@/components/icons/IconArrowRight.vue'
	import IconProfileAboutService from '@/components/icons/IconProfileAboutService.vue'

	const router = useRouter();
	const userStore = useUserStore();
	const navBarStore = useNavBarStore();

	navBarStore.isShow = true;

	const currentUser = computed(() =>
	{
		return userStore.currentUser
	});

	function logout()
	{
		userStore.logout().then(() =>
		{
			router.push('/login')
		});
	}

	const shareIsSupported = ('share' in navigator);

	const loadYandexShare = () =>
	{
		if (window?.Ya?.share2)
			setupShare();
		else
		{
			const script = document.createElement('script');

			script.setAttribute('src', 'https://yastatic.net/share2/share.js');
			script.addEventListener('load', () => setupShare());
			document.head.appendChild(script);
		}
	};

	const setupShare = () =>
	{
		window.Ya.share2('share-btn',
		{
			content: {
				url: window.location.href,
				title: 'Профиль',
				description: 'Профиль',
			}
		});
	};

	const share = function() {
		if (shareIsSupported) {
			const shareData =
			{
				title: `${game.value.name}`,
				text: `${game.value.name}`,
				url: window.location.href
			};

			navigator.share(shareData).catch(error =>
			{
				console.error('Error sharing:', error);
			});
		}
		else
			setupShare();
	};

	onMounted(() =>
	{
		if(!shareIsSupported)
			loadYandexShare()
	});
</script>

<style lang="scss">
	.pages-user__header__back
	{
		position: absolute;
		left: 12px;
	}

	.pages-user__header
	{
		display: flex;
		align-items: center;
		margin-top: 10px;
		justify-content: center;
		justify-content: space-between;
		padding-bottom: $headerOffset;
	}

	.pages-user__about
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}

	.pages-user__about-row-title
	{
		font-size: 16px;
		color: $primary-text;
		font-weight: 500;
		margin-left: 15px;
	}

	.pages-user__about-row
	{
		display: flex;
		align-items: center;
	}

	.pages-user__about-row-link { margin-right: 12px; }

	.pages-user__label
	{
		color: #1B1E22;
		font-family: Roboto;
		font-size: 22px;
		font-weight: 500;
	}

	.pages-user__block
	{
		margin-bottom: 12px;
		border-radius: 8px;
		padding: 16px 12px;
		background: #fff;
		overflow: hidden;

		&--events{ padding: 16px 0 }

		&--about { padding: 12px 0 12px 12px; }
	}

	.pages-user__btn
	{
		background: $button;
		width: 100%;
		display: flex;
		padding: 10px 24px;
		align-items: center;
		justify-content: center;
		color: #fff;
		border-radius: 8px;
		border: none;
		font-family: 'Roboto';
		font-size: 16px;
		height: 44px;
		font-weight: 500;
		box-sizing: border-box;

		&:disabled, &[disabled]
		{
			pointer-events: none;
			opacity: 0.4;
		}
	}
</style>