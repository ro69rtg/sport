<template>
	<div class="rating-list">
		<div class="rating-list__my">
			<div class="rating-list__my-block">
				<div class="rating-list__my-block-item">
					<img class="rating-list__my-block-img" src="@/static/Avatar.png" alt="Avatar"/>
					<p class="rating-list__my-block-text">Моя оценка</p>
				</div>
				<div class="rating-list__my-block-item">
					<p class="rating-list__my-count">{{ meRating }}</p>
					<div class="rating-list__my-block-item">
						<label
							v-for="num in 5"
							class="rating-list__my-lable"
							:for="num"
							title="rating"
						>
							<IconRatingStar
								class="rating-list__my-stars"
								v-if = "meRating >= num"
							/>
							<IconRatingStarNone
								class="rating-list__my-stars-none"
								v-if = "meRating < num && meRating + 1 < num"
							/>
							<IconHalfStar
								class="half"
								v-if="(meRating < num && meRating + 1 > num) && num % 1 === 0"
							/>
							<input
								type="radio"
								:id="num"
								name="rating"
								:value="meRating"
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="rating-list__users">
			<div v-for="(user, index) in users" :key="user.id" class="rating-list__users-block">
				<div class="rating-list__users-block-item">
					<img class="rating-list__users-block-img" src="@/static/Avatar.png" alt="Avatar"/>
					<p class="rating-list__users-block-text">{{ user.name }}</p>
				</div>
				<div class="rating-list__users-block-item">
					<label
						v-for="star in 5"
						class="rating-list__users-lable"
						:for="'user-star-' + star + '-' + index"
						title="rating"
					>
						<IconRatingStar
							class="rating-list__users-stars"
							v-if="user.rating >= star"
						/>
						<IconRatingStarNone
							class="rating-list__users-stars-none"
							v-else
						/>
						<IconHalfStar
							class="half"
							v-if="(user.rating >= star - 0.5) && (user.rating < star)"
						/>
						<input
							type="radio"
							:id="'user-star-' + star + '-' + index"
							:name="'user-rating-' + index"
							:value="star"
							v-model="user.rating"
							@change="updatedChecked(user.rating)"
						/>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import IconRatingStar from '@/components/icons/IconRatingStar.vue';
	import IconHalfStar from '@/components/icons/IconHalfStar.vue';
	import IconRatingStarNone from '@/components/icons/IconRatingStarNone.vue';

	import { ref } from 'vue';
	const props = defineProps(['users','count','me']);

	const meRating = ref(props.me.rating)
	const emits = defineEmits(['update'])
	const rating = ref(0);

	const test = (value) => {
		rating.value = value.target.value
		updatedChecked()
	}

	const updatedChecked = (value) => {
		emits('update', rating.value)
	}
</script>

<style lang="scss">

	.rating-list__my-lable,.rating-list__users-lable
	{
		input { display: none; }
	}

	.rating-list__my-lable,.rating-list__my-stars
	{
		width: 16px;
		height: 16px;
	}

	.rating-list__users-lable,.rating-list__users-stars
	{
		width: 20px;
		height: 20px;
	}

	.rating-list__users-lable { padding-left: 9px; }

	.rating-list__users-block
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $white;
		border-radius: 8px;
		padding: 8px 12px;
		margin-bottom: 10px;
		height: 32px;
	}

	.rating-list__users-block-text
	{
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0.25px;
	}

	.rating-list__my-block-text
	{
		color: #1B1E22;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
		margin: 0;
	}

	.rating-list__users-block-item
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}

	.rating-list__my-block-img,.rating-list__users-block-img
	{
		width: 32px;
		height: 32px;
		margin-right: 12px;
	}

	.rating-list__my-block
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $minor;
		border-radius: 8px;
		padding: 8px 12px;
		margin-bottom: 20px;
	}

	.rating-list__my-block-item
	{
		display: flex;
		align-items: center;
	}

	.rating-list__my-count
	{
		color: #FF9F0A;
		margin: 0;
		margin-right: 8px;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		letter-spacing: 0.5px;
	}

	.rating-list__my-stars-none
	{
		width: 16px;
		height: 16px;
		path{ fill: #cdcdd2;}
	}
</style>