import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull, BelongsTo, ForeignKey} from 'sequelize-typescript'
import Payment from './Payment'
import Service from './Service';
import Reserve from './Reserve';
@Table({
    tableName: 'currencies'
})

class Currency extends Model{
    
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare name:string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(3)
    })
    declare symbol:string

    @HasMany(() => Payment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
    })
    payments: Payment[]
    
    @HasMany(() => Service, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    services: Service[]
    
    @HasMany(() => Reserve, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    reserves: Reserve[]
    
}

export default Currency