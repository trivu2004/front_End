var app = angular.module("myApp", ["ngRoute"]);
app.controller("myCtrl", function ($scope, $rootScope, $routeParams, $http, $location) {
  $scope.products = [];
  //Đọc dữ liệu từ file json
  $http.get("data.json").then(function (reponse) {
    $scope.products = reponse.data;
    //Khúc này là chuyển từ id để lấy sản phẩm 
    $scope.detailPro = $scope.products.find(item => item.id == $routeParams.id);
  });
  $scope.dulieus = [];
  $http.get("dulieu.json").then(function (reponse) {
    $scope.dulieus = reponse.data;
    //Khúc này là chuyển từ id để lấy sản phẩm 
    $scope.detailPro1 = $scope.dulieus.find(item => item.id == $routeParams.id);
  });
  $scope.gia1= true;
  $scope.filterByPrice = function (product) {
    if (!$scope.gia || $scope.gia === "") {
      return true; // Trả về true nếu không có giá trị được chọn
    }
    if ($scope.gia === "1") {
      $scope.gia1 = false;
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
}
)
