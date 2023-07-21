import { useRouter } from 'next/router';
import type { UserRequest, UserResponse } from '../../interfaces/viewModels';
import { GetUserByEmail } from '../../api/fetchData';
import { useState } from 'react';

export function useComponentState() {
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLodging, setIsLodging] = useState(false);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setIsLodging(true)
    const raw: UserRequest = {
      Email: e.target.email.value,
      Password: e.target.password.value,
    };

    await validateUser(raw);
  };

  async function validateUser(formData: UserRequest): Promise<void> {
    const user: UserResponse = await GetUserByEmail(formData);
    if (!user) {
      console.error('User not Created!');
      setIsInvalid(true);
      setIsLodging(false);
      return;
    }
    await router.push('/dashboard');
  }
  return { handleLoginFormSubmit,isInvalid,isLodging };
}
