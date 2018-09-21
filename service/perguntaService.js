class perguntaService{
    constructor(){}

    validarDados(data){
        

        if(!data.pergunta){         

            return {status: false, message: "Pergunta obrigatória !"}
        }

        if(!data.respostas){
            return {status: false, message: "Respostas Obrigagória !"}
        }

        if(!data.categoria){
            return {status: false, message: "Categoria Obrigagória !"}
        }


        return {status: true};

        
        
    }


}

module.exports = function(){
    return perguntaService;
}