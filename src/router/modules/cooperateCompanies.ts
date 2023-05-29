export default {
  path: "/companies",
  meta: {
    title: "廠商管理"
  },
  children: [
    {
      path: "/companies/index",
      name: "Companies",
      component: () => import("@/views/companies/index.vue"),
      meta: {
        title: "所有廠商"
      }
    },
    {
      path: "/companies/create",
      name: "CreateCompany",
      component: () => import("@/views/companies/create.vue"),
      props: true,
      meta: {
        title: "新增廠商"
      }
    }
    // {
    //   path: "/products/update/:id?",
    //   name: "EditProduct",
    //   component: () => import("@/views/products/update.vue"),
    //   props: true,
    //   meta: {
    //     title: "編輯",
    //     showLink: false,
    //     keepAlive: false
    //   }
    // },
    // {
    //   path: "/products/create",
    //   name: "CreateProduct",
    //   component: () => import("@/views/products/create.vue"),
    //   props: true,
    //   meta: {
    //     title: "新增商品"
    //   }
    // }
  ]
};
