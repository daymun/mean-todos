var meanTodos = angular.module('meanTodos', []);

angular.module('meanTodos', [])
  .controller('mainController', function ($scope, $http) {
    $scope.formData = {};

    // make todo items available to the view
    $http.get('/api/items')
      .success(function (data) {
        $scope.items = data;
        $scope.countItems();
        console.log(data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.countItems = function () {
      $('.count-todos').html($scope.items.length);
    }

    $scope.createItem = function () {
      console.log($scope.formData);
      $http.post('/api/items', $scope.formData)
        .success(function (data) {
          $scope.formData = {};
          $scope.items.push(data);
          $scope.countItems();
          console.log(data);
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    };
  });
