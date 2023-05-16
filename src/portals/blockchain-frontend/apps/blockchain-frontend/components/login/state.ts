import { useRouter } from 'next/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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
    createUser(raw);
  };

  async function createUser(formData: UserRequest): Promise<void> {
    const user: UserResponse = await GetUserByEmail(formData);
    if (!user) {
      console.error('User not Created!');
      return;
    }
    await router.push('/dashboard');
  }

  return { handleLoginFormSubmit };
}
