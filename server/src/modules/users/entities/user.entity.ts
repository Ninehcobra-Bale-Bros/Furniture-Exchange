import { Transform } from 'class-transformer';
import { UUID } from 'crypto';
import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';
import { BaseEntity } from 'src/core/base.entity';
import { Account } from 'src/modules/payments/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: UUID & { __brand: 'userId' };

  @Column({ type: 'varchar', length: 11, nullable: true, default: null })
  CCCD: string;

  @OneToOne(() => Account, (account) => account.user, { onDelete: 'SET NULL' })
  account!: Account;

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

  @Column({ type: 'text', default: '' })
  @Transform(
    ({ value }) => {
      if (value.match(/"([^"]+)"/g)) {
        return value
          .match(/"([^"]+)"/g)
          .map((s: string) => s.replace(/"/g, ''))[0];
      }

      return value;
    },
    { toClassOnly: true },
  )
  image_url: string;

  @Column({ type: 'text', default: '' })
  @Transform(
    ({ value }) => {
      if (value.match(/"([^"]+)"/g)) {
        return value
          .match(/"([^"]+)"/g)
          .map((s: string) => s.replace(/"/g, ''))[0];
      }

      return value;
    },
    { toClassOnly: true },
  )
  image_id: string;

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

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
