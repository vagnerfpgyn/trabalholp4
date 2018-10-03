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

    findAll(callback){
        try{
            this._con.query('select * from pergunta_resposta where deletado = 0', callback);
        }catch(error){
            console.log(error);

        }
    }

    findById(id,callback){
        try{this._con.query ('select * from pergunta_resposta where pergunta_resposta.id = ? and deletado = 0',id, callback);

        }catch(error){
            console.log(error);
        }
    }

    delete(id,callback){
        try{
            this._con.query('update pergunta_resposta set deletado = 1 where id = ?', id, callback);
        }catch(error){
            console.log(error);
        }
    }

    update(id, usuario, callaback){
        try{
            this._con.query('update consulta_resposta set ? where id = ?', [consulta, id], callaback);

        }catch(error){
            console.log(error);
        }
    }
}

module.exports = function(){
    return perguntasDAO;
}