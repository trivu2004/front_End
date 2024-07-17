let cart = [];

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';

  let totalPrice = 0;

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(listItem);

    totalPrice += item.price;
  });

  // Display total price
  const totalElement = document.createElement('li');
  totalElement.textContent = `Total: $${totalPrice}`;
  cartList.appendChild(totalElement);
}
