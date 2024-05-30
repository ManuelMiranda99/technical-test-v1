import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LogRequest {
  @PrimaryGeneratedColumn()
  id?: number;

  // TODO: SOMETHING THAT CAN BE IMPROVED. THIS CAN BE RATE RECORDS, AND BE A SEPARATE ENTITY CONNECTED TO THIS ONE
  @Column({ type: 'date' })
  initialDate: Date;

  @Column({ type: 'float' })
  initialPurchaseRate: number;

  @Column({ type: 'float' })
  initialSaleRate: number;

  // TODO: SOMETHING THAT CAN BE IMPROVED. THIS CAN BE RATE RECORDS, AND BE A SEPARATE ENTITY CONNECTED TO THIS ONE
  @Column({ type: 'date' })
  finalDate: Date;

  @Column({ type: 'float' })
  finalPurchaseRate: number;

  @Column({ type: 'float' })
  finalSaleRate: number;
}
