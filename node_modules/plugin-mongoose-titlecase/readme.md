## Disclaimer
this is just an updated version that I personally modified for my project needs,
the original package is [here mongoose-title-case](https://github.com/james1x0/mongoose-title-case)
by [James](https://github.com/James1x0) go check it out.

## mongoose-titlecase
A mongoose.js plugin for titlizing & trimming schemas.

### Installation
```
$ npm install plugin-mongoose-titlecase --save
```

### Usage
Mongoose plugin style.

```javascript
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    titlize = require('mongoose-titlecase'),

var userSchema = new Schema({
  name: {
    first: String,
    last:  String
  },
  hobbies: [String]
});

// Attach some mongoose hooks
userSchema.plugin(titlize, {
  paths: [ 'name.first', { path: 'name.last', trim: false }, { path: 'hobbies', type: 'StringArray', trim: false } ], // Array of paths
  trim: true
});

module.exports = mongoose.model('User', userSchema);
```

And watch it work

```javascript

var User   = require('path/to/model');

var document = new User({
  name: {
    first: ' bob ',
    last:  'ross '
  },
  hobbies: ['playing guitar', 'basketball']
});

document.save().then(record => {
  console.log(record.name.first); // 'Bob'
  console.log(record.name.last); // 'Ross '
  console.log(record.hobbies); // ['Playing Guitar', 'Basketball']
});
```

### Options

There are only three options used in mongoose-titlecase

+ **options.paths** {Array} (*Required*) Array of paths to title case & trim
+ **options.trim** {Boolean} Trim all paths. `true` by default
+ **options.type** {String} declare the data type if it is a `String` or `StringArray`. `String` by default
