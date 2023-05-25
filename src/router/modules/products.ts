export default {
  path: "/products",
  meta: {
    title: "商品"
  },
  children: [
    {
      path: "/products/index",
      name: "Products",
      component: () => import("@/views/products/index.vue"),
      meta: {
        title: "商品"
      }
    },
    {
      path: "/products/edit",
      name: "EditProduct",
      component: () => import("@/views/products/edit.vue"),
      meta: {
        title: "新增"
      }
    }
  ]
};
