import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AppFirebase } from 'src/firebase/firebase_config';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './Dtos/Register_User.dto';
import { LoginUserDto } from 'src/user/Dtos/Login_user.dto';
const auth = getAuth(AppFirebase);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }


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

  async login(dataLogin: LoginUserDto): Promise<Object> {
    try {
      const userFirebase = await signInWithEmailAndPassword(
        auth,
        dataLogin.email,
        dataLogin.password,
      );
      console.log(userFirebase);

      const userDB = await this.userService.findUserByUid(
        userFirebase.user.uid,
      );
      if (!userDB) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      const payload = {
        uid: userDB.uid,
        email: userDB.email,
        role: userDB.role,
      };
      const token = await this.jwtService.signAsync(payload);

      return {
        userData: userDB,
        token: token,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}




