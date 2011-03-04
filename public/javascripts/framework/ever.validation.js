/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */


//pega um objetoo pelo nome
//function getName(name) { return document.getElementsByName(name); }



/*
 * descricao: função genérica para validação de formulários
 * versão: 1.0
 * parametros:
 *   formulario = nome do objeto do formulario a ser formatado
 *   classError = classe a ser adicionada nos componentes que estão Com erro de validação, caso exista a classe
 *   classRight = classe a ser adicionada nos componentes que estão Sem erro de validação, caso exista a classe
 * autor: Edson Nossa de Mendonça
 * dependencias: maskform.js onde estão localizadas as funções ValidaCPf e ValidaCNPJ
 * implementar: mensagens de erro personalizadas
 * 
 * exemplo: if(!validation('myForm','fieldError','fielRight')){ return false; }
 */
function validation(formulario, classError,classRight) {
	var validate = true;
	
	// pega os parametros
	var vForm = formulario;//document.getElementById(formulario);
	var classError	= classError || "";
	var classRight	= "";//classRight || "";
	//var changeClass	= ((classError!="") && (classRight!="")) ? true : false;
	
	
	// percorre o form em busca das classes de validacao
	for (var i=0; i<vForm.length; i++) {
		var element		= vForm.elements[i];
		var elmType		= element.type;
		var classe		= element.className;
		var error		= false;
		var changeClass	= false;
		
		// verifica se a classe existe
		if (classe != "" && classe!=null) {
			var validateClass = false;
			var classArray    = classe.split(" ");
			
			// percorre as o array de classes e verifica qual o tipo de validacao
			for (var j=0; j<classArray.length; j++) {
				
				switch(classArray[j]){
					
					case "required":
						changeClass	= true;
						
						// verifica qual o tipo do campo
						switch(elmType){
							case "text":
								error = (element.value.length <= 0) ? true : false;
							break;
							case "textarea":
								error = (element.value.length <= 0) ? true : false;
							break;
							case "select-one":
								error = (element.selectedIndex == 0) ? true : false;
							break;
							case "password":
								error = (element.value.length <= 0) ? true : false;
							break;
							
							// tratamento para radio e checkbox
							case "radio":
								var radioGroup = element.name;
								var totalRadios = getName(radioGroup).length;
								for (var k=0; k<totalRadios; k++) {
									if (!getName(radioGroup)[k].checked) {
										error = true;
									} else {
										error = false;
										break;
									}
								}
							break;
							case "checkbox":
								var checkGroup = element.name;
								var totalChecks	= getName(checkGroup).length;
								for (var k=0; k<totalChecks; k++) {
									if (!getName(checkGroup)[k].checked) {
										error = true;
									} else {
										error = false;
										break;
									}
								}
							break;
						}
					break; //end: required
					
					case "valida-email":
						changeClass	= true;
						if (!/\w{1,}[@][\w\-]{1,}([.]([\w\-]{2,})){1,3}$/.test(element.value)) {
							error = true;
						}
					break;
					
					case "valida-cpf":
						changeClass	= true;
						if (!validaCPF(element.value)) {
							error = true;
						}
					break;
					case "valida-cnpj":
						changeClass	= true;
						if (!validaCNPJ(element.value)) {
							error = true;
						}
					break;
					
					case "valida-dia":
						changeClass	= true;
						if ((parseInt(vForm.elements[i+1].value) == 2) && (parseInt(element.value)>=30)) {
							error = true;
						}else if(element.value!="" && parseInt(element.value)>31) {
							error = true;
						}	
					break;
					case "valida-mes":
						changeClass	= true;
						if (element.value!="" && parseInt(element.value)>12) {
							error = true;
						}
					break;
					case "valida-ano":
						changeClass	= true;
						if (element.value!="" && parseInt(element.value)<1900) {
							error = true;
						}
					break;
					
					case "valida-data":
						changeClass	= true;
						var data = element.value;
						
						if (data!="") {
							if (!/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/.test(data)) {
								error = true;
								break;
							} else if(!validaData(data)) {
								error = true;
							}
						}
					break;
					
					case "valida-hora":
						changeClass	= true;
						if (element.value!="" && !/^([0-1][0-9]|[2][0-3])(:([0-5][0-9])){1,2}$/.test(element.value)) {
							error = true;
						}
					break;
					
				}//end: switch classArray[j]
				
				// se existirem erros, validate é false
				(error) ? validate=false : '';
				
				// aplica as classes de validacao se as mesmas forem passadas
				if (changeClass) {
					// remove as classes de Right e Error do elemento
					element.className = element.className.replace(classRight,"");
					element.className = element.className.replace(classError,"");
					// se tiver erro adiciona a class de Erro, se nao adiciona a classe de Correto
					(error) ? element.className = element.className +" "+ classError  :  element.className = element.className +" "+ classRight;
				}
			}//end: for classArray
		}//end: if classe
	}//end: for dos elementos do form
	
	// retorno da validacao
	if (validate)
		return true;
	else
		return false;
}//end: function validate




