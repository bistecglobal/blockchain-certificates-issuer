import type {
  UserRequest,
  UserResponse,
  CourseRequest,
  CourseResponse,
} from 'apps/blockchain-frontend/interfaces/viewModels';

export async function fetchLogin(userReq: UserRequest): Promise<UserResponse> {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  const options: RequestInit = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(userReq),
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
    return (await response.json()) as UserResponse;
  } catch (error) {
    console.error('Oh no, Error occured in fetchLogin()!', error);
  }
}

export async function createCourse(
  courseReq: CourseRequest
): Promise<CourseResponse> {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(courseReq),
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/course`,
      requestOptions
    );
    if (response.status === 500) {
      console.error('Internal Server Error');
      return null;
    }
    if (!response.ok) {
      console.error('Unspecified error occured!');
      return null;
    }
    return (await response.json()) as CourseResponse;
  } catch (error) {
    console.error('Oh no, Error occured in createCourse()!', error);
  }
}
