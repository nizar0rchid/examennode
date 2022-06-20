const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    label: String,
    price: Number,
    quantity: Number,
    image: String,
    user: String
}, {
    timestamps: true
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;