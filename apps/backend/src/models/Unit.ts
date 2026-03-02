import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'
import Reserve from './Reserve'

@Table({
    tableName: 'units'
})

class Unit extends Model{
    
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare type:string
    
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare capacity:number

    @AllowNull(false)
    @Column({
        type: DataType.STRING(20)
    })
    declare state:string

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare price:number

    @HasMany(() => Reserve, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    reserves: Reserve[]
}

export default Unit