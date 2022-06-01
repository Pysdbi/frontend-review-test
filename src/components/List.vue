<!-- FIXME неправильный импорт Vuex. Нужно использовать модули-->
<!--<script src="../store/index.js"></script>-->
<template>
	<div class="product-list">
		<!-- Добавляем key -->
		<div class="card" v-for="product in products" :key="product.id">
			<p class="card-title">{{ product.title }}</p>
			<img class="card-image" :src="product.image" alt="">
			<p class="card-price">Цена: {{ product.price }} {{ currency }}</p>

			<div>
				<!-- FIXME Обращение по ref не рекомендуется, лучше использовать v-model -->
				<!-- <input type="number" ref="amount" :id="product.id"> -->
				<input type="number" v-model.number="productsAmount[product.id]">
				<span>кг</span>
			</div>

			<button @click="addToCart(product)"> В корзину</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		currency: String,
	},
	data() {
		return {
			pricesMonitoring: null,

			// FIXME вынесен в STORE
			// products: [],

			// Значения количества из карточек продуктов
			productsAmount: {}
			// TODO если товар при обновлении пропал - нужно удалить запись о amount
		};
	},
	computed: {
		// FIXME Правильней сделать будет стилями
		// cardsWidth() {
		//   let width = window.innerWidth;
		//   let count = 1;
		//   if (width > '840px') {
		//     count = 3;
		//   } else if ((width > '420px' && width < '840px')) {
		//     count = 2;
		//   }
		//
		//   return 100 / count;
		// },
		products: (ctx) => ctx.$store.getters['products']
	},
	methods: {
		startPricesMonitoring() {
			this.stopPricesMonitoring()
			this.pricesMonitoring = setInterval(this.getList, 2000)
		},
		stopPricesMonitoring(){
			if (this.pricesMonitoring) clearInterval(this.pricesMonitoring)
		},
		async getList() {
			await this.$store.dispatch('getProductsList');
		},

		addToCart(product) {
			if (!this.productsAmount[product.id]) return
			// FIXME вынесли логику указа количества в v-model
			// let amount = this.$refs.amount.find((input) => input.id === product.id).value;
			let data = {
				...product,
				amount: this.productsAmount[product.id],
			};
			delete this.productsAmount[product.id]
			/* FIXME Мы используем Store, для этого будем
				  		 вызывать commit на добавление продукта в корзину.
				  		 Если не использовать Store, то делать следует через emit,
				  		 а не через обращение к родителю через ref.
			 */
			// this.$parent.cart.push(data);
			this.$store.commit('addToCard', data)
		},
	},
	// Запускаем цикл обновления цены
	created () {
		this.startPricesMonitoring()
	},
	// Отключаем перед уходом со страницы
	beforeDestroy () {
		this.stopPricesMonitoring()
	}
};
</script>

<!--
  Можно было сделать и с помощью flex. Но страницы товаров могут масштабироваться,
	grid намного легче подтается масштабированию
-->
<style>
.product-list {
	padding: 10px;
	display: grid;
	grid-template-columns: repeat(1, 1fr);
}
@media screen and (min-width: 420px) {
	.product-list {
		grid-template-columns: repeat(2, 1fr);
	}
}
@media screen and (min-width: 841px) {
	.product-list {
		grid-template-columns: repeat(3, 1fr);
	}
}

.card {
	display: inline-block;
	width: 100%;
	border: 1px solid #908888;
	border-radius: 5px;
	text-align: center;
	padding: 10px;
}

.card-image {
	width: 100%;
}

button {
	padding: 5px;
	margin: 5px;
}

</style>
