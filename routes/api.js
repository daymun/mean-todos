var express = require('express'),
    router  = express.Router();

// db
var Item = require('mongoose').model('Item');

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

module.exports = router;
