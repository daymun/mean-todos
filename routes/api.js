var express = require('express'),
    router  = express.Router();

// db
var Item = require('mongoose').model('Item');

// items#index
router.get('/items', function (request, response) {
  Item.find().exec(function(error, items) {
    if (error) return response.status(404).send(error);
    response.status(200).json(items)
  });
});

// items#create
router.post('/items', function (request, response) {
  var item = new Item({
    title: request.body.title
  });

  console.log("New item: " + item);
  item.save(function (error, item) {
    if (error) throw error;
    response.status(201).json(item);
  });
});

// items#destroy
router.delete('/items/:id', function (request, response) {
  Item.findByIdAndRemove(request.params.id, function (error, item) {
    if (error) return response.status(404).send(error);
    response.status(200).send();
  });
});

module.exports = router;
