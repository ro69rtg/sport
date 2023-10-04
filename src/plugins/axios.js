import axios from 'axios';

const config = {
	baseURL: process.env.MAIN_API_HOST,
	headers:
	{
		// 'Authorization': 'test',
		// 'Access-Control-Allow-Origin': '*',
		// 'Content-Type': 'application/json',
	},

};

const client = axios.create(config);

const authInterceptor = config =>
{
	config.headers.Authorization = `Bearer ${$cookies.get('token')}`;
	//  config.headers.common.Accept = 'Application/json'
	//  config.headers['Access-Control-Allow-Origin'] = '*'
	return config;
};
client.interceptors.response.use(
	function(response)
	{
		return response;
	},
	function(error)
	{
		if(error && error.response.status === 401)
		{
			$cookies.remove('token');
		}
		return Promise.reject(error);
	},
);
client.interceptors.request.use(authInterceptor);

export default client;