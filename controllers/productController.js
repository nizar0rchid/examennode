const Product = require('../models/Product');

const users = [
    "213ESP0190",
    "213ESP0191",
    "213ESP0192",
    "213ESP0193",
    "213ESP0194"
];

module.exports = {
    /* au cas ou l create b vue
        createvue: (req, res) => { 
            res.render('create');
        },*/
    createProduct: async(req, res) => {
        const { id } = req.headers;
        if (!id) {
            return res.status(401).end();
        }

        if (users.indexOf(id) == -1) {
            return res.status(404).end();
        }


        const product = new Product({
            ...req.body
        });

        if (req.file) {
            product.image = req.file.path;
        }
        product.user = id;
        await product.save();
        res.json(product)


    },
    getUserProducts: async(req, res) => {
        const { id } = req.headers;
        if (!id) {
            return res.status(401).end();
        }

        if (users.indexOf(id) == -1) {
            return res.status(404).end();
        }

        const products = await Product.find({ user: id });
        res.json(products);
    },
    getAllProducts: async(req, res) => {
        const products = await Product.find();
        res.render("list", { products });
    },
    getProductById: async(req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        product.image = product.image.replace("uploads\\", "");
        res.render("details", { product });
    },
    deleteProduct: async(req, res) => {
        const { id } = req.params;
        await Product.remove({ _id: id });
        res.redirect("/products/all");
    }
}