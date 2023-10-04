<template>
	<div class="event-detail-notification">
		<div class="event-detail-notification__block">
			<IconEventDetailNotification class="event-detail-notification__icon"/>
			<span class="event-detail-notification__title">
				Уведомления в ваш чат
			</span>
		</div>
		<p class="event-detail-notification__description">
			Есть над чем задуматься: стремящиеся вытеснить традиционное производство, нанотехнологии неоднозначны и будут заблокированы в рамка.
		</p>
		<div class="event-detail-notification__buttons">
			<div
				class="event-detail-notification__button event-detail-notification__button--telegram"
				:class="{'active': activeTab === 'telegram'}"
				@click="activeTab = 'telegram'">
				<IconEventDetailTelegram />
				<span>Telegram</span>
			</div>
			<div
				class="event-detail-notification__button event-detail-notification__button--whatsapp"
				:class="{'active': activeTab === 'whatsapp'}"
				@click="activeTab = 'whatsapp'">
				<IconEventDetailWhatsApp />
				<span>WhatsApp</span>
			</div>
		</div>
		<div class="event-detail-notification__boards">
			<div class="event-detail-notification__boards-telegram" v-if="activeTab === 'telegram'">

			</div>
			<div class="event-detail-notification__boards-whatsapp" v-if="activeTab === 'whatsapp'">
				<div class="event-detail-notification__whatsapp-connect">
					<div class="event-detail-notification__row">
						<IconEventDetailWhatsAppBig />
						<div class="event-detail-notification__block">
							<span class="event-detail-notification__whatsapp-connect-status">
								не подключен
							</span>
							<span class="event-detail-notification__whatsapp-connect-name">
								WhatsApp Bot
							</span>
						</div>
					</div>
					<div class="event-detail-notification__whatsapp-connect-button">
						Открыть WhatsApp
					</div>
				</div>
				<div class="event-detail-notification__whatsapp-content">
					<div class="event-detail-notification__whatsapp-content-item event-detail-notification__whatsapp-content-item-top">
						<div class="event-detail-notification__enum-number">
							1
						</div>
						<div>
						<span>
							Добавьте в контакты номер
						</span>
						<span class="event-detail-notification__whatsapp-number">
							<span class="event-detail-notification__whatsapp-number__value" ref="whatsappNumber">8 (495) 992-55-55</span>
							<div class="event-detail-notification__whatsapp-number-copy" @click="copyOnClick('whatsappNumber')">
								<IconEventDetailCopy />
							</div>
						</span>
						</div>
					</div>
					<hr>
					<div class="event-detail-notification__whatsapp-content-item">
						<div class="event-detail-notification__enum-number">
							2
						</div>
						<span>
							Добавьте созданный контакт в группу WhatsApp
						</span>
					</div>
					<hr>
					<div class="event-detail-notification__whatsapp-content-item event-detail-notification__whatsapp-content-item-top">
						<div class="event-detail-notification__enum-number">
							3
						</div>
						<div>
							<span>
								Скопируйте текст ниже и отправьте его в группу
							</span>
							<span class="event-detail-notification__whatsapp-id">
								<span class="event-detail-notification__whatsapp-id__value" ref="whatsappId">
									@84959925555 id48399193993
								</span>
								<div class="event-detail-notification__whatsapp-number-copy" @click="copyOnClick('whatsappId')">
									<IconEventDetailCopy />
								</div>
							</span>
						</div>
					</div>
					<hr>
					<div class="event-detail-notification__whatsapp-content-tip">
						<!-- <Icon name="TipIcon" size="20" /> -->
						<IconEventDetailExclamation />
						<span class="event-detail-notification__whatsapp-content-tip__text">
							Бот будет присылать уведомления о событии пока оно не закончится либо пока вы не остановите его, нажав на кнопку «Отключить Bot».
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import LabelItem from '@/components/eventDetail/Label.vue';
	import IconEventDetailNotification from '@/components/icons/IconEventDetailNotification.vue';
	import IconEventDetailWhatsApp from '@/components/icons/IconEventDetailWhatsApp.vue';
	import IconEventDetailTelegram from '@/components/icons/IconEventDetailTelegram.vue';
	import IconEventDetailWhatsAppBig from '@/components/icons/IconEventDetailWhatsAppBig.vue';
	import IconEventDetailCopy from '@/components/icons/IconEventDetailCopy.vue';
	import IconEventDetailExclamation from '@/components/icons/IconEventDetailExclamation.vue';
	import { ref } from 'vue';
	const activeTab = ref();

	const whatsappNumber = ref();
	const whatsappId = ref();

	function copyOnClick(elName)
	{
		const storage = document.createElement('textarea');
		storage.value = this[elName].innerHTML;
		this[elName].appendChild(storage);
		storage.select();
		storage.setSelectionRange(0, 99999);
		document.execCommand('copy');
		this[elName].removeChild(storage);
	}
