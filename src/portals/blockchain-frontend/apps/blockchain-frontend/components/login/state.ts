import { useRouter } from 'next/router';
import type { User, LoginFormData } from '../../interfaces/types';
import { fetchLogin } from '../../api/fetchData';

export function useComponentState() {
  const router = useRouter();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const formData: LoginFormData = {
      Email: e.target.email.value,
      Password: e.target.password.value,
    };
    validateUser(formData);
  };

  async function validateUser(formData: LoginFormData): Promise<void> {
    const user: User = await fetchLogin(formData);
    if (!user) {
      console.error('User not found');
      return;
    }
    await router.push('/dashboard');
  }

  return { handleLoginFormSubmit };
}
