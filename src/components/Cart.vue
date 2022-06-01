<template>
	<div class="cart-list">
		<!--
		FIXME Является хорошим тоном указывать атрибут key в конструкции v-for
				Если key не указан, Vue старается обновить и повторно использовать как можно больше
				элементов. Если атрибут указан, Vue изменяет порядок следования элементов,
				основываясь на изменении порядка ключей.
		-->
		<div
			v-for="(item, idx) in cart"
			:key="idx"
			style="display:flex;gap:1rem;align-items:center;"
		>
			<img :src="item.image" style="width: 80px;" alt="">
			<p v-text="item.title"/>
			<div>Кол-во: {{item.amount}}</div>
			<div>Цена за один: {{item.price}}</div>
			<div>Цена за все: {{item.totalPrice}}</div>
			<button @click="$emit('removeFromCart', item.id)">Удалить</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		cart: Array
	},
	emits: ['removeFromCart'],
	computed: {
		/*
		FIXME В языке JS принято использовать стиль camelCase.
				Транслит использовать не рекомендуется, считаеться плохим тоном среди разработчиков.
				"Список для рендера" не очевидное название. cartItems более привычное и понятное.
				Мы принимаем сразу принимаем список в правильном для нас порядке
		 */
		// spisok_dlya_rendera() {
		// 	return this.cart;
		// },
	},
};
</script>

<style>

</style>
