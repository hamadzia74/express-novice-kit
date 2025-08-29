// const products = []
const fs = require('fs')
const path = require('path')
const { deleteProduct } = require('./cart')
const db = require('../util/database')

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
)

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }
  // save() {
  //   // products.push(this)
  //   // const p = path.join(
  //   //   path.dirname(require.main.filename),
  //   //   'data',
  //   //   'products.json'
  //   // )

  //   getProductsFromFile((products) => {
  //     if (this.id) {
  //       const existingProductIndex = products.findIndex(
  //         (prod) => prod.id === this.id
  //       )
  //       const updatedProducts = [...products]
  //       updatedProducts[existingProductIndex] = this
  //       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
  //         console.log(err)
  //       })
  //     } else {
  //       this.id = Math.random().toString()
  //       products.push(this)
  //       fs.writeFile(p, JSON.stringify(products), (err) => {
  //         console.log(err)
  //       })
  //     }
  //   })
  //   // fs.readFile(p, (err, fileContent) => {
  //   //   console.log(fileContent)
  //   //   let products = []
  //   //   //   if (!err) {
  //   //   //     products = JSON.parse(fileContent)
  //   //   //   }
  //   //   products.push(this)
  //   //   fs.writeFile(p, JSON.stringify(products), (err) => {
  //   //     console.log(err)
  //   //   })
  //   // })
  // }

  // insert data to db
  // Now to safely insert values and not face the issue of SQL injection which is an attack pattern where users can insert special data into your input fields in your webpage that runs as SQL queries, we should use an approach where we just use question marks, one for each of the fields we insert data into separated with commas and then there is a second argument we pass to execute with the values that will be injected instead of these question marks.
  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    )
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id)
      const updatedProducts = products.filter((p) => p.id !== id)
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          deleteProduct(id, product.price)
        }
      })
    })
  }

  // Also want to have a fetchAll method which is like the utility function you could say. This is not called on a single instance of the product because it should fetch all products and I don't want to create a new object with the new keyword with some dummy title just to fetch all existing products and therefore I will add the static keyword which javascript offers which make sure that I can call this method directly on the class itself and on an instantiated object
  // static fetchAll(cb) {
  // const p = path.join(
  //   path.dirname(require.main.filename),
  //   'data',
  //   'products.json'
  // )
  // fs.readFile(p, (err, fileContent) => {
  //   if (err) {
  //     // return []
  //     cb([])
  //   }
  //   //   return JSON.parse(fileContent)
  //   cb(JSON.parse(fileContent))
  // })
  // return products

  //   getProductsFromFile(cb)
  // }

  // fetch from db
  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  // static findById(id, cb) {
  //   // callback which will be executed once we've done finding the product
  //   getProductsFromFile((products) => {
  //     const product = products.find((p) => p.id === id)
  //     cb(product)
  //   })
  // }

  // fetch by id from db
  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }
}
