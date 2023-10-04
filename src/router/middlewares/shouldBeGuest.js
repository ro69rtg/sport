import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

async function shouldBeGuest(to,from,next)
{
	const router = useRouter();
	const userStore = useUserStore();
	if($cookies.get('token') && !userStore.isUserAuth)
	{
		await userStore.fetchCurrentUser();
		router.push(`/profile/${userStore.currentUser.id}`)
	}
	next();
}
export default shouldBeGuest;