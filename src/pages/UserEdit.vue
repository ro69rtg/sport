<template>
	<div class="user-edit" v-if="currentUser">
		<div class="container-fluid">
			<div class="user-edit__header">
				<button @click="router.push('/profile/1')" class="user-edit__back-button">
					<IconArrowBack />
				</button>
				<span class="profile__label"> Мои данные </span>
			</div>
			<div class="user-edit__form">
				<form @submit.prevent="onSubmit">
					<div>
						<div class="user-edit__avatar" >
							<label>
								<div class="user-info__avatar-empty" v-if="!currentUser.avatar && !uploadFileData">
									{{ shortName }}
								</div>
								<img :src="userAvatar" alt="" v-else>
								<input type="file" @change="previewImage" >
								<span class="user-edit__upload-button"> Выбрать фотографию </span>
							</label>
						</div>
						<div class="user-edit__personal">
							<div class="personal-info">
								<CustomInput
									:error="errors.name"
									v-model="user.name"
									placeholder="Имя" icon="close"
									class="personal-name" />
								<hr class="user-edit__personal-delimetr" />
								<CustomInput :error="errors.lastname" v-model="user.lastname" placeholder="Фамилия" class="personal-lastname" />
							</div>
							<div class="user-edit__email">
								<CustomInput :error="errors.email" v-model="user.email" placeholder="Email" class="personal-email" />
							</div>
							<div class="user-edit__phone">
								<PhoneInput  :error="errors.phone" v-model="user.phone" class="personal-phone" mask="+# (###) ###-##-##"/>
							</div>
						</div>
					</div>
					<CustomButton text="Сохранить" type="submit" class="user-edit__form-save"/>
				</form>
			</div>
		</div>
	</div>
</template>
<script setup>
	import IconArrowBack from '@/components/icons/IconArrowBack.vue'
	import CustomInput from '@/ui/CustomInput.vue'
	import CustomButton from '@/ui/CustomButton.vue'
	import PhoneInput from '@/ui/PhoneInput.vue'

	import { useRouter } from 'vue-router'
	import { computed, ref } from 'vue';
	import { useUserStore } from '@/stores/user';
	import { useNavBarStore } from '@/stores/navBar';

	import api from '@/api/api.client'
	const router = useRouter();
	const user = ref();
	const userStore = useUserStore();
	const navBarStore = useNavBarStore();
	navBarStore.isShow = null;
	const errors = ref({
		name: [],
		lastname: [],
		email: []
	});

	const uploadFileData = ref();
	const uploadRemoteFile = ref();
	const currentUser = computed(() =>
	{
		return userStore.currentUser;
	})
	user.value = currentUser.value;

	const userAvatar = computed(() =>
	{
		if(uploadFileData.value)
			return uploadFileData.value;
		else if(currentUser.value.avatar)
			return 'https://sport-up.odva.fun'+currentUser.value.avatar
	})


	const shortName = computed(() =>
	{
		if(currentUser.value.name)
			return (currentUser.value.name).slice(0,1).toUpperCase();
	})
	function previewImage(event)
	{
		const input = event.target;
		if (input.files) {
			var reader = new FileReader();

			reader.addEventListener("load", () =>{
					uploadFileData.value = reader.result;
				},
				false,
			);
			reader.readAsDataURL(input.files[0]);
		}
		uploadFile(input.files[0])
	}
	function uploadFile(data)
	{
		const formData = new FormData();
		formData.append('files[]', data)
		uploadFileData.value = JSON.stringify(data)
		api.general.upload(formData).then((data) =>
		{
			uploadRemoteFile.value = data.data.data;
		});
	}
	function onSubmit()
	{
		checkForm()

		for(let key in errors.value)
		{
			if(errors.value[key].length)
				return;
		}
		const uploadData = { ...user.value, }

		if(uploadRemoteFile.value)
			uploadData.avatar = JSON.stringify(uploadRemoteFile.value);
		else
			delete uploadData.avatar

		userStore.updateUser(uploadData).then(() =>
		{
			router.push(`/profile/${user.value.id}`)
		});
	}

	function checkForm()
	{
		errors.value = { name: [], lastname: [], email: [] };

		if(!user.value.name)
			errors.value.name.push('Укажите имя');
		if(!user.value.lastname)
			errors.value.lastname.push('Укажите фамилию');
		if(!user.value.email)
			errors.value.email.push('Укажите почту');
		else if(!validEmail(user.value.email))
			errors.value.email.push('Укажите корректный адрес электронной почты.');
	}

	function validEmail(email)
	{
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
</script>

<style lang="scss">
	.user-edit
	{
		.user-edit__header
		{
			padding-bottom: $headerOffset;
			display: flex;
			align-items: center;
			margin-top: 10px;
			justify-content: center;
			.profile__label
			{
				font-family: 'Roboto';
				line-height: 24px;
				font-size: 16px;
				color: $primary;
				font-weight: 500;
			}
		}
		.user-edit__form
		{
			form
			{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.user-edit__form-save
			{
				margin-top: 60px;
			}
			.personal-info
			{
				position: relative;
				.personal-name
				{
					border-radius: 8px 8px 0 0;
					.custom-input__input::after
					{
						content: "";
						display: block;
						position: absolute;
						height: 1px;
						width: 96%;
						background: #f0f0f0;
						bottom: -30px;
						right: 0;
					}
				}
				.personal-lastname
				{
					border-radius: 0 0 8px 8px;
				}
				margin-bottom: 12px;
			}
			.user-edit__email
			{
				margin-bottom: 12px;
			}
		}
		.user-edit__back-button
		{
			position: absolute;
			border: none;
			left: 12px;
		}
		.user-edit__avatar
		{
			display: flex;
			justify-content: center;
			align-items: center;
			label
			{
				display: flex;
				cursor: pointer;
				flex-direction: column;
				align-items: center;
			}
			flex-direction: column;
			img,.user-info__avatar-empty
			{
				height: 68px;
				border-radius: 50%;
				width: 68px;
				object-fit: cover;
			}
			.user-info__avatar-empty
			{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #fff;
			}
			input
			{
				display: none;
			}
			.user-edit__upload-button
			{
				font-size: 12px;
				font-family: 'Roboto';
				color: $button;
				margin: 12px 0;
				display: block;
			}
		}
		.user-edit__personal-delimetr
		{
			position: absolute;
			width: calc(100% - 15px);
			height: 1px;
			z-index: 2;
			left: 15px;
			margin: 0;
			border: none;
			background: rgba(229, 229, 237, 0.5);
		}
	}
</style>