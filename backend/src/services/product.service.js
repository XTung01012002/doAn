const { productSchema } = require("../models/product.model");
const { BadRequestError } = require("../responseHandle/error.response");
const { cartProductSchema } = require("../models/cartproduct.model");

class ProductService {
  static uploadProduct = async (productData) => {
    const products = await productSchema.insertMany(productData);
      return products;
  }

 // thêm 1 hoặc nhiều sản phẩm
  // static uploadProducts = async (productData) => {
  //   try {
  //     const products = await productSchema.insertMany(productData);
  //     return products;
  //   } catch (error) {
  //     throw new BadRequestError(`${error.message}`);
  //   }
  // };



  static getAllProducts = async () => {
    try {
      const products = await productSchema.find().sort({ createdAt: -1 });
      return products;
    } catch (error) {
      throw new BadRequestError(`${error.message}`);
    }
  };

  static updateProduct = async (productData,id) => {
    try {
      const {
        productName,
        brandName,
        category,
        productImage,
        description,
        price,
        sellingPrice,
        active,
      } = productData;
      const product = await productSchema.findById(id);
      if (!product) {
        throw new BadRequestError("Product not found");
      }
      product.productName = productName;
      product.brandName = brandName;
      product.category = category;
      product.productImage = productImage;
      product.description = description;
      product.price = price;
      product.sellingPrice = sellingPrice;
      product.active = active;
      await product.save();
      return product;
    } catch (error) {
      throw new BadRequestError(`${error.message}`);
    }
  };

  static getCategoryProductOne = async () => {
    try {
      const productByCategory = await productSchema.aggregate([
        {
          $group: {
            _id: "$category", // Nhóm theo category
            product: { $first: "$$ROOT" }, // Lấy sản phẩm đầu tiên trong mỗi nhóm
          },
        },
        {
          $replaceRoot: { newRoot: "$product" }, // Thay thế root bằng sản phẩm
        },
      ]);
      // console.log(productByCategory);
      return productByCategory;
    } catch (error) {
      throw new BadRequestError(`${error.message}`);
    }
  };

  static getCategoryWiseProduct = async (Data) => {
    try {
      const { category } = Data;
      const products = await productSchema.find({ category });
      return products;
    } catch (error) {
      throw new BadRequestError(`${error.message}`);
    }
  };

  static getProductDetails = async (data) => {
    try {
      const { productId } = data;
      const product = await productSchema.findById(productId);
      return product;
    } catch (error) {
      throw new BadRequestError(`${error.message}`);
    }
  };

  static searchProduct = async (data) => {
    try {
      const query = data;
      const regex = new RegExp(query, "i");
      const products = await productSchema.find({
        $or: [{ productName: regex }, { category: regex }],
      });
      return products;
    } catch (error) {
      throw new BadRequestError(`${error.message}`);
    }
  };
  static filterProduct = async (data) => {
    try {
      const categoryList = data;
      console.log(categoryList);
      const products = await productSchema.find({
        category: { $in: categoryList },
      });
      console.log(products);
      return products;
    } catch (error) {
      throw new BadRequestError(`${error.message}`);
    }
  };

  static deleteProduct = async (data) => {
    try {
      const { productId } = data;
      const product = await productSchema.findByIdAndDelete(productId);
      const cartProduct = await cartProductSchema.deleteMany({ productId });
      return product, cartProduct;
    } catch (error) {
      throw new BadRequestError(`${error.message}`);
    }
  };

  static productNotActive = async () => {
    try {
      const products = await productSchema.find({
        active: false,
        quantityInStock: { $gt: 0 },
      });
      return products;
    } catch (error) {
      throw new BadRequestError(`${error.message}`);
    }
  };
}
module.exports = ProductService;
