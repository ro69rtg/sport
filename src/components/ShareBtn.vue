<template>
	<div class="share-btn">
		<div class="share-btn__img">
			<ShareSvg />
		</div>
		<div
			:id="id"
			class="share-btn__action"
			data-curtain
			data-shape="round"
			data-limit="0"
			data-more-button-type="short"
			data-services="telegram,whatsapp,vkontakte,viber"
		/>
	</div>
</template>

<script setup>
import ShareSvg from '@/components/icons/ShareIcon.vue';

defineProps({
	id:
	{
		type: String,
		default: 'share-btn'
	}
});
</script>

<style lang="scss">
	.share-btn
	{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 7px;
		max-height: 30px;
		cursor: pointer;
		position: relative;
		margin-left: auto;
		margin-right: -5px;
	}

	.share-btn__img
	{
		border-radius: 7px;
		background: none;
		display: flex;
		justify-content: center;
		align-items: center;

		& svg
		{
			min-width: 26px;
			min-height: 30px;
			max-width: 24px;
			position: relative;
			left: 1px;
		}
	}

	.share-btn__text { display: none; }

	.share-btn__action
	{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		.ya-share2__list, .ya-share2__item { display: block !important; }
		.ya-share2__link
		{
			opacity: 0 !important;
		}

		.ya-share2__popup .ya-share2__link
		{
			opacity: 1 !important;
			&:hover { opacity: 0.85 !important; }
		}

		.ya-share2__container_mobile
		{
			.ya-share2__popup
			{
				.ya-share2__item { display: inline-block !important; }
			}
		}

		.ya-share2__container_size_m
		.ya-share2__item_more.ya-share2__item_has-pretty-view
		.ya-share2__link_more.ya-share2__link_more-button-type_short
		{
			padding: 0;
		}

		.ya-share2__popup.ya-share2__popup_mobile.ya-share2__popup_visible .ya-share2__popup-content
		{
			bottom: 0;
			.ya-share2__mobile-popup-copy-link { display: flex; }
		}
	}

</style>