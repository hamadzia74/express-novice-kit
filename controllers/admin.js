const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  console.log('Middleware 3')
  //   res.send(
  //     "<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  //   );
  //   res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true,
  })
}

exports.postAddProduct = (req, res, next) => {
  console.log(req.body)
  // products.push({ title: req.body.title })
  const product = new Product(req.body.title) // create a new object based on this class blueprint and that is what classes are in the end, they are blueprints.
  product.save()
  res.redirect('/') // redirect to the root URL
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
