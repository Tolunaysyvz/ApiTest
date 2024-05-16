const express = require("express");

const app = express();

const joı = require("joi");

app.use(express.json());

const products = [
    {
        id:1,
        name:"iphone 11",
        price:50000
    },
    {
        id:2,
        name:"iphone 12",
        price:60000
    },
    {
        id:3,
        name:"iphone 13",
        price:70000
    },
]


app.get('/product',(req,res) => {
    res.send(products);
})

app.get('/product/:id',(req,res) => {
    const product = products.find(p => p.id == req.params.id);
    if(!product){
        res.status(404).send("Aradığınız ürün bulunamadı")
    }

    res.send(product);  
})


app.post('/product',(req,res) => {

    const { error } = validationPost(req.body);

    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }

    const data = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
    };

    products.push(data);

    res.send(data);
})


app.put('/product/:id',(req,res) => {

    const product = products.find(p => p.id == req.params.id);
    if(!product){
        res.status(404).send("Aradığınız ürün bulunamadı")
        return;
    }


    const { error } = validationPost(req.body);

    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }

    res.send(req.body.name);


    product.name = req.body.name;
    product.price = req.body.price;

    res.send(product);

})

app.delete('/product/:id',(req,res) => {

    const product = products.find(p => p.id == req.params.id);
    if(!product){
        res.status(404).send("Aradığınız ürün bulunamadı")
        return;
    }

    const index = products.indexOf(product);

    products.splice(index,1);

})


const validationPost = (result) => {
    const shema = new joı.object({
        name:joı.string().min(3).max(20).required(),
        price:joı.number().required(),
    });

    return shema.validate(result);
}





app.listen(3000,(req,res) => {
    console.log("Api Aktif")
})