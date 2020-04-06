import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './Login.dto';
import { LoginService } from './login.service';

@Controller('login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/')
  async cadastraUsuario(@Body() loginDto : LoginDto){
        return  await this.loginService.create(loginDto);
  }

  

}
