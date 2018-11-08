class perguntaService{
    constructor(){}

    validarDados(data){
       

        if(!data.pergunta){         
            return {status: false, message: "Pergunta obrigatória !"}
        }

        if(!data.respostas){
            return {status: false, message: "Respostas Obrigagória !"}
        }
       
        if(respostasValidas(data) === false){
            return {status: false, message: "Formato de respostas Inválido"}
        }

        if (validaLabel(data) === false){
            return {statur : false, message: "As opções de respostas devem seguir a seguinte ordem: a, b, c, d, e"}
        }

        if(!data.categoria){
            return {status: false, message: "Categoria Obrigagória !"}
        }
         
        return {status: true}
    }

}

    function respostasValidas(data){
        var valido = Boolean (false);

        stringRespostas = JSON.stringify(data.respostas);       
        var array = (stringRespostas.split (":"));
            
        var resp1 = array[3].substring(0,7);
        var resp2 = array[6].substring(0,7);
        var resp3 = array[9].substring(0,7);
        var resp4 = array[12].substring(0,7);
        var resp5 = array[15].substring(0,7);
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
    
        if(resp5.substring(1,5)==="true") {
            contTrue ++;
            }else{
            (resp4.substring(1,5)==="false")
                contFalse++
        } 

        if ((contTrue == 1) && (contFalse == 4)){
            valido = (true)                 
            }else{                
                valido =  (false);
            }            
                
        
        return valido;    
    }


        function validaLabel(data){
            var labelValido = Boolean (false);

        stringRespostas = JSON.stringify(data.respostas);       
        var array = (stringRespostas.split (":"));
            
        var label1 = array[1].substring(1,2);      
        var label2 = array[4].substring(1,2);
        var label3 = array[7].substring(1,2);
        var label4 = array[10].substring(1,2);
        var label5 = array[13].substring(1,2);
            

            if ((label1 === "a") && (label2 == "b") && (label3 == "c") && (label4 == "d") && (label5 == "e") ){
                labelValido = (true)                
            }
            
            return labelValido
      
        }
        
        
       


        module.exports = function(){
        return perguntaService;
        }

