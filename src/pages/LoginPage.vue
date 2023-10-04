<template>
	<div class="login-page">
		<Phone
			:phoneParent="phone"
			v-if="stage === 1"
			@updateBackStage="updateChangeBack(null)"
			@update="phoneUpdated"
			:changeBack="changeBack"
		/>
		<Code
			v-if="stage === 2"
			@clear="clearValues"
			@update="codeUpdated"
			@changeBack="updateChangeBack(true)"
			:phone="phone"
			:currentCountry="currentCountry"
		/>
		<Name v-if="stage === 3" @update="nameUpdated" />
		<Email v-if="stage === 4" @update="emailUpdated" :name="name" />
		<End v-if="stage === 5" @update="completeRegister" />
	</div>
</template>

<script setup>
	import Phone from '@/components/auth/Phone.vue';
	import Code from '@/components/auth/Code.vue';
	import Name from '@/components/auth/Name.vue';
	import Email from '@/components/auth/Email.vue';
	import End from '@/components/auth/End.vue';
	import { ref } from 'vue';
	import api from '@/api/api.client.js'
	import { useRouter } from 'vue-router';

	const stage = ref(1);
	const name = ref(null);
	const phone = ref(null);
	const email = ref();
	const currentCountry = ref("+7");
	const router = useRouter();
	const changeBack = ref(null)
	function clearValues(value)
	{
		stage.value = value;
		name.value = null;
		phone.value = null;
		currentCountry.value = null;
	}

	function completeRegister()
	{
		api.user.completeRegister({name: name.value, email: email.value}).then(() => {
			router.push('/profile/1')
		});
	}

	function phoneUpdated(value,remotePhone)
	{
		stage.value = value;
		phone.value = remotePhone.phone;
		currentCountry.value = remotePhone.currentCountry;
	}
	function updateChangeBack(value)
	{
		changeBack.value = value;
		if(value)
			stage.value = 1;
	}
	function codeUpdated(value)
	{
		stage.value = value;
	}

	function nameUpdated(value, remoteName)
	{
		stage.value = value;
		name.value = remoteName;
		localStorage.setItem('name', remoteName);
	}

	function emailUpdated(value, remoteEmail)
	{
		email.value = remoteEmail;
		stage.value = value;
	}
</script>

<style lang="scss">
	.login-page
	{
		padding: 65px 32px 0 32px;
		font-family: "Roboto";
		height: calc(100svh - 105px);
	}
</style>
