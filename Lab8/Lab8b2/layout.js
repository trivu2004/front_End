// Khởi tạo module AngularJS với tên "myapp" và phụ thuộc vào "ngRoute"
var app = angular.module("myapp", ["ngRoute"]);

// Cấu hình định tuyến cho ứng dụng
app.config(function ($routeProvider) {
    $routeProvider
        // Khi URL là "/home", sẽ sử dụng "bai2/home.html" làm template
        .when("/home", {
            templateUrl: "about.html"+ Math.random()
        })
        // Tương tự, đối với các URL khác như "/about", "/feedback", v.v...
        .when("/about", {
            templateUrl: "bai2/about.html"
        })
        .when("/feedback", {
            templateUrl: "feedback.html"
        })
        .when("/account/login", {
            templateUrl: "bai2/account/login.html"
        })
        .when("/account/register", {
            templateUrl: "bai2/account/register.html"
        })
        .when("/account/change", {
            templateUrl: "bai2/account/change.html"
        })
        .when("/account/profile", {
            templateUrl: "bai2/account/profile.html"
        })
        .when("/account/orders", {
            templateUrl: "bai2/account/orders.html"
        })
        .when("/account/products", {
            templateUrl: "bai2/account/products.html"
        })
        // Khi URL có dạng "/category/:id", sẽ sử dụng "bai2/ProductList.html" làm template
        // và "categoryCtrl" làm controlle
        .when("/category/:id", {
            templateUrl: "ProductList.html",
            controller: "categoryCtrl"
        })
        
        .when("/supplier/:id", {
            templateUrl: "bai2/ProductList.html",
            controller: "supplierCtrl"
        })
        .when("/special/:id", {
            templateUrl: "bai2/ProductList.html",
            controller: "specialCtrl"
        })
        // Nếu URL không khớp với bất kỳ đường dẫn nào đã được định nghĩa, sẽ chuyển hướng đến "/home"
        .otherwise({
            redirectTo: "/home"
        });
});

// Định nghĩa controller "categoryCtrl"
app.controller("categoryCtrl", function ($scope, $routeParams) {
    // Thiết lập tiêu đề và id cho $scope dựa trên $routeParams
    $scope.title = "CATEGORY MANAGER";
    $scope.id = $routeParams.id;
});

// Tương tự, định nghĩa controller "supplierCtrl" và "specialCtrl"
app.controller("supplierCtrl", function ($scope, $routeParams) {
    $scope.title = "SUPPLIER MANAGER";
    $scope.id = $routeParams.id;
});

app.controller("specialCtrl", function ($scope, $routeParams) {
    $scope.title = "SPECIAL MANAGER";
    $scope.id = $routeParams.id;
});

// Định nghĩa hành vi khi bắt đầu, thành công hoặc thất bại trong việc thay đổi đường dẫn
app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        // Khi bắt đầu thay đổi đường dẫn, thiết lập $rootScope.loading thành true
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        // Khi thay đổi đường dẫn thành công, thiết lập $rootScope.loading thành false
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError', function () {
        // Khi có lỗi xảy ra trong quá trình thay đổi đường dẫn, thiết lập $rootScope.loading thành false và hiển thị thông báo lỗi
        $rootScope.loading = false;
        alert("Lỗi");
    });
});
