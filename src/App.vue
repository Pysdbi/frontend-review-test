<template>
  <div id="app">
    <Header :cart="cart" :currency="currency"></Header>
		<!--
		 TODO Здесь в лист должен передаваться список products в качестве props,
		 			и на добавление продукта в корзину emit.
		 			В рамках указанного времени оставим так.
		-->
    <List :currency="currency"/>
    <Cart
			:cart="cart"
			@removeFromCart="(id) => $store.commit('removeFromCart', id)"
		/>
  </div>
</template>

<script>
// FIXME Лучше использовать @/components вместо ./components
import Header from './components/Header.vue';
import List from './components/List.vue';
import Cart from './components/Cart.vue';

export default {
  name: 'App',
  data() {
    return {
			// TODO вынесено в STORE
      // cart: [],
      currency: 'VGTB',
    };
  },
	computed: {
		cart: (ctx) => ctx.$store.getters['cartReverse']
	},
  components: {
    Header,
    List,
    Cart,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
