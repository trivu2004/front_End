function addToCart() {
    // Assuming 'this.card' is defined somewhere in your code
    let cartJson = JSON.stringify(this.card);
    sessionStorage.setItem('cart', cartJson);

    Swal.fire({
      title: 'Thêm vào giỏ hàng thành công',
      icon: 'success'
    });
  }