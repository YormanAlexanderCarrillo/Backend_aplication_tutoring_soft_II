import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './Dtos/Register_User.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/Dtos/Login_user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/Enums/enum.role';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';

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

  @ApiBearerAuth()
  @Roles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('register-tutor')
  async registerTutor(@Body() dataTutor: RegisterUserDto){
    return await this.authService.registerTutor(dataTutor)
  }

}
