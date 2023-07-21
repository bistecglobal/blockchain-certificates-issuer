export interface User {
  Email: string;
  Password: string;
  PasswordConfirmation? : string
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

export interface Trainee {
  FirstName : string;
  LastName : string;
  EmailAddress : string;
  WalletAddress : string;
}

export interface Certificate {
 Course : string,
 Trainee : Trainee[],
 Trainer : string,
 CertificateIssueDate : Date
}