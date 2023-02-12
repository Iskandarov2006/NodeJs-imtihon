import express from 'express'
import { read, write } from './utils/utils.js'
const app = express()
import fs from 'fs'
app.get('/admins', (req, res) => {
    const json = read('admins')
    res.json(json)
})

// admins ===========================================================


app.get('/categories', (req, res) => {
    // res.json(read('categories'))
    let categories = read('categories')
    let products = read('products')
    let subCategories = read('subcategories')
    subCategories = subCategories.map(product => {
        product.product = products.filter(i => i.sub_category_id == product.sub_category_id)
        return product
    })
    res.json(subCategories)
})

app.post('/categories', (req, res) =>  {
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    })
    req.on('end', () => {
        let user = JSON.parse(data)
        let users = fs.readFileSync("./database/categories.json", 'utf-8')
        users = JSON.parse(users)

        users.push(user)
        fs.writeFileSync('./database/categories.json', JSON.stringify(users, null, 4))
        res.writeHead(201)
        res.end('qoshildi')
    })
})
app.get('/categories/:id', (req, res) => {
    let subCategory = read('categories')
    let a = subCategory.find(i => i.categoriy_id == req.params.id)
    res.json(a)
})




// categories end ================================================




app.get('/subcategories', (req, res) => {
    res.json(read('subcategories'))
})

app.get('/subcategories/:id', (req, res) => {
    let subCategory = read('subcategories')
    let a = subCategory.find(i => i.sub_category_id == req.params.id)
    res.json(a)
})

app.post('/subcategories', (req, res) => {
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    })
    req.on('end', () => {
        let user = JSON.parse(data)
        let users = fs.readFileSync("./database/subcategories.json", 'utf-8')
        users = JSON.parse(users)

        users.push(user)
        fs.writeFileSync('./database/subcategories.json', JSON.stringify(users, null, 4))
        res.writeHead(201)
        res.end('qoshildi')
    })
})




// subcategories end ================================================


app.get('/products', (req, res) => {
    res.json(read('products'))
})

app.post('/products', (req, res) => {
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    })
    req.on('end', () => {
        if (data.product_id && data.sub_category_id && data.model && data.product_name && data.color && data.price) {
            let user = JSON.parse(data)
            let users = fs.readFileSync("./database/products.json", 'utf-8')
            users = JSON.parse(users)
            users.push(user)
            fs.writeFileSync('./database/products.json', JSON.stringify(users, null, 4))
            res.writeHead(201)
            res.end('qoshildi')
        }
        else {
            res.end('aaa')
        }

    })
})

app.get('/products/:id', (req, res) => {
    let subCategory = read('products')
    let a = subCategory.find(i => i.product_id == req.params.id)
    res.json(a)
})

// =======================================================================



app.get('/all', (req, res) => {
    let admins = read('admins')
    let categories = read('categories')
    let products = read('products')
    let subCategories = read('subcategories')
    categories = categories.map(category => {
        category.category = subCategories.filter(i => i.category_id == category.categoriy_id)
        return category
    })
    subCategories = subCategories.map(product => {
        product.product = products.filter(i => i.sub_category_id == product.sub_category_id)
        return product
    })
    // subCategories = subCategories.map(subC => {
    //     subC.produc = products
    // })
    res.json(categories)
})




// products end ================================================


app.listen(5000, () => console.log('server run'))