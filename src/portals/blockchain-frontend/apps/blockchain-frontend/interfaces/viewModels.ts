import { User, Course } from './models';

export interface UserRequest extends User {}

export interface UserResponse extends User {
  Id: string;
  Type: string;
}
export interface CourseRequest extends Course {}

export interface CourseResponse extends Course {
  Id: string;
  Type: string;
}
