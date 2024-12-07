const backendDomin = "http://localhost:8088";

const SummaryApi = {
  signUp: {
    url: `${backendDomin}/api/user/sign-up`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/user/sign-in`,
    method: "post",
  },
  userDetail: {
    url: `${backendDomin}/api/user/user-detail`,
    method: "get",
  },
  logOut: {
    url: `${backendDomin}/api/user/log-out`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomin}/api/user/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/user/update-user`,
    method: "put",
  },
  uploadProduct: {
    url: `${backendDomin}/api/product/upload-product`,
    method: "post",
  },
  allProducts: {
    url: `${backendDomin}/api/product/all-products`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/product/update-product`,
    method: "put",
  },
  categoryProductOne: {
    url: `${backendDomin}/api/product/category-productOne`,
    method: "get",
  },
  categoryWishProduct: {
    url: `${backendDomin}/api/product/category-wise-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product/product-details`,
    method: "post",
  },
  addProductToCart: {
    url: `${backendDomin}/api/cartproduct/add-product-to-cart`,
    method: "post",
  },
  countProductInCart: {
    url: `${backendDomin}/api/cartproduct/count-product-in-cart`,
    method: "get",
  },
  addProductToCartView: {
    url: `${backendDomin}/api/cartproduct/add-product-to-cart-view`,
    method: "get",
  },
  updateQuantityInCart: {
    url: `${backendDomin}/api/cartproduct/update-quantity-in-cart`,
    method: "put",
  },
  deleteProductInCart: {
    url: `${backendDomin}/api/cartproduct/delete-product-in-cart`,
    method: "delete",
  },
  searchProduct: {
    url: `${backendDomin}/api/product/search-product`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/product/filter-product`,
    method: "post",
  },
  requestPasswordReset: {
    url: `${backendDomin}/api/user/request-password-reset`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomin}/api/user/reset-password`,
    method: "put",
  },
  checkPaymentQrCode: {
    url: `${backendDomin}/check-payment-qr-code`,
    method: "post",
  },
  deleteAllProductInCart: {
    url: `${backendDomin}/api/cartproduct/delete-all-product-in-cart`,
    method: "delete",
  },
  getAllNotConfirm: {
    url: `${backendDomin}/api/paymentinfo/all-not-confirm-order`,
    method: "get"
  },
  getAllCanceledOrder: {
    url: `${backendDomin}/api/paymentinfo/all-canceled-order-sale`,
    method: "get"
  },
  createCommentOrder: {
    url: `${backendDomin}/api/product/createComment`
  },
  postCreateCart: {
    url: `${backendDomin}/api/paymentinfo/create`,
    method: 'post'
  },
  postCreateOrder: {
    url: `${backendDomin}/api/paymentinfo/create`,
  },
  postShipInfo: {
    url: `${backendDomin}/api/shippinginfo/create`,
  },
  getAllOrderShipInfor: {
    url: `${backendDomin}/api/shippinginfo/all`
  },
  putProductStaff: {
    url: `${backendDomin}/api/product/update-product`
  },
  putUpdateActive: {
    url: `${backendDomin}/api/product/update-active`
  },
  postUpProducts: {
    url: `${backendDomin}/api/product/upload-products`
  },
  getAllProductCanceledOrder: {
    url: `${backendDomin}/api/paymentinfo/all-canceled-order`
  },
  deleteProductCanceled: {
    url: `${backendDomin}/api/paymentinfo/deleteCanceledOrder`
  },
  putCancelOrder: {  // api hủy đơn
    url: `${backendDomin}/api/paymentinfo/cancel-order`
  },
  postInventoryreceiptCreate: { // tạo phiếu
    url: `${backendDomin}/api/inventoryreceipt/create`
  },
  getInventoryreceipt: {
    url: `${backendDomin}/api/inventoryreceipt/all`
  },
  getStatistical: { // lọc thống kê
    url: `${backendDomin}/api/statistics/range-statistics`
  },
  getDelivered: {
    url: `${backendDomin}/api/paymentinfo/all-ShippingOrder`
  },
  getRate: {
    url: `${backendDomin}/api/paymentinfo/all-Delivered-Orders-ForReview`
  },
  createQr: {
    url: `${backendDomin}/api/paymentinfo/createQr`
  },
  paymentOrder: {
    // thanh toan nhan hang
    url: `${backendDomin}/api/paymentinfo/choosePaymentMethod`
  },
  getCommentProduct: {
    url: `${backendDomin}/api/product/comment`
  },
  getallcancelordersale: {
    url: `${backendDomin}/api/paymentinfo/all-cancel-order-sale`
  },
  checkTransactionStatus: {
    // kiểm tra trạng thái giao dịch
    url: `${backendDomin}/api/paymentinfo/check`
  },
  fetchDataAccept: {
    url: `${backendDomin}/api/paymentinfo/all-not-confirm-order-sale`
  },
  putInfoOrder: {
    url: `${backendDomin}/api/paymentinfo/update`
  },
  getCategory: {
    url: `${backendDomin}/api/product/category`
  },
  deleteInCart: {

    url: `${backendDomin}/api/cartproduct/delete-all-product-in-cart`
  },
  getAllOrdered: {
    url: `${backendDomin}/api/paymentinfo/all-Delivered-Orders`
  },
  putUpdateShippingStatus: {
    url: `${backendDomin}/api/shippinginfo/updateShippingStatus`
  }
};

export default SummaryApi;
