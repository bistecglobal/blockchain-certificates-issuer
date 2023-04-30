import type { User, LoginFormData } from '../interfaces/types';

export async function fetchLogin(formData: LoginFormData): Promise<User> {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  const options: RequestInit = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(formData),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
      options
    );
    if (response.status === 401) {
      console.error('Invalid username or password');
      return null;
    }
    if (response.status === 500) {
      console.error('Internal Server Error');
      return null;
    }
    if (!response.ok) {
      console.error('Unspecified error occured!');
      return null;
    }
    return (await response.json()) as User;
  } catch (error) {
    console.error('Oh no, Error occured in fetchLogin()!', error);
  }
}
