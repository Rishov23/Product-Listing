import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { Products } from "./entities/product";
// import { allProducts } from "./server";
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "http://localhost:4200",

}));

app.use(express.json());
const PORT = process.env.PORT || 3002;
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "rishovsaha@123",
    database: "productsdb",
    entities: ["src/entities/*{.ts,.js}"],
    synchronize: true,
    logging: true
});

AppDataSource.initialize().then(() => { console.log('Database successfully connected') })
    .catch((err: any) => console.log('Error connecting database ', err));

//return all products
app.get('/',  async (req: any, res: any) => {
    const productRepo = AppDataSource.getRepository(Products);

    //Find all the records
    const allRecords = await productRepo.find();

    //Returning all records
    res.json(allRecords);
});

//add a product
app.post('/addproduct', async (req: any, res: any) => {
    const productRepo = AppDataSource.getRepository(Products);
    let product: Products = new Products();
    product.sku = req.body.sku;
    product.name = req.body.name;
    product.price = req.body.price;

    await productRepo.save(product);
    const allRecords = await productRepo.query('select * from products');
    //Returning all records
    res.send(allRecords);
});

//update a product
app.put('/updateproduct', async (req, res) => {
    const productRepo = AppDataSource.getRepository(Products);
    await productRepo.update( req.body.sku, req.body.name );
    res.send('Record updated');
});

//delete a product
app.delete('/deleteproduct', async (req, res) => {
    const productRepo = AppDataSource.getRepository(Products);
    await productRepo.findOne({where: {id: req.body.id}});
    res.send('Record deleted');
});

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});