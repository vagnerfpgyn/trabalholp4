var config = require('./config/custom-express');


var app = config();

app.listen(3000, function(){
    console.log('Escutando a porta 3000');
})
