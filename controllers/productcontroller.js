const products = require('../models/productmodel')

exports.getproducts = async (req, res) => {
  try {
    let allProducts = await products.find()
    res.status(200).json(allProducts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createproduct = async (req, res) => {
    try{
        let newProduct = await products.create(req.body)
        res.status(201).json(newProduct)
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}

exports.createbulkproducts = async (req, res) => {
    try{
        let newProducts = await products.insertMany(req.body)
        res.status(201).json(newProducts)
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}

exports.updateproduct = async (req, res) => {
    try {
        const updatedProduct = await products.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.deleteproduct = async (req, res) => {
    try{
        let deletedProduct = await products.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedProduct)
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}

