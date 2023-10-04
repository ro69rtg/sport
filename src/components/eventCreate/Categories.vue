<template>
	<div class="event-create-categories__item" @click='toggleCategories'>
		<div class="event-create-categories__title">
			<IconCategories class="event-create-categories__icon"/>
			<h3 class="event-create-categories__title-text">Категория</h3>
		</div>
		<div
			class="event-create-categories__choice"
			:class="{'active' :categoriesChoice || category }"
		>
			<p v-if="!checkedValue" class="event-create-categories__choice-text">Не выбрана</p>
			<div
				class="event-create-categories__choice-icon"
				v-if="checkedValue && checkedValue.icon"
				v-html="checkedValue.icon"
			></div>
			<span v-if="checkedValue">{{ checkedValue.name }}</span>
			<IconChoiceArrow class="event-create-categories__choice-icon" />
		</div>
	</div>
	<div class="event-create-categories__box" v-if="visibleCategories">
		<div class="event-create-categories__line"></div>
		<div v-for="(item, index) in categories" :key="index">
			<label
				class="event-create-categories__label"
				:class="{'active': checkedValue && checkedValue.id === item.id }"
				@click="updatedChecked(item)"
			>
				<div class="event-create-categories__label-box">
					<div class="event-create-categories__label-box-icon" v-html="item.icon"></div>
					<span class="event-create-categories__label-box-text" >{{ item.name }}</span>
				</div>
				<div class="event-create-categories__input-mask">
					<IconCreateEventRadioBtn
						v-if="checkedValue && checkedValue.id === item.id"
						class="event-create-categories__icon-choice"
					/>
				</div>
			</label>
		</div>
	</div>
</template>

<script setup>
	import IconCreateEventRadioBtn from '@/components/icons/IconCreateEventRadioBtn.vue';
	import IconChoiceArrow from '@/components/icons/IconChoiceArrow.vue';
	import IconCategories from '@/components/icons/IconCategories.vue';
	import { useUserStore } from '@/stores/user.js';
	import { ref, computed } from 'vue';

	const visibleCategories = ref(false);
	const props = defineProps(['value','category']);
	const emits = defineEmits(['update']);
	const categoriesChoice = ref(false);
	const checkedValue = ref();
	const userStore = useUserStore();

	const categories = computed(() => userStore.getCategories);

	(async () =>
	{
		await userStore.fetchCategoris();
		if (categories.value && categories.value.length > 0)
			checkedValue.value = categories.value.filter(el => el.id === props.category)[0];
	})();

	const toggleCategories = () => visibleCategories.value = !visibleCategories.value;

	function updatedChecked(item)
	{
		checkedValue.value = item;
		if (checkedValue.value === item)
		{
			toggleCategories();
			categoriesChoice.value = true;
		}
		emits('update', checkedValue.value);
	}
</script>

<style lang="scss">
	.event-create-categories { font-family: 'Roboto'; }

	.event-create-categories__item
	{
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.25px;
		color: #1B1E22;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 38px;
		padding: 2px 16px 0 12px;
	}

	.event-create-categories__input-mask
	{
		background-color:#E5E5ED ;
		width: 15px;
		height: 15px;
		border-radius: 4px;

		&:hover,&:active{ cursor: pointer; }
	}

	.event-create-categories__icon-choice
	{
		width: 17px;
		height: 17px;
		top: -1px;
		left: -1px;
	}

	.event-create-categories__box
	{
		position: relative;
		background: #fff;
		width: 100% ;
		border-radius: 8px;
		margin-bottom: 12px;
		scrollbar-color: #239735;
	}

	.event-create-categories__label
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 36px;
		padding: 6px 15px 6px 15px;

		&.active
		{
			.event-create-categories__label-box-icon path
			{
				transition: 300ms ease-in all;
				fill:#239735;
			}

			.event-create-categories__label-box-text
			{
				transition: 300ms ease-in color;
				color: #239735;
			}
		}
	}

	.event-create-categories__box
	{
		scrollbar-color: #239735 #E5E5ED;
		position: relative;
		margin-bottom: 20px;
		background: #fff;
		width: 100%;
		height: auto;
		max-height: 240px;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-color: #239735;
		border-radius: 8px;
	}

	.event-create-categories__choice { margin-right: 4px; }

	.event-create-categories__icon-choice{ position: relative; }

	.event-create-categories__choice-icon
	{
		&:nth-child(1) { margin-right: 6px; }

		svg
		{
			width: 16px;
			height: 16px;
		}
	}

	.event-create-categories__choice-text
	{
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
		position: relative;
		left: -2px;
	}

	.event-create-categories__choice
	{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: #8E8E9A;
		width: 45%;
		margin-right: -2px;
		border-radius: 8px;

		&:hover,&:active{ cursor: pointer; }

		&.active
		{
			transition: 300ms ease-in color;
			color: #239735;
			font-weight: 500;

			.event-create-categories__choice-text { color: #239735;}

			.event-create-categories__choice-icon
			{
				width: 16px;
				height: 16px;

				path{ fill:#239735; }
			}
		}
	}

	.event-create-categories__label-box
	{
		display: flex;
		align-items: end;
		gap: 12px;

		svg
		{
			position: relative;
			top: 3px;
			left: 1px;
			fill: #B9B9CE;
		}
	}

	.event-create-categories__choice img {width: 16px; height: 16px; }

	.event-create-categories__label-box-icon
	{
		width: 24px;
		height: 24px;

		& svg
		{
			fill:#B9B9CE;
			max-width: 24px;
			min-width: 24px;
			min-height: 24px;
			max-height: 24px;
		}
	}

	.event-create-categories__title
	{
		display: flex;
		align-items: center;
	}

	.event-create-categories__icon { margin-right: 12px; }

	.event-create-categories__title-text
	{
		color: #1B1E22;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}
</style>