import api from '../../api/products.js';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],

    // TODO Бизнес логику корзины вынести в отдельный модуль vuex
    cart: [],
  },
  getters: {
    products: (s) => s.products,
    getPriceProduct: (s) => (id) =>
      s.products.find(x=>x.id === id).price,

    // Получаяем цену исходя из актуального списка продуктов,
    // добавляем поле общей цены
    cartReverse: (s,g) =>
      s.cart.map(x=>({
        ...x,
        totalPrice: g.getPriceProduct(x.id) * x.amount,
        price: g.getPriceProduct(x.id),
      })).reverse(),
  },
  mutations: {
    setProducts: (s, data) => s.products = data,

    addToCard: (s, data) => {
      // Не нужно добавлять новый продукт в корзину каждый раз,
      // можно просто изменять количество и цену
      if (s.cart.map(x => x.id).includes(data.id)) {
        const currentCart = s.cart.find(x => x.id === data.id)
        currentCart.amount += data.amount
        currentCart.price = data.price
      }
      else s.cart.push(data)
    },
    removeFromCart: (s, id) => s.cart = s.cart.filter(x => x.id !== id),
  },
  actions: {
    // FIXME уберем возвращение списка продуктов
    //       и запишем в хранилище данного модуля через мутацию
    async getProductsList(ctx, data) {
      // return api.getProductsList();
      ctx.commit('setProducts', await api.getProductsList())
    },
  },
  modules: {}
})
