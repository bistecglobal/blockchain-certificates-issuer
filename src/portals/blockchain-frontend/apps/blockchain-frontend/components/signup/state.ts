import { useRouter } from 'next/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type {
  UserRequest,
  UserResponse,
} from 'apps/blockchain-frontend/interfaces/viewModels';
import { CreateUserByEmail } from '../../api/fetchData';

export function useComponentState() {
  const router = useRouter();

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();
    const raw: UserRequest = {
      Email: e.target.email.value,
      Password: e.target.password.value,
    };
    validateUser(raw);
  };

  async function validateUser(formData: UserRequest): Promise<void> {
    const user: UserResponse = await CreateUserByEmail(formData);
    if (!user) {
      console.error('User not found');
      return;
    }
    await router.push('/dashboard');
  }

  return { handleSignupFormSubmit };
}
