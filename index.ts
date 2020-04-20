export {}
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const products:  {id: number, name: string} [] = [
    {id: 1, name: 'products1' },
    {id: 2, name: 'products2' },
    {id: 3, name: 'products3' }
];

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send('Hello World');
});

app.get('/api/products', (req: any, res: { send: (arg0: number[]) => void; }) => {
    res.send([1, 2, 3]);
});

app.post('/api/products', (req: { body: { name: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): any; new(): any; }; }; send: (arg0: { id: number; name: string; }) => void; }) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product: {id: number, name: string} = {
        id: products.length + 1,
        name: req.body.name
    };
    products.push(product);
    res.send(product);
});

app.put('/api/products/:id', (req: { params: { id: string; }; body: { name: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; send: (arg0: { id: number; name: string; }) => void; }) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The product with the given id was not found...'); 

    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    product.name = req.body.name;
    res.send(product);
});

function validateProduct(product) {
    const schema: { name: string } = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(product, schema);
}

app.delete('/api/products/:id', (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; send: (arg0: { id: number; name: string; }) => void; }) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The product with the given id was not found...');

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(product);
});

app.get('/api/products/:id', (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; send: (arg0: { id: number; name: string; }) => void; }) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The product with the given id was not found...');
    res.send(product);
});

const port: string | number = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));