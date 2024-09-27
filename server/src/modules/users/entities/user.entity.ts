import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'userId' };

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  // @Column({
  //   type: 'enum',
  //   enum: SexEnum,
  //   enumName: 'user_sex_enum', // enum name in db (must if you need to )
  //   nullable: false,
  // })
  // sex!: SexEnum;
}
