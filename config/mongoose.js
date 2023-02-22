const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/project');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('database connected');
})

module.exports=db;