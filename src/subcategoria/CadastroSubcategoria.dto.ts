import { IsString, Allow, ValidateNested, IsObject, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class CadastroSubcategoriaDto{
   
    @ApiProperty({required : true})
    @IsNumber()
    readonly categoria_id : number

    @ApiProperty({required : true})
    @IsString()
    readonly nome : string

    @ApiProperty({required : false})
    @IsNumber()
    readonly descricao : string

}
