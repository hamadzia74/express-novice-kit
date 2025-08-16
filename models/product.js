const products = []

module.exports = class Product {
  constructor(title) {
    this.title = t
  }
  save() {
    products.push(this)
  }
  // Also want to have a fetchAll method which is like the utility function you could say. This is not called on a single instance of the product because it should fetch all products and I don't want to create a new object with the new keyword with some dummy title just to fetch all existing products and therefore I will add the static keyword which javascript offers which make sure that I can call this method directly on the class itself and on an instantiated object
  static fetchAll() {
    return products
  }
}
