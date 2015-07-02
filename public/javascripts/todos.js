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

    $scope.itemChecked = function () {
      if (this.item.complete) {
        $itemLi = $(event.currentTarget.closest('li'));
        $itemLi.addClass('remove');
        var itemTitle = $itemLi.text();
        var markup = '<li>'+ itemTitle +'<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
        $('#done-items').append(markup);
        $('.remove').remove();
        $scope.countItems();
      }
    };
  });
