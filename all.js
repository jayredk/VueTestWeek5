import userProductModal from './userProductModal.js';

const api_url = 'https://vue3-course-api.hexschool.io';
const api_path = 'jayredk-hex';

const app = Vue.createApp({
  data() {
    return {
      products: [],
      product: {},
      carts: {},
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  components: {
    userProductModal,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      axios
        .get(`${api_url}/v2/api/${api_path}/products/all`)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
    getProduct(id) {
      this.isLoading = true;
      axios
        .get(`${api_url}/v2/api/${api_path}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
          this.$refs.productModal.openModal();
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
    getCart() {
      this.isLoading = true;
      axios
        .get(`${api_url}/v2/api/${api_path}/cart`)
        .then((res) => {
          this.carts = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      axios
        .post(`${api_url}/v2/api/${api_path}/cart`, { data: { product_id: id, qty: qty } })
        .then((res) => {
          this.getCart();
          this.isLoading = false;
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    },
    editCart(cartId, id, qty) {
      this.isLoading = true;
      axios
        .put(`${api_url}/v2/api/${api_path}/cart/${cartId}`, { data: { product_id: id, qty: qty } })
        .then((res) => {
          this.getCart();
          this.isLoading = false;
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    },
    deleteCart(cartId) {
      this.isLoading = true;
      axios
        .delete(`${api_url}/v2/api/${api_path}/cart/${cartId}`)
        .then((res) => {
          this.getCart();
          this.isLoading = false;
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    },
    deleteAllCart() {
      this.isLoading = true;
      axios
        .delete(`${api_url}/v2/api/${api_path}/carts`)
        .then((res) => {
          this.getCart();
          this.isLoading = false;
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    },
    checkOut() {
      axios
        .post(`${api_url}/v2/api/${api_path}/order`, { data: this.form })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.message);
        });
    },
    isPhoneNumber(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
});

VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('numeric', VeeValidateRules['numeric']);
VeeValidate.defineRule('required', VeeValidateRules['required']);
VeeValidate.defineRule('min', VeeValidateRules['min']);
VeeValidate.defineRule('max', VeeValidateRules['max']);

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: false, // 調整為輸入字元立即進行驗證
});

app.component('loading', VueLoading.Component);
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount('#app');

// 表單、loading 未做
