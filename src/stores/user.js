import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { loginGetCode } from '@/api/user.api.js';
import { loginCheckCode } from '@/api/user.api.js';
import api from '@/api/api.client';

export const useUserStore = defineStore('userStore',{
	state: () => ({
		hasErrorCode: false,
		user: null,
		isAuth: false,
		categories: [],
	}),
	getters:
	{
		currentUser()
		{
			return this.user;
		},
		isUserAuth()
		{
			return this.isAuth;
		},
		getCategories()
		{
			return this.categories;
		}
	},
	actions:
	{
		async createGame(gameData)
		{
			const response = await api.user.createGame(gameData);
		},
		async setUser(user)
		{
			this.user = user;
			this.isAuth = true;
		},
		async fetchCurrentUser()
		{
			const response = await api.user.me();
			this.setUser(response.data.data);
		},
		async fetchCategoris()
		{
			const response = await api.user.gettingСategories();
			this.categories = response.data.data;
		},
		async updateUser(payload)
		{
			const response = await api.user.updateUser(payload);
			this.setUser(response.data.data);
		},
		async logout()
		{
			this.isAuth = false;
			$cookies.remove('token');
		},
		async getCode(phone, code)
		{
			try
			{
				const response = await loginGetCode(phone);
				if (response.status !== 200)
				{
					throw new Error("Ошибка при получении кода");
				}
			}
			catch (error)
			{
				throw error;
			}
		}
		,
		async checkCode(phone, code)
		{
			const response = await loginCheckCode(phone, code).catch(function(error)
			{
				console.log(error);
				throw error;
			});
			$cookies.set('token', response.data.data.token);
			if (response.data.success)
			{
				if(response.data.data.completed === true)
				{
					this.fetchCurrentUser();
					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				const error = response.data.errors ? response.data.errors.error : "Неизвестная ошибка";
				console.error("Ошибка входа:", error);
			}
		},
		clear()
		{
			this.hasErrorCode = false;
			this.phone = '';
			this.code = '';
		},
	},
});
