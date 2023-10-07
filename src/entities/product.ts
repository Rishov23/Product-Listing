import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
    @PrimaryGeneratedColumn() id: number;
    @Column() sku: string;
    @Column() name: string;
    @Column() price: number;
}