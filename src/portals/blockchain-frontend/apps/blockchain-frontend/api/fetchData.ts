import type {
  UserRequest,
  UserResponse,
  CourseRequest,
  CourseResponse,
  TrainerRequest,
  TrainerResponse,
  TraineeResponse,
  TraineeRequest,
  CertificateRequest,
  CertificateResponse,
  PaginationResponse,
} from 'apps/blockchain-frontend/interfaces/viewModels';

export async function GetUserByEmail(
  userReq: UserRequest
): Promise<UserResponse> {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  const options: RequestInit = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(userReq),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/user/login`,
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

export async function CreateUserByEmail(
  userReq: UserRequest
): Promise<UserResponse> {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  const options: RequestInit = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(userReq),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/user/signup`,
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
    console.error('Oh no, Error occured in fetchSignup()!', error);
  }
}

export async function createCourse(
  courseReq: CourseRequest
): Promise<CourseResponse> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(courseReq),
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/course`,
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

export async function getCourse(
  pageNumber: number,
  pageSize: number
): Promise<PaginationResponse> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions: RequestInit = {
    method: 'Get',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/courses?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

    return (await response.json()) as PaginationResponse;
  } catch (error) {
    console.error('Oh no, Error occured in getCourse()!', error);
    return null;
  }
}

export async function createTrainer(
  trainerReq: TrainerRequest
): Promise<TrainerResponse> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(trainerReq),
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/trainer`,
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
    return (await response.json()) as TrainerResponse;
  } catch (error) {
    console.error('Oh no, Error occured in createTrainer()!', error);
  }
}

export async function getTrainers(
  pageNumber: number,
  pageSize: number
): Promise<PaginationResponse> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions: RequestInit = {
    method: 'Get',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/trainers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

    return (await response.json()) as PaginationResponse;
  } catch (error) {
    console.error('Oh no, Error occured in getCourse()!', error);
    return null;
  }
}

export async function createTrainee(
  trainerReq: TraineeRequest
): Promise<TraineeResponse> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(trainerReq),
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/trainee`,
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
    return (await response.json()) as TraineeResponse;
  } catch (error) {
    console.error('Oh no, Error occured in createTrainer()!', error);
  }
}

export async function getTrainees(
  pageNumber: number,
  pageSize: number
): Promise<PaginationResponse> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions: RequestInit = {
    method: 'Get',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/trainees?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

    return (await response.json()) as PaginationResponse;
  } catch (error) {
    console.error('Oh no, Error occured in getCourse()!', error);
    return null;
  }
}

export async function getAllCertificates(
  pageNumber: number,
  pageSize: number
): Promise<PaginationResponse> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions: RequestInit = {
    method: 'Get',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/certificates?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

    return (await response.json()) as PaginationResponse;
  } catch (error) {
    console.error('Oh no, Error occured in getCourse()!', error);
    return null;
  }
}

export async function createCertificate(
  certificateReq: CertificateRequest
): Promise<CertificateResponse> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(certificateReq),
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/certificates`,
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
    return (await response.json()) as CertificateResponse;
  } catch (error) {
    console.error('Oh no, Error occured in createTrainer()!', error);
  }
}

export async function getCertificateById(
  certificateId: any
): Promise<CertificateResponse> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions: RequestInit = {
    method: 'Get',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/certificates/${certificateId}`,
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

    return (await response.json()) as CertificateResponse;
  } catch (error) {
    console.error('Oh no, Error occured in getCertificate!', error);
    return null;
  }
}
export async function deleteById(
  id: string,
  itemName: string
): Promise<boolean> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let requestOptions: RequestInit = {
    method: 'DELETE',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/${itemName}/${id}`,
      requestOptions
    );
    if (response.status === 500) {
      console.error('Internal Server Error');
      return false;
    }
    if (!response.ok) {
      console.error('Unspecified error occured!');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Oh no, Error occured in deleteTrainee()!', error);
    return false;
  }
}

export async function getUserCertificateById(certificateId: any): Promise<any> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions: RequestInit = {
    method: 'Get',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/usercertificates/${certificateId}`,
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

    return await response.json();
  } catch (error) {
    console.error('Oh no, Error occured in getCertificate!', error);
    return null;
  }
}
export async function getCourseById(courseId: any): Promise<CourseResponse> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions: RequestInit = {
    method: 'Get',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/course/${courseId}`,
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
    console.error('Oh no, Error!', error);
    return null;
  }
}

export async function getTraineeById(traineeId: any): Promise<TraineeResponse> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions: RequestInit = {
    method: 'Get',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/trainee/${traineeId}`,
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

    return (await response.json()) as TraineeResponse;
  } catch (error) {
    console.error('Oh no, Error!', error);
    return null;
  }
}

export async function updateTrainee(
  traineeReq: TraineeRequest,
  traineeId: any
): Promise<TraineeResponse> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(traineeReq),
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/traineeupdate/${traineeId}`,
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
    return (await response.json()) as TraineeResponse;
  } catch (error) {
    console.error('Oh no, Error occured in updateTrainee()!', error);
  }
}

export async function getTrainerById(traineeId: any): Promise<TrainerResponse> {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions: RequestInit = {
    method: 'Get',
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/trainer/${traineeId}`,
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

    return (await response.json()) as TrainerResponse;
  } catch (error) {
    console.error('Oh no, Error!', error);
    return null;
  }
}

export async function updateTrainer(
  trainerReq: TrainerRequest,
  trainerId: any
): Promise<TrainerResponse> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(trainerReq),
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/trainerupdate/${trainerId}`,
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
    return (await response.json()) as TrainerResponse;
  } catch (error) {
    console.error('Oh no, Error occured in updateTrainer()!', error);
  }
}

export async function updateCourse(
  courseReq: CourseRequest,
  courseId: any
): Promise<CourseResponse> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(courseReq),
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/courseupdate/${courseId}`,
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
    console.error('Oh no, Error occured in updateCourse()!', error);
  }
}
