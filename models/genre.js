var mongoose = require('mongoose');
var Book = require('../models/book');
var async = require('async');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
  {
    name: {type: String, requires: true, maxlength: 100, minlength: 3},
  }
);

//Virtual for genre's URL
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});



module.exports = mongoose.model('Genre', GenreSchema)
