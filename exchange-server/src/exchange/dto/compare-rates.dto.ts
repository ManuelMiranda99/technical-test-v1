import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CompareRatesDto {
  @IsNotEmpty({
    message: 'La fecha de inicio es requerida',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate({
    message: 'La fecha de inicio no es una fecha válida',
  })
  fechainit: Date;

  @IsNotEmpty({
    message: 'La fecha de fin es requerida',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate({
    message: 'La fecha de fin no es una fecha válida',
  })
  fechafin: Date;
}
