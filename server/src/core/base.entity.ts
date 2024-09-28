import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string | number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;
}
