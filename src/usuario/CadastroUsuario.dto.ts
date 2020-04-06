import { IsString, Allow, ValidateNested, IsObject } from 'class-validator';
//import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


class Endereco {
   
    @ApiProperty({required : true})
    @IsString()
    readonly estado : string

    @ApiProperty({required : true})
    @IsString()
    readonly cidade : string

    @ApiProperty({required : true})
    @IsString()
    readonly bairro : string

    @ApiProperty({required : true})
    @IsString()
    readonly logradouro : string

    @ApiProperty({required : true})
    @IsString()
    readonly numero : string

    @ApiProperty()
    @IsString()
    readonly ponto_referencia : string

    @ApiProperty({required : true})
    @IsString()
    readonly cep : string

}

export class CadastroUsuarioDto{

    @ApiProperty({required : true})
    @IsString()
    readonly nome : string

    @ApiProperty({required : true})
    @IsString()
    readonly cpf : string

    @ApiProperty({required : true})
    @IsString()
    readonly senha : string

    @ApiProperty({required : true})
    @IsString()
    readonly email : string

    @ApiProperty({required : false})
    @IsString()
    readonly telefone : string

    @ApiProperty({required : false})
    @IsString()
    readonly celular : string

    @ApiProperty({required : true})
    @IsString()
    readonly perfil_id : number

    @ApiProperty()
    @IsObject()
    readonly endereco : Endereco

}