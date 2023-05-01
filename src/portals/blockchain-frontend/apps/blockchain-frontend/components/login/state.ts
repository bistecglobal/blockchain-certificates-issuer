import { useRouter } from 'next/router';
import type {
  UserRequest,
  UserResponse,
} from 'apps/blockchain-frontend/interfaces/viewModels';
import { GetUserByEmail } from '../../api/fetchData';

export function useComponentState() {
  const router = useRouter();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const raw: UserRequest = {
      Email: e.target.email.value,
      Password: e.target.password.value,
    };
    validateUser(raw);
  };

  async function validateUser(formData: UserRequest): Promise<void> {
    const user: UserResponse = await GetUserByEmail(formData);
    if (!user) {
      console.error('User not found');
      return;
    }
    await router.push('/dashboard');
  }

  return { handleLoginFormSubmit };
}
