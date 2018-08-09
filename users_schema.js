const users_schema = [
  "'First Name' TEXT", 
  "'Last Name' TEXT", 
  "'Middle Initial' CHARACTER", 
  "Email TEXT",
  "'Street Address' TEXT",
  "'Zip Code' TEXT", 
  "'Joined Date' TEXT", 
  "UUID INTEGER PRIMARY KEY"
];


module.exports = users_schema.join(', ');
