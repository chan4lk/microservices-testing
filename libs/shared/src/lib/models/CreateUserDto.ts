import { ApiProperty } from "@nestjs/swagger";

export class CreateUser {
    @ApiProperty()
    userName: string;

    @ApiProperty()
    password: string;
}

export class User {
    @ApiProperty()
    userName: string;
    
    @ApiProperty()
    created: Date;
}