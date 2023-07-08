import {User} from 'src/entity/user.entity';
type RemoveItems = {
  id: string;
  lastLoggedIn: number;
};
export type CreateUserDto = Omit<User, keyof RemoveItems>;
export type UpdateUserDto = Omit<User, 'id'>;
