import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  id!: string | number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: null,
  })
  deleted_at!: Date;
}
