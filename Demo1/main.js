var app = angular.module("myApp", ["ngRoute"]);
app.controller("myCtrl", function ($scope, $rootScope, $routeParams, $http, $location) {

  $scope.products = [];

  //Đọc dữ liệu từ file json
  $http.get("data.json").then(function (reponse) {
    $scope.products = reponse.data;
    //Khúc này là chuyển từ id để lấy sản phẩm 
    $scope.detailPro = $scope.products.find(item => item.id == $routeParams.id);
  });


  // Them san pham vao gio hang


  $scope.addCart = function (product) {
    // Kiểm tra giỏ hàng đã khởi tạo chưa, nếu chưa thì khởi tạo
    if (typeof $rootScope.cart == 'undefined') {
      $rootScope.cart = [];
    };
    // Tìm sản phẩm trong giỏ hàng
    var index = $rootScope.cart.findIndex((item) => item.id == product.id);
    if (index == -1) {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
      product.quantity = 1;
      $rootScope.cart.push(product);
      $rootScope.giohang = true;
    } else {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng sản phẩm đó lên 1
      $rootScope.cart[index].quantity++;
      updateTotalQuantityInCart();
    }
    // Cập nhật tổng số lượng trong giỏ hàng
    updateTotalQuantityInCart();
    // Cập nhật tổng số lượng trong giỏ hàng của scope
    $scope.cartCount();
  }


  function updateTotalQuantityInCart() {
    var totalQuantity = 0;
    if ($rootScope.cart) {
      for (var i = 0; i < $rootScope.cart.length; i++) {
        var product = $rootScope.cart[i];
        totalQuantity += product.quantity || 0;
      }
    }
    $scope.totalQuantityInCart = totalQuantity;
  }
  updateTotalQuantityInCart();

  $scope.updateCartTotal = function () {
    updateTotalQuantityInCart();
  };

  $scope.cartCount = function () {
    $rootScope.tongSoLuong = 0;
    for (let i = 0; i < $scope.cart.length; i++) {
      $rootScope.tongSoLuong += $scope.cart[i].quantity;
    }
  };
  //   $scope.cartCount = function () {
  //     // Kiểm tra xem giỏ hàng có tồn tại không
  //     if ($rootScope.cart == null) {
  //         return 0;
  //     }

  //     // Sử dụng đối tượng để theo dõi các sản phẩm trong giỏ hàng và số lượng của chúng
  //     var cartItems = {};

  //     // Sử dụng angular.forEach để lặp qua các sản phẩm trong giỏ hàng
  //     angular.forEach($rootScope.cart, function (product) {
  //         var productId = product.id;
  //         cartItems[productId] = (cartItems[productId] || 0) + 1;
  //     });

  //     // Tính tổng số lượng các sản phẩm trong giỏ hàng
  //     var totalCount = 0;
  //     angular.forEach(cartItems, function (count) {
  //         totalCount += count;
  //     });

  //     return totalCount;
  // };




  $scope.removeCart = function (productId) {
    var index = $scope.cart.findIndex(function (item) {
      return item.id === productId;
    });

    if (index !== -1) {
      $scope.cart.splice(index, 1);
      updateTotalQuantityInCart();
      $rootScope.giohang = false;
      $scope.calculateTotalAmount();
      $scope.$apply();
    }

  }



  $scope.searchs = function () {
    $rootScope.searchPro = $scope.search;
    console.log($scope.searchPro);
  }

  $scope.sort1 = 'sx';
  $scope.hthi = 'hthi'
  $scope.calculateTotalAmount = function () {
    $scope.cartCount();
    var totalAmount = 0;
    if ($rootScope.cart) {
      for (var i = 0; i < $rootScope.cart.length; i++) {
        var product = $rootScope.cart[i];
        totalAmount += product.quantity * product.price;
      }
    }

    return totalAmount;
  };

  $scope.gia = true;
  $scope.filterByPrice = function (product) {
    if (!$scope.gia || $scope.gia === "") {
      return true; // Trả về true nếu không có giá trị được chọn
    }

    if ($scope.gia === "1") {
      return product.price >= 1000000 && product.price <= 5000000;

    } else if ($scope.gia === "2") {
      return product.price >= 2000000 && product.price <= 10000000;
    } else if ($scope.gia === "3") {
      return product.price >= 5000000 && product.price <= 10000000;
    } else if ($scope.gia === "4") {
      return product.price <= 10000000;
    }
    else if ($scope.gia === "5") {
      return product.price >= 10000000;
  } else {
      return true;
    }
  };




  $scope.thongbao = function () {
    // Sử dụng SweetAlert2 để hiển thị thông báo
    Swal.fire('Thông báo', 'Thanh toán thành công!', 'success');

  };
  $scope.themvao = function () {
    // Sử dụng SweetAlert2 để hiển thị thông báo
    Swal.fire('Thông báo', 'Thêm vào giỏ hàng thành công!', 'success');
  };

  $scope.registerUser = function () {

    var emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    if ($scope.email && $scope.password) {
      if (emailRegex.test($scope.email)) {
        Swal.fire('Thông báo', 'Đăng ký thành công!', 'success');
      } else {
        Swal.fire('Thông báo', 'Email không hợp lệ! Vui lòng nhập đúng định dạng Gmail.', 'error');
      }
    } else {
      Swal.fire('Thông báo', 'Vui lòng nhập đầy đủ thông tin!', 'error');
    }
  };


  // $scope.registerUser = function () {
  //   if (!$scope.products1) {
  //       $scope.products1 = [];
  //   }

  //   if ($scope.email && $scope.password) {
  //       var newUser = {
  //           username: $scope.email,
  //           password: $scope.password
  //       };

  //       $scope.products1.push(newUser);

  //       var jsonData = JSON.stringify($scope.products1, null, 2);
  //       var blob = new Blob([jsonData], { type: 'application/json' });
  //       var a = document.createElement('a');
  //       a.href = window.URL.createObjectURL(blob);
  //       a.download = 'account.json';
  //       a.click();


  //       Swal.fire('Thông báo', 'Đăng ký thành công!', 'success');
  //   } else {
  //       Swal.fire('Thông báo', 'Vui lòng nhập đầy đủ thông tin!', 'error');
  //   }
  // };



  $rootScope.logout = function () {
    Swal.fire('Thông báo', 'Đăng xuất thành công!', 'success');
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  };

  // $rootScope.loginan = false;
  // $rootScope.trangthai = false;


  $scope.test = function () {
    $http.get("account.json").then(function (response) {
      $scope.products1 = response.data;

      $scope.checkLog = true;
      console.log($scope.products1);

      var isFieldEmpty = false;
      var loginSuccess = false;

      $scope.products1.forEach(element => {
        console.log("Email from ng-model:", $scope.info.email);
        console.log("Email from ng-model:", $scope.info.password);

        if ($scope.info.email == undefined || $scope.info.password == undefined) {
          isFieldEmpty = true;
        }

        if ($scope.info.email == element.username && $scope.info.password == element.password) {
          loginSuccess = true;


          console.log("dđ");
          // $rootScope.taikhoan = $scope.email;
        }
      });

      if (isFieldEmpty) {
        Swal.fire('Thông báo', 'Vui lòng không để trống!', 'warning');
      } else if (loginSuccess) {
        $scope.checkLog = false;
        Swal.fire('Thông báo', 'Đăng nhập thành công!', 'success');
        $rootScope.tensession = $scope.info.email;
        $location.path("/body");
        $rootScope.trangthai = true;
      } else {
        Swal.fire('Thông báo', 'Đăng nhập thất bại!', 'error');
      }
    });
  };

  $scope.login = function () {
    var check = checkLogin($scope.info.email, $scope.info.password);
    if (check != null) {
      Swal.fire('Thông báo', 'Đăng nhập thành công!', 'success');
      $rootScope.tensession = $scope.info.email;
      $location.path("/body");
      $rootScope.trangthai = true;
      // Thực hiện các hành động cần thiết sau khi đăng nhập thành công
    } else {
      Swal.fire('Thông báo', 'Nhập sai tài khoản hoặc mật khẩu!', 'error');
    }
  };

  // Định nghĩa hàm checkLogin()
  function checkLogin(user, pass) {
    for (let index = 0; index < $scope.list_acc.length; index++) {
      if ($scope.list_acc[index].email == user && $scope.list_acc[index].password == pass) {
        return $scope.list_acc[index];
      }
    }
    return null;
  }
  $scope.agree = false;

  $scope.products1 = [];
  $scope.list_acc = [];
  $scope.info = [];

  // Hàm đăng ký
  $scope.register = function () {
    // Kiểm tra xem email và password có được cung cấp không
    if (!$scope.info.email || !$scope.info.password || !$scope.info.passwordnew) {
      Swal.fire('Thông báo', 'Vui lòng không để trống!', 'warning');
      return; // Kết thúc hàm nếu có trường trống
    }

    if ($scope.info.password && $scope.agree) {
      $scope.list_acc.push({
        email: $scope.info.email,
        password: $scope.info.password,
        passwordnew: $scope.info.passwordnew,

      });
      Swal.fire('Thông báo', 'Đăng kí thành công!', 'success');
      $location.path("/login");
    } else {
      Swal.fire('Thông báo', 'Đăng kí thất bại!', 'error');
    }
    // Thêm thông tin đăng ký mới vào danh sách tài khoản




    // Lưu danh sách tài khoản vào localStorage
    localStorage.setItem("list_taikhoan", angular.toJson($scope.list_acc));

    // In ra danh sách tài khoản đã đăng ký trong console (optional)
    console.log($scope.list_acc);
  };


  // // Hàm đăng nhập
  // $scope.login1 = function () {
  //   var isFieldEmpty = false;
  //   var loginSuccess = false;

  //   // Kiểm tra xem các trường đăng nhập có trống không
  //   if ($scope.email == undefined || $scope.password == undefined) {
  //     isFieldEmpty = true;
  //     Swal.fire('Thông báo', 'Vui lòng không để trống!', 'warning');
  //   }

  //   // Kiểm tra xem tài khoản có tồn tại và mật khẩu đúng không
  //   if ($scope.products1) { // Kiểm tra xem products1 đã được khởi tạo chưa
  //     $scope.products1.forEach(element => {
  //       if ($scope.email == element.username && $scope.password == element.password) {
  //         loginSuccess = true;
  //       }
  //     });
  //   }

  //   // Xử lý kết quả đăng nhập
  //   if (!isFieldEmpty && loginSuccess) {
  //     Swal.fire('Thông báo', 'Đăng nhập thành công!', 'success');
  //   } else {
  //     Swal.fire('Thông báo', 'Đăng nhập thất bại!', 'error');
  //   }
  // };




  $scope.doimatkhau = function () {
    console.log("aaa");
    console.log($scope.info.email);

    for (let i = 0; i < $scope.products1.length; i++) {
      if ($scope.products1[i].info.username == $rootScope.taikhoan) {
        $scope.products1[i].info.password = $scope.matkhau;
        console.log($scope.matkhau);

        Swal.fire('Thông báo', 'Đổi mật khẩu thành công!', 'success');
        window.location.href = "dangnhap.html";
      }
    }
  };

}
);
//Điều hướng trang
app.config(function ($routeProvider) {
  $routeProvider
    .when("/about", {
      templateUrl: "about.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/home", {
      templateUrl: "home1.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/news", {
      templateUrl: "news.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/login", {
      templateUrl: "login.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/doimatkhau", {
      templateUrl: "doimatkhau.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/dangky", {
      templateUrl: "dangky.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/thanhtoan", {
      templateUrl: "thanhtoan.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/detail/:id", {
      templateUrl: "chitietsanpham.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/card2", {
      templateUrl: "dulichnuocngoai.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/cart", {
      templateUrl: "cart.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/thailan", {
      templateUrl: "dulichthailan.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/hanoi", {
      templateUrl: "dulichhanoi.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/giohang", {
      templateUrl: "giohang.html?" + Math.random(),
      controller: "myCtrl",
    })
    .when("/hcm", {
      templateUrl: "dulichhcm.html?" + Math.random(),
      controller: "myCtrl",
    })
    .otherwise({
      templateUrl: "home1.html",
      controller: "myCtrl",
    });
});