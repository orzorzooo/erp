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
        title: "所有商品"
      }
    },
    {
      path: "/products/update/:id?",
      name: "EditProduct",
      component: () => import("@/views/products/update.vue"),
      props: true,
      meta: {
        title: "編輯",
        showLink: false,
        keepAlive: false
      }
    },
    {
      path: "/products/create",
      name: "CreateProduct",
      component: () => import("@/views/products/create.vue"),
      props: true,
      meta: {
        title: "新增商品"
      }
    }
  ]
};
