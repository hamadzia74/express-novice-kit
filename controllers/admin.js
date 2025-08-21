const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  console.log('Middleware 3')
  //   res.send(
  //     "<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  //   );
  //   res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    // activeAddProduct: true,
    // formsCSS: true,
    // productCSS: true,
  })
}

exports.postAddProduct = (req, res, next) => {
  console.log(req.body)
  // products.push({ title: req.body.title })
  //   const product = new Product(req.body.title) // create a new object based on this class blueprint and that is what classes are in the end, they are blueprints.

  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product(title, imageUrl, description, price)

  product.save()
  res.redirect('/') // redirect to the root URL
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    })
  })
}

exports.postEditProduct = (req, res, next) => {

}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    })
  })
}
