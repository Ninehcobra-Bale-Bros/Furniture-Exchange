import { UUID } from 'crypto';
import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';
import { BaseEntity } from 'src/core/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: UUID & { __brand: 'userId' };

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'boolean', default: false })
  email_verified!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  first_name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  last_name!: string;

  @Column({
    type: 'enum',
    enum: SexEnum,
    enumName: 'sex',
    nullable: false,
  })
  sex!: SexEnum;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  phone_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address_line1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address_line2: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    enumName: 'role',
    default: RoleEnum.BUYER,
  })
  role!: RoleEnum;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
