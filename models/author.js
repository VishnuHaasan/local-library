var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const {DateTime} = require('luxon');

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

AuthorSchema
.virtual('name')
.get(function(){
  return this.family_name + ', ' + this.first_name;
});

AuthorSchema
.virtual('lifespan')
.get(function(){
  if(this.date_of_birth===undefined && this.date_of_death===undefined){
    return 'Unknown';
  }
  else if(this.date_of_death===undefined){
    var currentYear = new Date().getFullYear();
    var age = currentYear - this.date_of_birth.getFullYear();
    return age;
  }
  var age = this.date_of_death.getFullYear() - this.date_of_birth.getFullYear()
  return age;
});

AuthorSchema
.virtual('url')
.get(function(){
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);
