import { Table, Column, Model, DataType, AllowNull, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript'
import Payment from './Payment';

@Table({ 
    tableName: 'methods'
}) 
class Method extends Model {

    @AllowNull(false) 
    @Column({
        type: DataType.STRING(50)

    })
    declare name: string;

    @Column({
        type: DataType.STRING(100)
    }) 
    declare description: string; 

    @HasMany(() => Payment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    payments: Payment[]
}

export default Method;
