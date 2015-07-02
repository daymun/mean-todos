var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost/mean-todos');

var ItemSchema = new Schema({
  title      : { type: String, required: true, trim: true },
  complete   : { type: Boolean, default: false },
  created_at : { type: Date },
  updated_at : { type: Date }
});

ItemSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

mongoose.model('Item', ItemSchema);
// module.exports = Item;
