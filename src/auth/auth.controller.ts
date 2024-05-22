import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './Dtos/Register_User.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/Dtos/Login_user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() dataRegister: RegisterUserDto) {
    return await this.authService.registerUser(dataRegister);
  }

  @Post('login')
  async login(@Body() dataLogin: LoginUserDto) {
    return await this.authService.login(dataLogin);
  }

  @Post('register-tutor')
  async registerTutor(@Body() dataTutor: RegisterUserDto){
    return await this.authService.registerTutor(dataTutor)
  }

}
