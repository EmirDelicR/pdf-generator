import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DBTableNames, Roles } from 'src/utils/constants/db';
@Entity(DBTableNames.ROLE)
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  type!: Roles;

  toResponse(): Role {
    const role = new Role();
    role.id = this.id;
    role.type = this.type;

    return role;
  }
}
