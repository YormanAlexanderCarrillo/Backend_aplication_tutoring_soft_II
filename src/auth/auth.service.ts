import { HttpStatus, Injectable } from '@nestjs/common';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AppFirebase } from 'src/firebase/firebase_config';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './Dtos/Register_User.dto';
const auth = getAuth(AppFirebase);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(user: RegisterUserDto) {
    try {
      const userFirebase = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );
      const dataUser = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        uid: userFirebase.user.uid,
      };

      const userToDataBase = await this.userService.createUser(dataUser);
      if (userToDataBase.status !== 200) {
        return {
          message: 'fallo el registro en la BD',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      return {
        message: 'Registro exitoso',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return error;
    }
  }
}
