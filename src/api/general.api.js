import client from '@/plugins/axios.js';
import axios from 'axios'
const general =
{
    upload: async (payload) => 
    {
        try
        {
            return await client.post('/storage/upload', payload);
        }
        catch(e)
        {
            console.log(e);
        }
    },
    fetchAddresses: async (payload) => 
    {
        const token = "95b66e24418f93b0a69cb4bea30f4aef751237b9";

        try
        {
            return await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {query: payload},
            {
              headers: 
              {
                Authorization: 'Token ' +  token
              }
            })
        }
        catch(e)
        {
            console.log(e)
        }
    }
}
export default general