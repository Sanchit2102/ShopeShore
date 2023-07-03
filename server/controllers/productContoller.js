const slugify = require("slugify");
const Product = require("../models/Product.js");
const fs = require('fs')
const Category = require("../models/Category.js");

//Payment Gateway
var braintree = require("braintree");
const Order = require("../models/Order.js");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAIN_TREE_MERCHANT_ID,
  publicKey: process.env.BRAIN_TREE_PUBLIC_KEY,
  privateKey: process.env.BRAIN_TREE_PRIVATE_KEY,
});


exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });

      case !description:
        return res.status(500).send({ error: "description is required" });

      case !price:
        return res.status(500).send({ error: "price is required" });

      case !category:
        return res.status(500).send({ error: "category is required" });

      case !quantity:
        return res.status(500).send({ error: "quantity is required" });

      case !photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less than mb" });
    }

    const products = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    return res.status(201).send({
      success: true,
      message: "Product Created Sucessfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in create product",
    });
  }
};


//Get Product
exports.getAllProducts = async (req, res) => {
  try {
  
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });

      const total = await Product.find({}).estimatedDocumentCount();

    return res.status(200).send({
      totalCount: total,
      success: true,
      message: "all products",
      products,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Products",
    });
  }
};

// product Count
exports.productCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({ success: true, total });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in product Count",
    });
  }
};

// product list-product per page

exports.productList = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products =await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 }).populate("category");

      res.status(200).send({
        success:true,
        products
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in product list",
    });
  }
};

//GET single Product
exports.getProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug })
      .select("-photo")
      .populate("category");
      
    return res.status(200).send({
      success: true,
      message: "single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in single product",
    });
  }
};

//Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;
    const { pid } = req.params;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });

      case !description:
        return res.status(500).send({ error: "description is required" });

      case !price:
        return res.status(500).send({ error: "price is required" });

      case !category:
        return res.status(500).send({ error: "category is required" });

      case !quantity:
        return res.status(500).send({ error: "quantity is required" });

      case !photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less than mb" });
    }

    const products = await Product.findByIdAndUpdate(pid,{ ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    return res.status(201).send({
      success: true,
      message: "Product Updated Sucessfully",
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in updating product",
    });
  }
};

//Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid);

    return res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while deleting Product",
    });
  }
};

//get Photo
exports.getProductPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in getting photo",
    });
  }
};

//filters
exports.productFilters = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);

    res.status(200).send({
      totalCount:products.length,
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in filter Controller",
    });
  }
};

//product Search
exports.productSearch =async(req,res)=>{
try {
  const {keyword} = req.params
  const results = await Product.find({ $or :[
{name:{$regex : keyword,$options :"i"}},
{description:{$regex : keyword,$options :"i"}}
  ]}).select("-photo").populate("category")

  res.json(results)

} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message:"error in search"
  })
}
}

//related Product 
exports.relatedProducts =async(req,res)=>{
  try {
    const {pid,cid} = req.params
  const products = await Product.find({category:cid,_id:{$ne:pid}}).select("-photo").populate("category")
  res.status(200).send({
    success:true,
    products
  })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in related product"
    })
  }
}

//Product By Category
exports.productByCategory =async(req,res)=>{
try {
  const {Id} = req.params;

  const products = await Product.find({category:Id}).populate("category").select("-photo")

return res.status(200).send({
  success:true,
  message:"Product By Category",
  products
})
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message:"error in product by category"
  })
}
}


//Payment getWay api

//token
exports.braintreeToken =async(req,res)=>{
  try {
    gateway.clientToken.generate({},function(error,result){
      if(error) {
        res.status(500).send({
          success:false,
          error
        })
      }
      else{
        res.send(result)
      }
    })
  } catch (error) {
    console.log(error)
  
  }
  }
  
  //payments
  exports.braintreePayments=async(req,res)=>{
  try {
    const {cart,nonce} = req.body;
   
    let total = 0;
    cart.map((i)=> {total+= i.price});
  
    let newTransaction = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true
      } 
    },
    function(error,result){
      if(result){
        // const order = new Order({
        //   product:cart,
        //   payment:result,
        //   buyer:req.user.id
        // }).save()
        // res.json({ok:true})
  
        const order = Order.create({
          products:cart,
          payment:result,
          buyer:req.user.id
        })
  
        res.json({ok:true})
      }
      else{
        res.status(500).send({
          error
        })
      }
    }
    )
  } catch (error) {
    console.log(error)
  }
  }