</script>
<style lang="scss">
	.event-detail-notification__description
	{
		padding-left: 38px;
		color: $secondary-text;
		font-family: 'Roboto';
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
	}

	.event-detail-notification__buttons
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 38px;
	}

	.event-detail-notification__button--telegram
	{
		margin-right: 5px;
	}
	.notification__telegram
	{
		margin-right: 5px;
	}

	.event-detail-notification__button
	{
		border-radius: 7px;
		display: flex;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		width: 100%;
		text-align: center;
		padding: 7px 0;
		background: $minor;
		span
		{
			font-family: 'Roboto';
			font-size: 14px;
			font-style: normal;
			margin-left: 5px;
			font-weight: 400;
			line-height: 18px; /* 128.571% */
			letter-spacing: 0.25px;
		}
		svg
		{
			fill: #8E8E9A;
		}
		&.active
		{
			background: $button;
			color: #fff;
			svg path
			{
				fill: #fff;
			}
		}
	}
	.event-detail-notification__boards
	{
		.event-detail-notification__boards-whatsapp
		{
			font-family: 'Roboto';
			.event-detail-notification__whatsapp-connect
			{
				background: $primary-background;
				padding: 10px;

				margin: 16px 0 16px 38px;
				border-radius: 8px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.event-detail-notification__row
				{
					display: flex;
					align-items: center;
				}
				.event-detail-notification__whatsapp-connect-status
				{
					color: #fff;
					border-radius: 3px;
					padding: 1px 3px;
					font-family: 'Roboto';
					background: $secondary-text;
					font-size: 8px;
					text-align: center;
					font-weight: 500;
					line-height: 16px; /* 200% */
					letter-spacing: 0.5px;
				}
				.event-detail-notification__whatsapp-connect-name
				{
					display: block;
					font-size: 14px;
					font-style: normal;
					font-weight: 500;
					line-height: 18px; /* 128.571% */
					letter-spacing: 0.25px;
				}
				.event-detail-notification__whatsapp-connect-button
				{
					border-radius: 6px;
					padding: 5px;
					background: $button;
					font-size: 12px;
					font-style: normal;
					font-weight: 500;
					line-height: 120%; /* 14.4px */
					letter-spacing: 0.1px;
					color: #fff;
				}
			}
			.event-detail-notification__whatsapp-content
			{
				padding-left: 38px;
				hr
				{
					height: 1px;
					border: none;
					background: rgba(229, 229, 237, 0.5);
				}
				.event-detail-notification__whatsapp-content-item
				{
					display: flex;
					align-items: center;
					margin-top: 25px;
					span
					{
						display: block;
						font-size: 14px;
						font-style: normal;
						font-weight: 400;
						color: $primary;
						line-height: 18px; /* 128.571% */
						letter-spacing: 0.25px;
					}
					.event-detail-notification__whatsapp-number, .event-detail-notification__whatsapp-id
					{
						display: flex;
						align-items: center;
						margin-top: 15px;
						span
						{
							font-size: 16px;
							font-style: normal;
							font-weight: 500;
							line-height: 24px; /* 150% */
							letter-spacing: 0.5px;
						}
						&-copy
						{
							margin-left: 7px;
							display: flex;
						}
					}
					.event-detail-notification__whatsapp-id
					{
						span
						{
							font-size: 14px;
							line-height: 18px; /* 128.571% */
							letter-spacing: 0.25px;
						}
					}
				}
				.event-detail-notification__whatsapp-content-item-top
				{
					align-items: flex-start;
				}
				.event-detail-notification__whatsapp-content-tip
				{
					display: flex;
					align-items: flex-start;
					margin-top: 16px;
					svg
					{
						flex: 0 0 auto  ;
					}
					.event-detail-notification__whatsapp-content-tip__text
					{
						font-family: 'Roboto';
						font-size: 12px;
						margin-left: 10px;
						color: $secondary-text;
						font-style: normal;
						font-weight: 400;
						line-height: 120%; /* 14.4px */
						letter-spacing: 0.1px;
					}
				}
			}
		}
		.event-detail-notification__block
		{
			margin-left: 10px;
		}
	}
	.event-detail-notification__enum-number
	{
		padding: 4px;
		border-radius: 100%;
		flex: 0 0 auto;
		border: 2px solid #32D74B;
		font-weight: 500;
		color: #32D74B;
		height: 24px;
		width: 24px;
		margin-right: 10px;
		font-size: 16px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
