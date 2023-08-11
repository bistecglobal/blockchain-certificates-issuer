import { useRouter } from 'next/router';
import type { UserRequest, UserResponse } from '../../interfaces/viewModels';
import { CreateUserByEmail } from '../../api/fetchData';
import { useState } from 'react';

export function useComponentState({updateIsRegister}) {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(true);
  const [isMatch, setIsMatch] = useState(true);
  const [isLodging, setIsLodging] = useState(false);

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();
    setIsLodging(true)
    const userDetail: UserRequest = {
      Email: e.target.email.value,
      Password: e.target.password.value,
      PasswordConfirmation: e.target.passwordConfirmation.value
    };
    if (userDetail.Password !== userDetail.PasswordConfirmation) {
      setIsMatch(false);

    } else {
      setIsMatch(true);
      createUser(userDetail);
    }

  };

  async function createUser(formData: UserRequest): Promise<void> {
    setIsAvailable(true)
    const user: UserResponse = await CreateUserByEmail(formData);
    if (!user) {
      console.error('User not found');
      setIsAvailable(false);
      setIsLodging(false);
      return;
    } else{
      setIsLodging(false);
      updateIsRegister && updateIsRegister();
      await router.push('/');
    } 
  }

  return { handleSignupFormSubmit, isAvailable,isMatch,isLodging };
}
