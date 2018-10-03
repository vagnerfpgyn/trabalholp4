class perguntaService{
    constructor(){}

    validarDados(data){
       
        if(!data.pergunta){         

            return {status: false, message: "Pergunta obrigatória !"}
        }

        if(!data.respostas){

            return {status: false, message: "Respostas Obrigagória !"}
        }

       // var testeResp = respostasValidas(data);
       
        if(respostasValidas(data) === false){
            return {status: false, message: "Formato de respostas Inválido"}
        }


        if(!data.categoria){
            return {status: false, message: "Categoria Obrigagória !"}
        }


        return {status: true};
       
    }

    
  
}

    function respostasValidas(data){
        var valido = Boolean (false);

    stringRespostas = JSON.stringify(data.respostas);       
        var array = (stringRespostas.split (":"));
            
        var resp1 = array[3].substring(0,7);
        console.log(array[0]);

        console.log(array[1]);
        console.log(array[2]);


        var resp2 = array[6].substring(0,7);
        var resp3 = array[9].substring(0,7);
        var resp4 = array[12].substring(0,7);
        var contTrue = 0;
        var contFalse = 0;

    
        if(resp1.substring(1,5)==="true") {
            contTrue ++;
        }else{
            (resp1.substring(1,5)==="false")
            contFalse++
        }           
        
        if(resp2.substring(1,5)==="true") {
            contTrue ++;
        }else{
            (resp2.substring(1,5)==="false")
                contFalse++
        } 
        
        if(resp3.substring(1,5)==="true") {
            contTrue ++;
        }else{
            (resp3.substring(1,5)==="false")
            contFalse++
        } 

        if(resp4.substring(1,5)==="true") {
            contTrue ++;
        }else{
            (resp4.substring(1,5)==="false")
                contFalse++
        } 
    
        


        if ((contTrue == 1) && (contFalse == 3)){
            valido = (true)                 
        }else{                
                valido =  (false);
            }            
                
        
        return valido;    
    }

        module.exports = function(){
        return perguntaService;
    }

