import {User} from 'src/entity/user.entity';
type RemoveItems = {
  userId: string;
  lastLoggedIn: number;
  hashedPassword: number;
};
export type CreateUserDto = {password: string} & Omit<User, keyof RemoveItems>;
export type ResponseUserDto = Omit<User, 'hashedPassword'>;
export type UpdateUserDto = Omit<User, 'id'>;
export enum AccountType {
  Local = 'local',
}
