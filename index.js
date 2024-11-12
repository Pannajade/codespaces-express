const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))

let products = []
for (let i = 1; i <= 100; i++){
  let product = {
    id: i,
    name: `Product ${i}`,
    description: `This is product ${i}`,
    price: (Math.random() * 100).toFixed(2)
  }
  products.push(product)
}

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/page2', (req, res) => {
  // console.log(req.query)
  // console.log(req.query.search_query)
  let q = req.query.search_query
  res.render('page2',{q})
})

app.get('/product', (req, res) => {
  let limit = parseInt(req.query.limit)
  let page = parseInt(req.query.page)

  let startIndex = (page-1)*limit
  let endIndex = page * limit
  let paginatedProduct = products.slice(startIndex,endIndex)

  res.render('product',{paginatedProduct,limit,page})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
