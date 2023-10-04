import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useNavBarStore = defineStore('navBarStore',{
	state: () => ({
		isShow: null,
	}),
	getters:
	{
		isNavBarShow()
		{
			return this.isShow;
		},
	},
});