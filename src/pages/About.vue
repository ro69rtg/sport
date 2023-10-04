<template>
	<div class="pages-about">
		<div class="pages-about__header">
			<button @click="router.back" class="pages-about__header-back">
				<IconArrowBack />
			</button>
			<span class="pages-about__label"> О сервисе </span>
		</div>

		<div class="pages-about__block">
			<div class="pages-about__title">ООО «Ромашка»</div>
			<div class="pages-about__info">
				<div class="pages-about__info-block">
					<p class="pages-about__info-block-title">ИНН</p>
					<p class="pages-about__info-block-text">6318226667</p>
				</div>
				<div class="pages-about__info-block">
					<p class="pages-about__info-block-title">ОГРН</p>
					<p class="pages-about__info-block-text">1126318007188</p>
				</div>
				<div class="pages-about__info-block">
					<p class="pages-about__info-block-title">Телефон</p>
					<p class="pages-about__info-block-text">8 800 888 00 00</p>
				</div>
				<div class="pages-about__info-block">
					<p class="pages-about__info-block-title">Email</p>
					<p class="pages-about__info-block-text">romashka@mail.com</p>
				</div>
			</div>
		</div>

		<div class="pages-about__block">
			<div class="pages-about__offer">
				<div class="pages-about__offer-title">Оферта и политика конфиденциальности</div>

				<div class="pages-about__offer-description">
					Настоящий документ – это публичная оферта (предложение) интернет-магазина
					 укажите домен магазина или его название о продаже товаров.
				</div>
				<ul class="pages-about__offer-list">
					<li class="pages-about__offer-item">1. Общие положения</li>
				</ul>
				<ul class="pages-about__offer-list">
					<li class="pages-about__offer-item">
						1.1 Настоящая публичная оферта (далее - Оферта) является официальным предложением укажите
						 название юр.лица или ИП в адрес любого физического лица заключить с укажите название юр.лица
						  или ИП договор розничной купли-продажи товара на Сайте дистанционным образом на условиях,
						   определенных в настоящем Договоре и содержит все существенные условия Оферты.
					</li>
				</ul>
				<ul class="pages-about__offer-list">
					<li class="pages-about__offer-item">
						1.2 Заказ Покупателем товара, размещенного на Сайте, означает, что Покупатель согласен со всеми
						 условиями настоящей Оферты, Политики конфиденциальности и Пользовательского соглашения.
					</li>
					<li class="pages-about__offer-item">1.3 Сайт имеет право вносить изменения в Оферту без уведомления
					 Покупателя.</li>
					<li class="pages-about__offer-item">
						1.4. Срок действия Оферты не ограничен, если иное не указано на Сайте.
					</li>
					<li class="pages-about__offer-item">
						1.5. Сайт предоставляет Покупателю полную и достоверную информацию о товаре/услугах, включая
							информацию об основных потребительских свойствах товара, месте изготов тест тест тест
					</li>
				</ul>
				<ul v-if="isOpen" class="pages-about__offer-list">
					<li class="pages-about__offer-item">
						1.6 Заказ Покупателем товара, размещенного на Сайте, означает, что Покупатель согласен со всеми
						 условиями настоящей Оферты, Политики конфиденциальности и Пользовательского соглашения.
					</li>
					<li class="pages-about__offer-item">1.3 Сайт имеет право вносить изменения в Оферту без уведомления
					 Покупателя.</li>
					<li class="pages-about__offer-item">
						1.7. Срок действия Оферты не ограничен, если иное не указано на Сайте.
					</li>
				</ul>
			</div>

			<div class="pages-about__open">
				<button v-if="!isOpen" @click="isOpen = !isOpen" class="pages-about__open-btn">
					<span class="pages-about__open-btn-text">Показать всё</span>
					<IconOpen />
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import IconArrowBack from '@/components/icons/IconArrowBack.vue'
	import IconOpen from '@/components/icons/IconAboutOpenArrow.vue'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const isOpen = ref(false);
</script>

<style lang="scss">
	.pages-about
	{
		font-family: Roboto;
		padding-top: 10px;
	}

	.pages-about__header { padding-bottom: $headerOffset; }

	.pages-about__header
	{
		display: flex;
		align-items: center;
		margin-top: 10px;
		justify-content: center;
	}

	.pages-about__label
	{
		line-height: 24px;
		font-size: 16px;
		color: $primary;
		font-weight: 500;
	}

	.pages-about__header-back
	{
		position: absolute;
		left: 12px;
		border: none;
	}

	.pages-about__block
	{
		padding:0 12px;

		&:nth-child(2)
		{
			border-bottom:1px solid #E5E5ED;
			margin-bottom: 32px;
		}
	}

	.pages-about__title
	{
		color: #1B1E22;
		font-size: 32px;
		font-weight: 500;
		line-height: 40px;
		margin-bottom: 24px;
	}

	.pages-about__info
	{
		display: flex;
		flex-wrap: wrap;
	}

	.pages-about__info-block
	{
		width: 49%;
		margin-bottom: 19px;
	}

	.pages-about__info-block-title,.pages-about__info-block-text
	{
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.1px;
		margin: 0;
	}

	.pages-about__info-block-title
	{
		color: #8E8E9A;
		margin-bottom: 7px;
	}

	.pages-about__info-block-text
	{
		color: #1B1E22;
		font-size: 16px;
		letter-spacing: 0.5px;
	}

	.pages-about__offer-list
	{
		padding: 0;
		margin: 14px 0;
		&:last-child .pages-about__offer-item
		{
			&:last-child
			{
				margin: 0;
				-webkit-line-clamp: 3;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
		}
	}

	.pages-about__offer-title
	{
		color: #1B1E22;
		font-size: 22px;
		font-weight: 500;
		display: block;
		margin-bottom: 24px;
	}

	.pages-about__offer-description
	{
		color: #8E8E9A;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.1px;
	}

	.pages-about__offer-item
	{
		color: #8E8E9A;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.1px;
		list-style-type: none;
	}

	.pages-about__open-btn
	{
		color: #239735;
		text-align: center;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.1px;
		display: flex;
		align-items: center;
		gap: 0 5px;
		margin: 0 auto;
		margin-bottom: 12px;
		position: relative;
		top: 2px;
		border: none;
	}
</style>