<template>
	<div class="search">
		<div class="search__left">
			<IconInputSearch class="search__left-icon" />
			<input
				placeholder="Поиск"
				type="text"
				class="search__left-input"
				:value="searchValue"
				@input="onInput"
			>
		</div>
		<div v-if="searchValue" class="search__right">
			<button @click="clearInput" class="search__right-btn">Отменить</button>
		</div>
	</div>
</template>

<script setup>
	import IconInputSearch from '@/components/icons/IconInputSearch.vue';
	import debounce from "lodash.debounce";

	const onInput = debounce((item) =>{emitSearchValue(item)}, 500)

	const { searchValue } = defineProps(['searchValue']);
	const emit = defineEmits();

	const emitSearchValue = (event) =>
	{
		emit('update:searchValue', event.target.value);
	};

	function clearInput ()
	{
		emit('update:searchValue', '');
	}
</script>

<style lang="scss">
	.search { display: flex; }

	.search__left
	{
		padding: 8px 12px 8px 9px;
		align-items: center;
		border-radius: 12px;
		background: #fff;
		overflow: hidden;
		margin-bottom: 8px;
		gap: 3px;
		display: flex;
		width: 100%;
	}

	.search__left-icon { position: relative; }

	.search__left-input
	{
		width: 100%;
		border: none;
		overflow: hidden;
		color: #8E8E9A;
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
		outline: none;
		&::placeholder { position: relative;
		}
	}

	.search__right
	{
		margin-left: 12px;
		display: flex;
		margin-bottom: 8px;
		align-items: center;
	}
	.search__right-btn
	{
		border: none;
		color: #8E8E9A;
		font-size: 14px;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0.25px;
	}
</style>