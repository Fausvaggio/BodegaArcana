export class BaseDTO {
    Id?: number;
    Estado?: boolean;
    UsuarioCreacion!: string;
    UsuarioModificacion!: string;
    FechaCreacion?: Date;
    FechaModificacion?: Date;
}  