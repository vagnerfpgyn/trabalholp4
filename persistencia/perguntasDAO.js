class perguntasDAO{
    constructor(connection){
        this._con = connection;
    }

   
    create (pergunta, callback){
        try{
            this._con.query('INSERT INTO pergunta_resposta set ?', pergunta, callback);
        } catch(error){
            console.log(error);
        }
        

    }


}

module.exports = function(){
    return perguntasDAO;
}