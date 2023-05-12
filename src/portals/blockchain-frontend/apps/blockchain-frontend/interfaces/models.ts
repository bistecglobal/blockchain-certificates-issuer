export interface User {
  Email: string;
  Password: string;
}

export interface Course {
  Title: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
}

export interface Trainer {
  FirstName : string;
  LastName : string;
  EmailAddress : string;
}
