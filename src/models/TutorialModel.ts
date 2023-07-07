import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: "tutorials",
})

export class Tutorial extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: true
    })
    published!: boolean;
}