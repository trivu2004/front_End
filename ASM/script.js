document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");
    const cartContainer = document.getElementById("cart");

    // Thêm sự kiện click để thêm sản phẩm vào giỏ hàng
    productsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            addToCart(event.target.dataset.productId, event.target.dataset.productName);
        }
    });

    // Hàm để thêm sản phẩm vào giỏ hàng
    function addToCart(productId, productName) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `<p>${productName}</p>`;
        cartContainer.appendChild(cartItem);
    }
});
 


