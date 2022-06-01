<script>
export default {
	name: 'Header',
	props: {
		cart: Array,
		// FIXME Неиспользованные переменные
		// required: true,
		// default: {},

		currency: String,
	},
	data() {
		return {
			// FIXME вынесем в cartPrice в computed свойство
			// cartPrice: 0,
		};
	},
	/* FIXME Для случаев, когда нужно высчитывать значение
					при изменении параметров, лучше использовать
					computed (вычисляемые) свойства. Это локаничней и производительнее
	 */
	// watch: {
	// 	cart(cart) {
	// 		let val = 0;
	// 		cart.forEach((item) => {
	// 			val += item.price * item.amount;
	// 		});
	// 		this.cartPrice = val;
	// 	},
	// },
	computed: {
		cartPrice: (ctx) => ctx.cart.reduce((count, item) => count + (item.price * +item.amount), 0)
	},
	// Вынесение template в render-function
	render: function (h) {
		console.log(this)
		return h(
			'div',
			{class: ['header']},
			[h('h3', `Товаров в корзине на: ${this.cartPrice} ${this.currency}`)]
		)
	}
}
</script>

<!--
FIXME В данном случае использовать scope
			для блока style не требуется,
			это лишь занимает процессорное время
-->
<style>
.header {
	padding: 10px;
	background: #e5e5e5;
}
</style>

<!--
 FIXME В данном случае это довольно простой
 			 шаблон и для производительности можно
 			 вынести в render-function.
 -->
<!--<template>-->
<!--	<div class="header">-->
<!--		<h3>Товаров в корзине на: {{ cartPrice }} {{ currency }}</h3>-->
<!--	</div>-->
<!--</template>-->
