import client from '@/plugins/axios.js';

const user =
{
	loginGetCode: async(payload) =>
	{
		return client.post('user/get-code', JSON.stringify(payload)).catch(function(error)
		{
		});
	},
	loginCheckCode: async(payload) =>
	{
		return client.post('/user/sign-in', JSON.stringify(payload)).catch(function(error)
		{
			throw error;
		});
	},
	completeRegister: (payload) =>
	{
		return client.post('/user/confirm', payload);
	},
	me: (payload) =>
	{
		return client.get('/user/me', payload)
	},
	updateUser: (payload) =>
	{
		return client.put('/user/edit', payload)
	},
	gettingСategories: (payload) =>
	{
		return client.get('/categories/',payload)
	},

	createGame: (payload) =>
	{
		return client.post('/events/', JSON.stringify(payload)).catch(function(error)
		{
			console.log(error);
		});
	},
	fetchEvents: (payload) =>
	{
		return client.get(`/events/${payload}`)
	},
	redactGame: (payload)=>
	{
		return client.put(`/events/${payload.slug}`, payload.data)
	}
};

export default user;

export const loginGetCode = user.loginGetCode;
export const loginCheckCode = user.loginCheckCode;
