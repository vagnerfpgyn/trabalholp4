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

    app.get('/pergunta', function (req, resp){
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.perguntasDAO(con);
        dao.findAll(function(exception, result){
            if(exception){
                resp.status(500);
                resp.send({"Mensagem": "Erro Inesperado !"});
                return;
            }

            if(result.length == 0 ){
                resp.status(404);
                resp.send({ "Mensagem" : "Perguntas não encontradas !"});
                return;
            }            
            
            var respostasString = JSON.stringify(result);
            var respostasJson = JSON.parse(respostasString);
                     
            for ( i=0;i  < respostasJson.length; i++){
                respostasJson[i].respostas = JSON.parse(respostasJson[i].respostas);
               }
            
            resp.status(200);
            resp.send(respostasJson);          

        });      

    });


    app.get('/pergunta/:id', function(req, resp){
        data=req.params;
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.perguntasDAO(con);

        dao.findById(data.id, function(exception, result){

            if(result.length == 0){
                resp.status(404);
                resp.send({"message":"Pergunta não encontrada ! "});
                return;
            }

            if(exception){
                resp.status(500);
                resp.send({"mensagem":"Erro ao buscar pergunta !"});
                console.log(exception);
                return;
            }

            result[0].respostas = JSON.parse(result[0].respostas);
            resp.send(result[0]);

        });

    });

    app.delete('/pergunta/:id', function(req, resp){
        dado = req.params;
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.perguntasDAO(con);

        dao.findById(dado.id, function(exception, result){
            if(exception){
                resp.status(500);
                resp.send({"mensagem":"Erro ao encontrar Pergunta !"});
                console.log(exception);
                return;
            }

            if(!result || result.length == 0){
                resp.status(404);
                resp.send({"message":"Pergunta não encontrada !"});
                return;
            }

            dao.delete(dado.id, function(exception, result){
                if(exception){
                    resp.status(500);
                    resp.send({"mensagem":"Erro ao deletar pergunta !"});
                    console.log(exception);
                    return;
                }
                resp.status(200);
                resp.send({"message": "Pergunta Deletada !"});

            });
            
        });

    });

    app.put('/pergunta/:id', function(req, resp){
        param = req.params
        nova = req.body;
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.perguntasDAO(con);
        var service = new app.service.perguntaService();



        dao.findById(param.id, function(exception, result){
            if(exception){
                resp.status(500);
                resp.send({"mensagem":"Erro ao salvar pergunta !"});
                console.log(exception);
                return;
            }

            if(result.length == 0){
                resp.status(404);
                resp.send({"message":"Pergunta não encontrada !"});
                return;
            }
         
            antiga = JSON.stringify(result[0]);
            antiga = JSON.parse(antiga);
            antiga.respostas = JSON.parse(antiga.respostas)        
            antiga.pergunta = nova.pergunta;
            antiga.respostas = nova.respostas;
            antiga.categoria = nova.categoria;

            response = service.validarDados(antiga);
            if(!response.status){
                resp.status(400);
                resp.json({"message": response.message});   
                return;
            }



           antiga.respostas = JSON.stringify(antiga.respostas);
            dao.update(param.id, antiga, function(exception, result){
              
                if(exception){
                resp.status(500);
                    resp.send({"mensagem":"Erro ao alterar a pergunta !"});
                    console.log(exception);
                    return;
                }
                resp.status(200);
                resp.send({"mensagem":"Pergunta alterada com sucesso !"});  

            });

            

        });


    });

    

}