import client from '@/plugins/axios.js';

const events = {

	fetchUserEvents: async (page) =>
	{
		return client.get(`events/my?=${page}`);
	},
	// достает все игры
	getEvents: async (date = '') =>
	{
		let params = {};
		if(date !== '')
			params['filters[date]'] = date;

		let allEvents = client.get('events/', {params: params });
		return allEvents;
	},

	joinToEvent: async (slug) =>
	{
		return client.post(`events/${slug}/join`);
	},

	fetchEvents: async (slug) =>
	{
		return client.get(`events/${slug}`);
	},

	myUserEvents: (payload) =>
	{
		return client.get('events/my', {
		}).catch(function(error)
		{});
	},
};

export default events;