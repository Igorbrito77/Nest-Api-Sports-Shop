import { IsString, Allow, ValidateNested, IsObject, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


class Item {
   
    @ApiProperty({required : true})
    @IsNumber()
    readonly produto_id : number

    @ApiProperty({required : true})
    @IsNumber()
    readonly quantidade : number

}

export class CadastroCompraDto{

    @ApiProperty({ isArray: true, type: Item }) readonly items: Item[]

}