/*
 * Valida Data
 */
function validaData(data) {
	var dataArray	= data.split("/");
	var dia			= parseInt(dataArray[0]);
	var mes			= parseInt(dataArray[1]);
	var ano			= parseInt(dataArray[2]);
	
	
	if (dia > 31)
		return false;
	
	if (mes > 12)
		return false;
	
	if (mes == 2) {
		if (dia > 29)
			return false;
		
		if ((ano % 4 != 0) && dia > 28)
			return false;
	}
	
	return true;
}



/*
 * Valida CPF
 */
function validaCPF(cpf) {
    cpf = cpf.replace(/[^0-9]/g,'')
	var strLength = cpf.length;
    
    if (strLength>11) return false;
    
    for (var x=strLength; x<11;x++){
    	cpf = '0' + cpf;
    }

    var erro = new String;
    
    if (!cpf.length > 0) erro += "? necessario informar um CPF v?lido! \n\n";
    
    if(!erro.length > 0){
        if (cpf.length < 11) erro += "Sao necessarios 11 digitos para verificacao do CPF! \n\n"; 	
    }
    
    var nonNumbers = /\D/;
    
    if (nonNumbers.test(cpf)) erro += "A verificacao de CPF suporta apenas numeros! \n\n"; 
    
    if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || 
    	cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || 
    	cpf == "88888888888" || cpf == "99999999999" || cpf == "01234567890"){
          erro += "Numero de CPF invalido!"
    }
    
    var a = [];
    var b = new Number;
    var c = 11;
    
    for (i=0; i<11; i++){
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
    b = 0;
    c = 11;
    
    for (y=0; y<10; y++) b += (a[y] * c--); 
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
    
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10])){
        erro +="Digito verificador com problema!";
    }
    
    if (erro.length > 0){
        return false;
    }
    return true;
}



/*
 * CNPJData
 */
function validaCNPJ(CNPJ) {
    CNPJ = CNPJ.replace(/[^0-9]/g,'')
    
    if (CNPJ.length > 14) return false;
    
    for (var x=CNPJ.length; x<14;x++){
          CNPJ = '0' + CNPJ;
    }
     
    if (CNPJ == "00000000000000" || CNPJ == "11111111111111" || CNPJ == "22222222222222" || CNPJ == "33333333333333" || CNPJ == "44444444444444" || CNPJ == "55555555555555" || CNPJ == "66666666666666" || CNPJ == "77777777777777" || CNPJ == "88888888888888" || CNPJ == "99999999999999"){
          return false
    }     
	 var erro = new String;
	
	var nonNumbers = /\D/;
	if (nonNumbers.test(CNPJ)) erro += "A verifica??o de CNPJ suporta apenas n?meros! \n\n"; 
	
	var a = [];
	var b = new Number;
	var c = [6,5,4,3,2,9,8,7,6,5,4,3,2];
	for (i=0; i<12; i++){
		   a[i] = CNPJ.charAt(i);
		   b += a[i] * c[i+1];
	}
	if ((x = b % 11) < 2) { a[12] = 0 } else { a[12] = 11-x }
	b = 0;

	for (y=0; y<13; y++) {
		b += (a[y] * c[y]); 
   	}
	
   	if ((x = b % 11) < 2){
		a[13] = 0; 
	}else{
		a[13] = 11-x; 
	}
   
	if ((CNPJ.charAt(12) != a[12]) || (CNPJ.charAt(13) != a[13])){
		   erro +="D?gito verificador com problema!";
	}
   
	if (erro.length > 0){
		return false;
	}
	return true;
}