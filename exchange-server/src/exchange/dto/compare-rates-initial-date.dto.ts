import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CompareRatesByInitialDateDto {
  @IsNotEmpty({
    message: 'La fecha de inicio es requerida',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate({
    message: 'La fecha de inicio no es una fecha válida',
  })
  fechainit: Date;
}
