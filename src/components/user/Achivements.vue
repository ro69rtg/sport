<template>
	<div class="user-achivements">
		<div class="user-achivements__block">
			<span class="user-achivement__label"> Мой рейтинг </span>
			<div class="user-achivement__value"> 4.8 </div>
		</div>
		<div class="user-achivements__block">
			<span class="user-achivement__label"> Событий создано </span>
			<div class="user-achivement__value"> 4 </div>
		</div>
		<div class="user-achivements__block">
			<span class="user-achivement__label"> Принято участия </span>
			<div class="user-achivement__value"> 256 </div>
		</div>
		<div class="user-achivements__block">
			<span class="user-achivement__label"> Лучший игрок </span>
			<div class="user-achivement__value"> 56 </div>
		</div>
	</div>
</template>

<style lang="scss">
	.user-achivements
	{
		display: flex;
		justify-content: center;
		margin-top: 12px;
		gap: 5px;
	}

	.user-achivements__block
	{
		border-radius: 8px;
		width: 100%;
		background: $primary-background;
		padding: 10px;
		font-family: 'Roboto';
	}

	.user-achivement__label
	{
		font-size: 10px;
		color: $secondary-text;
		max-width: 70%;
		display: block;
	}

	.user-achivement__value
	{
		margin-top: 5px;
		color: $primary-text;;
		font-size: 24px;
	}
</style>