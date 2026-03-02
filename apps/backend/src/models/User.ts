import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull, BelongsTo, ForeignKey} from 'sequelize-typescript'
import Reserve from './Reserve'

@Table({
    tableName: 'users'
})

class User extends Model{
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare name:string
    
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password:string

    @Unique(true)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare email:string

    @Column({
        type: DataType.STRING(6)
    })
    declare token:string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed:boolean
    
    @HasMany(() => Reserve, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    reserves: Reserve[]
}

export default User