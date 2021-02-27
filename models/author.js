var mongoose = require('mongoose');
const { DateTime } = require("luxon");


var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for formatted lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  const birth = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  const death = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)

  if (birth !== 'Invalid DateTime' && death !== 'Invalid DateTime') {
    return birth + " - " + death
  }  
  else if (birth !== 'Invalid DateTime') {
    return birth + " - "
  }

});


// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);