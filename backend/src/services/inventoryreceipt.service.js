const { BadRequestError } = require("../responseHandle/error.response");
const { inventoryReceiptSchema } = require("../models/inventoryreceipt.model");
const { productSchema } = require("../models/product.model");

class InventoryReceiptService {
  static createInventory = async (data, req) => {
    const sessionUser = req.user;
    const { productList, receiptDate, supplier, note } = data;

    // Kiểm tra tồn tại của tất cả sản phẩm trong productList và tính tổng
    const productIds = productList.map((item) => item.productId);
    const products = await productSchema.find({ _id: { $in: productIds } });

    if (products.length !== productList.length) {
      throw new BadRequestError("Một hoặc nhiều sản phẩm không tồn tại");
    }

    let total = 0;
    // Tính tổng số tiền
    productList.forEach((item) => {
      total += item.quantity * item.price;
    });
    console.log(total);
    // Tạo phiếu nhập kho
    const inventoryReceipt = await inventoryReceiptSchema.create({
      productList,
      totalAmount: total,
      receiptDate,
      supplier,
      note,
      creator: sessionUser,
    });
    console.log(inventoryReceipt);

    // Cập nhật số lượng sản phẩm trong kho song song
    const updatePromises = productList.map(async (item) => {
        
      const product = products.find((p) => p._id.toString() === item.productId);
      product.quantity += item.quantity;
      product.priceInventory = item.price;
      product.quantityInStock += item.quantity;
      await product.save();
    });

    // Chạy tất cả các promise cập nhật kho song song
    await Promise.all(updatePromises);

    return inventoryReceipt;
  };

  static update = async (data, id) => {
    const { productList, receiptDate, supplier, note } = data;
    let total = 0;
    for (let i = 0; i < productList.length; i++) {
      const checkProduct = await productSchema.findById(
        productList[i].productId
      );
      if (!checkProduct) {
        throw new BadRequestError("Sản phẩm không tồn tại");
      }
    }
    for (let i = 0; i < productList.length; i++) {
      total += productList[i].quantity * productList[i].price;
    }
    const inventoryReceipt = await inventoryReceiptSchema.findByIdAndUpdate(
      id,
      {
        productList,
        totalAmount: total,
        receiptDate,
        supplier,
        note,
      }
    );
    return inventoryReceipt;
  };

  static delete = async (id) => {
    const inventoryReceipt = await inventoryReceiptSchema.findByIdAndDelete(id);
    return inventoryReceipt;
  };

  static getAll = async () => {
    const inventoryReceipt = await inventoryReceiptSchema.find();
    return inventoryReceipt;
  };
}

module.exports = InventoryReceiptService;