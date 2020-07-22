import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto{

    @ApiProperty({required : true})
    @IsString()
    readonly email : string

    @ApiProperty({required : true})
    @IsString()
    readonly senha : string

}