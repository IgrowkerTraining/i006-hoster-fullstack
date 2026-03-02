import { Table, Column, Model, DataType, AllowNull, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript'
import Reserve from './Reserve';

@Table({ 
    tableName: 'origins'
}) 
class Origin extends Model {

    @AllowNull(false) 
    @Column({
        type: DataType.STRING(50)
    })
    declare description:string; 

    @HasMany(() => Reserve, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    reserves: Reserve[]
}

export default Origin;