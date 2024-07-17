// app.js
var app = angular.module("myapp", ["ngRoute"]); 

app.config(function ($routeProvider) { 
    $routeProvider
    .when("/home", { 
        templateUrl : "home.html",
       
    })
    .when("/about", {
        templateUrl : "about.html",
        
    })
    .when("/contact", {
        templateUrl : "contact.html",
       
    })
    .otherwise({
        redirectTo: "/home" // Nếu URL không khớp với bất kỳ đường dẫn nào đã được định rõ, chuyển hướng người dùng về trang "home".
    });
});

app.run(function ($rootScope) { // Định nghĩa một số hành vi khi thay đổi đường dẫn.
    $rootScope.$on('$routeChangeStart', function () { // Khi bắt đầu thay đổi đường dẫn...
        $rootScope.loading = true; // ...đặt biến "loading" thành true.
    });
    $rootScope.$on('$routeChangeSuccess', function () { // Khi thay đổi đường dẫn thành công...
        $rootScope.loading = false; // ...đặt biến "loading" thành false.
    });
    $rootScope.$on('$routeChangeError', function () { // Khi có lỗi xảy ra trong quá trình thay đổi đường dẫn...
        $rootScope.loading = false; // ...đặt biến "loading" thành false...
        alert("Lỗi, không tải được template"); // ...và hiển thị thông báo lỗi.
    });
});

app.controller('productCtrl', function($rootScope){ // Định nghĩa một controller tên là "productCtrl".

});
