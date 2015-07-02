var meanTodos = angular.module('meanTodos', []);

meanTodos.controller('mainController', function ($scope, $http) {
  $scope.resetItems = function () {
    // make todo items available to the view
    $http.get('/api/items')
      .success(function (data) {
        $scope.items = data.filter(function(item) {
          return !item.complete;
        });

        $scope.completeItems = data.filter(function(item) {
          return item.complete;
        });

        $scope.countItems();
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  $scope.countItems = function () {
    var incompleteItems = $scope.items.filter(function(item) {
      return !item.complete;
    });
    $('.count-todos').html(incompleteItems.length);
  };

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

  $scope.deleteItem = function () {
    $http.delete('/api/items/' + this.item._id)
      .success(function (data) {
        $scope.resetItems();
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  $scope.itemChecked = function () {
    var params = { complete: this.item.complete };
    $http.put('/api/items/' + this.item._id, params)
      .success(function (data) {
        console.log(data);
        $scope.resetItems();
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  $scope.resetItems();
});
