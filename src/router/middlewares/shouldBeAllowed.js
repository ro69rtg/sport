import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

async function shouldBeAllowed(to,from,next)
{
	const router = useRouter();
	const userStore = useUserStore();
	if($cookies.get('token') && !userStore.isUserAuth)
		await userStore.fetchCurrentUser();
	else if(!$cookies.get('token') && !userStore.isUserAuth)
		router.push('/login');
	next();
}
export default shouldBeAllowed;