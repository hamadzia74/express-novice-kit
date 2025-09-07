const Product = require('../models/productSeq')

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
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  // create method creates a new element based on that model immediately saves it to the database. There also is build which also creates a new object based on the model but only in javascript and then we need to save it manually.
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log(result)
    })
    .catch((err) => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findByPk(prodId)
    .then((product) => {
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
    .catch((err) => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle
      product.price = updatedPrice
      product.imageUrl = updatedImageUrl
      product.description = updatedDesc
      return product.save()
    })
    .then((result) => {
      console.log('UPDATED PRODUCT!')
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      })
    })
    .catch((err) => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}
