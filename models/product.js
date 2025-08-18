// const products = []
const fs = require('fs')
const path = require('path')

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
  constructor(title, imageUrl, description, price) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }
  save() {
    // products.push(this)
    // const p = path.join(
    //   path.dirname(require.main.filename),
    //   'data',
    //   'products.json'
    // )
    this.id = Math.random().toString()
    getProductsFromFile((products) => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
    // fs.readFile(p, (err, fileContent) => {
    //   console.log(fileContent)
    //   let products = []
    //   //   if (!err) {
    //   //     products = JSON.parse(fileContent)
    //   //   }
    //   products.push(this)
    //   fs.writeFile(p, JSON.stringify(products), (err) => {
    //     console.log(err)
    //   })
    // })
  }
  // Also want to have a fetchAll method which is like the utility function you could say. This is not called on a single instance of the product because it should fetch all products and I don't want to create a new object with the new keyword with some dummy title just to fetch all existing products and therefore I will add the static keyword which javascript offers which make sure that I can call this method directly on the class itself and on an instantiated object
  static fetchAll(cb) {
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

    getProductsFromFile(cb)
  }
  static findById(id, cb) {
    // callback which will be executed once we've done finding the product
    getProductsFromFile((products) => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
}
