export default {
  data() {
    return {
      modal: null,
      qty: 1,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  watch: {
    qty() {
      if (typeof this.qty !== 'number') {
        this.qty = 1;
      }
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(document.getElementById('productModal'));
  },
  props: ['product'],
  template: `<div id="productModal" class="modal fade" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
            <button type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <img :src="product.imageUrl" class="img-fluid" alt="">
              </div>
              <div class="col-sm-6">
                <span class="badge bg-primary rounded-pill"></span>
                <p>商品描述：{{ product.description }}</p>
                <p>商品內容：{{ product.content }}</p>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 <span class="text-danger">{{ product.price }}</span> 元</div>
                <div>
                  <div class="input-group">
                    <input v-model.number="qty" type="number" class="form-control"
                    min="1" max="99">
                    <button @click="$emit('addToCart',product.id , qty)" type="button" class="btn btn-primary"
                    >加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
};
