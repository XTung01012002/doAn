const backendDomin = "http://localhost:8088";

const SummaryApi = {
  signUp: {
    url: `${backendDomin}/sign-up`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/sign-in`,
    method: "post",
  },
  userDetail: {
    url: `${backendDomin}/user-detail`,
    method: "get",
  },
  logOut: {
    url: `${backendDomin}/log-out`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomin}/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/update-user`,
    method: "put",
  },
  uploadProduct: {
    url: `${backendDomin}/upload-product`,
    method: "post",
  },
  allProducts: {
    url: `${backendDomin}/all-products`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/update-product`,
    method: "put",
  },
  categoryProductOne: {
    url: `${backendDomin}/category-productOne`,
    method: "get",
  },
  categoryWishProduct: {
    url: `${backendDomin}/category-wise-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/product-details`,
    method: "post",
  },
  addProductToCart: {
    url: `${backendDomin}/add-product-to-cart`,
    method: "post",
  },
  countProductInCart: {
    url: `${backendDomin}/count-product-in-cart`,
    method: "get",
  },
  addProductToCartView: {
    url: `${backendDomin}/add-product-to-cart-view`,
    method: "get",
  },
  updateQuantityInCart: {
    url: `${backendDomin}/update-quantity-in-cart`,
    method: "put",
  },
  deleteProductInCart: {
    url: `${backendDomin}/delete-product-in-cart`,
    method: "delete",
  },
  searchProduct: {
    url: `${backendDomin}/search-product`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/filter-product`,
    method: "post",
  },
  requestPasswordReset: {
    url: `${backendDomin}/request-password-reset`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomin}/reset-password`,
    method: "put",
  },
  checkPaymentQrCode: {
    url: `${backendDomin}/check-payment-qr-code`,
    method: "post",
  },
  deleteAllProductInCart: {
    url: `${backendDomin}/delete-all-product-in-cart`,
    method: "delete",
  },
};

export default SummaryApi;
