module.exports = function(app){

    app.post('/pergunta', function(req, resp){
    data = req.body;
    
    var con = app.persistencia.connectionFactory;
    var dao = new app.persistencia.perguntasDAO(con);


    var service = new app.service.perguntaService();
    response = service.validarDados(data);
    if(!response.status){
        resp.status(400);
        resp.json({"message": response.message});   
        return;
    }

    data.deletado = 0;
    data.respostas = JSON.stringify(data.respostas);
    dao.create(data, function(exception, result){
        if(exception){
            resp.status(500);
            resp.send({"mensagem":"Erro ao salvar pergunta !"});
            console.log(exception);
            return;
        }

        resp.status(201);
        resp.send(data);

    })

    })

};