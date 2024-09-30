import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {
  id!: string | number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    default: null,
    nullable: true,
  })
  deleted_at: Date | null;
}
