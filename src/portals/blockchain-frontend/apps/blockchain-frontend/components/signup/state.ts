import { useRouter } from 'next/router';
import type { UserRequest, UserResponse } from '../../interfaces/viewModels';
import { CreateUserByEmail } from '../../api/fetchData';

export function useComponentState() {
  const router = useRouter();

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();
    const raw: UserRequest = {
      Email: e.target.email.value,
      Password: e.target.password.value,
    };
    createUser(raw);
  };

  async function createUser(formData: UserRequest): Promise<void> {
    const user: UserResponse = await CreateUserByEmail(formData);
    if (!user) {
      console.error('User not found');
      return;
    }
    await router.push('/dashboard');
  }

  return { handleSignupFormSubmit };
}
