/*
 * JavaScript Document by:
 * EverSystems
 */


/*
 * Funcoes Globais Utilitarias
 */
 
// Pega os elementos pelo Id
function get(id) {
	return document.getElementById(id);
}
// Pega os elementos pelo Nome
function getName(name) {
	return document.getElementsByName(name);
}
// Pega os elementos pela Tag
function getTag(tag) {
	return document.getElementsByTagName(tag);
}

// 
var isIE = (window.ActiveXObject) ? true : false;;




/*
 * Classe EverSystems
 * 2009
 */
function EverSystems() {
	var me = this;
	
	this.description 	= "EverSystems JavaScript Framework";
	this.version	 	= "1.0 - Dez/2010";
	
	// ----------------------------------------------------------------------------------- //
	
	//Classes de Erro e Correto padrão
	this.classErrorDef	= "fieldErr";
	this.classRightDef	= "fieldRight";
	var classErrorDef	= "fieldErr";
	var classRightDef	= "fieldRight";
	
	this.ignoredKey		= false;




	// VISUAL ------------------------------------------------------------------------------- //

	this.hide = function(obj){
		try {
			if (typeof(obj) == 'object') {
				for(var i=0; i<obj.length; i++) {
					get(obj[i]).style.display = 'none';
				}
			} else {
				get(obj).style.display = 'none';
			}
		} catch(e){ return; }
	};
	
	this.show			= function(id){ get(id).style.display = 'block'; };
	this.showInline		= function(id){ get(id).style.display = 'inline'; };
	this.visible		= function(id){ get(id).style.visibility = 'visible'; };
	this.invisible		= function(id){ get(id).style.visibility = 'hidden'; };
	this.hideShow		= function(idHide,idShow){ me.hide(idHide); me.show(idShow); };
	this.showDefault	= function(id){ get(id).style.display = ''; };
	
	// Pega ou Ecreve html no id
	this.html = function(id,dados){
		var dados = dados || '';
		if(dados == ''){ return get(id).innerHTML; }else{ get(id).innerHTML = dados; }
	};
	// Ecreve o html nos ids passado em array no objeto
	this.htmlList = function(obj){
		var ids = obj.ids;
		var txt = obj.text;
		
		for(var i=0; i<ids.length; i++){
			get(ids[i]).innerHTML = txt[i];
		}
	};
	// limpa o conmteudo do id
	this.clean = function(id){ get(id).innerHTML = ''; };
	this.cleanList = function(objArray){
		for(var i=0; i < objArray.length; i++){
			get(objArray[i]).innerHTML = '';
		}
	};
	
	
	//muda o foco para o campo nextField
	this.goToField = function(field,nextField,qtde){
		if(!me.ignoredKey && get(field).value.length==qtde){
			get(nextField).focus();
		}
	};
	
	
	this.changeClass = function(obj){
		// se for passado um Array
		if (typeof(obj.id) == 'object') {
			for(var i=0; i<obj.id.length; i++){
				for(var j=0; j<obj.classe.length; j++){
					classe = get(obj.id[i]).className.replace(obj.removeClass,"");
					get(obj.id[i]).className = obj.addClass;
				}
			}
		// se for passado somente um id
		} else {
			classe = get(obj.id).className.replace(obj.removeClass,"");
			get(obj.id).className = obj.addClass;
		}
	};
	
	
	this.addRemoveClass = function(obj){
		var classe = "";
		
		// se for passado um Array
		if (typeof(obj.id) == 'object') {
			for(var i=0; i<obj.id.length; i++){
				for(var j=0; j<obj.classe.length; j++){
					(obj.type == "add") ?
						classe = get(obj.id[i]).className +" "+ obj.classe[j] :
						classe = get(obj.id[i]).className.replace(obj.classe[j],"");
					
					get(obj.id[i]).className = classe;
				}
				
				if(obj.labelId){get(obj.labelId[i]).innerHTML = (obj.addText[i] || "");};
			}
		// se for passado somente um id
		} else {
			(obj.type == "add") ?
				classe = get(obj.id).className +" "+ obj.classe :
				classe = get(obj.id).className.replace(obj.classe,"");
				
			get(obj.id).className = classe;
			if(obj.labelId){get(obj.labelId).innerHTML = (obj.addText || "");};
		}
	};

	
	
	// LINKS ------------------------------------------------------------------------------ //
	
	// Posiciona o topo da pagina no valor passado
	this.topPageIn = function(topo){ window.scroll(0,topo); };



	// CSS -------------------------------------------------------------------------------- //
	
	//limpa as classes de Erro e Ok do Formulario
	this.formCleanValidateClass = function(vForm){
		var fieldId;
		for (i = 0; i < vForm.elements.length; i++){
			fieldId = vForm.elements[i].id;
			get(fieldId).className = get(fieldId).className.replace(classRightDef,"");
			get(fieldId).className = get(fieldId).className.replace(classErrorDef,"");
		}
	};
	
	//limpa as classes de Erro e Ok
	this.cleanValidateClass = function(fieldId){
		get(fieldId).className = get(fieldId).className.replace(classRightDef,"");
		get(fieldId).className = get(fieldId).className.replace(classErrorDef,"");
	};
	//adiciona a classe de ERRO
	this.addInvalidClass = function(fieldId){
		me.cleanValidateClass(fieldId);
		get(fieldId).className = get(fieldId).className +" "+ classErrorDef +"";
	};
	//adiciona a classe de Ok
	this.addValidClass = function(fieldId){
		me.cleanValidateClass(fieldId);
		get(fieldId).className = get(fieldId).className +" "+ classRightDef +"";
	};
	// 
	this.displayObjects = function(obj){
		for(var i = 0; i < obj.objects.length; i++){
			get(obj.objects[i]).style.display = obj.display[i];
		}
	};
	


	// LOADING ---------------------------------------------------------------------------- //
	
	// Mostra o splash de Alerta
	this.showMessage = function(posTop,message){
		alert(message);
	};



	// FACADES ------------------------------------------------------------------------- //
	
	this.ajax = function(obj) {
		var ajax = new Ajax(obj);
		ajax.load();
	};
	
	
	this.dialog = new Dialog();
	me.dialog.create();
	
	
	this.splash = new Splash();
	me.splash.create();
	



	// FORMULARIO ------------------------------------------------------------------------- //
	
	// Limpa os campos do formulário passado como parametro
	this.resetForm = function(objForm){
		objForm.reset();
	};
	
	// Muda o focu para o campo passado no parametro
	this.focus = function(idField){
		get(idField).focus();
	};
	// Seleciona o campo passado no parametro
	this.select = function(idField){
		get(idField).select();
	};
	
	//retorna o texto da opcao selecionada no combo
	this.getTextCombo = function(obj) {
		var indice	= get(obj).selectedIndex;
		var texto	= get(obj).options[indice].text;
		return texto;
	};
	
	// limpa os valores dos imputs
	this.cleanInputs = function(obj) {
		for(var i in obj){
			var tipo = get(obj[i]).type;
			
			switch (tipo) {
				case "text":
					get(obj[i]).value = "";
				break;
				case "textarea":
					get(obj[i]).value = "";
				break;
				case "hidden":
					get(obj[i]).value = "";
				break;
				
				case "radio":
					get(obj[i]).checked = false;
				break;
				case "checkbox":
					get(obj[i]).checked = false;
				break;
				
				case "select-one":
					get(obj[i]).selectedIndex = 0;
				break;
			}
		}
    };
	
	// valida tamanho
	this.validateSize = function(id,tam){
		if(get(id).value.length >= tam){
			get(id).value = get(id).value.substr(0,tam);
			return false;
		}
	};
	
	
	//Habilita os campos passados no array
	this.habilitaInputs = function(obj) {
		for(var i in obj){
			get(obj[i]).disabled = false;
		}
    };
	
	//Desabilita os campos passados no array
	this.desabilitaInputs = function(obj) {
		for(var i in obj){
			get(obj[i]).disabled = true;
		}
    };
	
	//Habilita o formulario para edição
	this.habilitaForm = function(pForm) {
        var vFormId = get(pForm);
        for (var i=0; i<vFormId.length; i++) {
            var element = vFormId.elements[i];
            element.disabled = false;
        }
    };
	
	//Desabilita o formulario para edição
	this.desabilitaForm = function(pForm) {
        var vFormId = get(pForm);
        for (var i=0; i<vFormId.length; i++) {
            var element = vFormId.elements[i];
            element.disabled = true;
        }
    };
	
	/*
	 * Habilita os campos de formulario que estao
	 * no id do div passado no parametro area
	 */
	this.enableFieldsArea = function(area) {
		var inputs = get(area).getElementsByTagName('input');
		var selects = get(area).getElementsByTagName('select');
		var textareas = get(area).getElementsByTagName('textarea');
		
		for (var i=0; i<inputs.length; i++) {
            inputs[i].disabled = false;
        }
		for (var j=0; j<selects.length; j++) {
            selects[j].disabled = false;
        }
		for (var k=0; k<textareas.length; k++) {
            textareas[k].disabled = false;
        }
	};
	
	/*
	 * Desabilita os campos de formulario que estao
	 * no id do div passado no parametro area
	 */
	this.disableFieldsArea = function(area) {
		var inputs = get(area).getElementsByTagName('input');
		var selects = get(area).getElementsByTagName('select');
		var textareas = get(area).getElementsByTagName('textarea');
		
		for (var i=0; i<inputs.length; i++) {
            inputs[i].disabled = true;
        }
		for (var j=0; j<selects.length; j++) {
            selects[j].disabled = true;
        }
		for (var k=0; k<textareas.length; k++) {
            textareas[k].disabled = true;
        }
	};
	
	
	// funcao que monta o post do formulario passado no parametro vForm
	this.montaPost = function(vForm,onlyVisible){
		var retorno = "";
		var fieldValue="";
		var onlyVisible = onlyVisible || false; // parametro que indica que deve montar o post apenas com os elmentos visiveis
			for (i = 0; i < vForm.elements.length; i++){
				if (onlyVisible){
			  		var x  = vForm.elements[i].name;
					if (!get(vForm.elements[i].id).visible()) continue;
				}
				if ((vForm.elements[i].type!="submit") && (vForm.elements[i].type!="button")) {
					//Tratamento de radio buttons
					if ((vForm.elements[i].type=="radio") && (vForm.elements[i].checked!=true)) continue;
						if (vForm.elements[i].type=="checkbox") {
							if (vForm.elements[i].checked==1) {
								if (retorno != "") { retorno += "&"; }
//								retorno += vForm.elements[i].name + "=" + encodeURIComponent(vForm.elements[i].value);
								retorno += vForm.elements[i].name + "=" + vForm.elements[i].value;
							}
						} else {
							fieldName  = vForm.elements[i].name;
							fieldType  = vForm.elements[i].type;
							fieldValue = vForm.elements[i].value;
							
							if (fieldType == "text") {
								fieldClass = vForm.elements[i].className;
								fieldValue = me.limpaValor(fieldClass, fieldValue, fieldName);
							}
							
							if (retorno != "") { retorno += "&"; }
							//retorno += fieldName + "=" + encodeURIComponent(fieldValue);
							retorno += fieldName + "=" + fieldValue;
						}
				}
			}
		return retorno;
	};
	
	// Popula UF //
	this.populaUF = function(combo,dados){
		me.loadCombo(combo,dados.uf,'id','descricao');
	};
	
	
	// FORMATACAO ----------------------------------------------------------------------------- //
	
	this.trataCPFCNPJ = function(CPFFlag,CPFCNPJ){
		if(CPFFlag){
			CPFCNPJ = me.formataDado(CPFCNPJ,'cpf');
		}else{
			CPFCNPJ = me.formataDado(CPFCNPJ,'cnpj');
		}
		return CPFCNPJ;
	};
	
	//Limpa a string deixando somente os caracteres do parametro tipo
	this.extractFromString = function(string, tipo) {
		var extractedString = "";
		
		if(string != ''  &&  string != null) {
			var str = string.toString();
			
			switch(tipo) {
				//retorna somente os numeros da string
				case "number":
					extractedString = str.replace(/[^\d]/g,'');
				break;
			}
		
		}
		
		return extractedString;
	};
	
	//
	this.formataDado = function(dado,tipo){
		var dadoFormatado = "";
		
		try {
			if (dado != null && dado.toString() != ''){
				var dado	= dado.toString();
				var len 	= dado.length;
				var rest 	= 0;
				
				switch(tipo) {
					case "fone":
						rest = 8 - len;
						if(len < 8){
							dado = me.preencheZero(rest,8) + dado;
						}
						dado = dado.replace('-','');
						dadoFormatado = dado.substr(0,dado.length-4) +'-'+ dado.substr(dado.length-4,4);
					break;
					
					case "hora":
						rest = 4 - len;
						if(len < 8){
							dado = me.preencheZero(rest,4) + dado;
						}
						dado = dado.replace(':','');
						dadoFormatado = dado.substr(0,dado.length-2) +':'+ dado.substr(dado.length-2,2);
					break;
					
					case "cep":
						rest = 8 - len;
						if(len < 8){
							dado = me.preencheZero(rest,8) + dado;
						}
						dado = dado.replace('-','');
						dadoFormatado = dado.substr(0,dado.length-3) +'-'+ dado.substr(dado.length-3,3);
					break;
					
					case "cnpj":
						rest = 14 - len;
						if(len < 14){
							dado = me.preencheZero(rest,14) + dado;
						}	
						dado = dado.replace(/[^0-9]/g,'');
						dadoFormatado = dado.substr(0,dado.length-12) +'.'+ dado.substr(dado.length-12,3) +'.'+ dado.substr(dado.length-9,3) +'/'+ dado.substr(dado.length-6,4) +'-'+ dado.substr(dado.length-2,2);
					break;
					
					case "cpf":
						rest = 11 - len;
						if(len < 11){
							dado = me.preencheZero(rest,11) + dado;
						}				
						dado = dado.replace(/[^0-9]/g,'');
						dadoFormatado = dado.substr(0,dado.length-8) +'.'+ dado.substr(dado.length-8,3) +'.'+ dado.substr(dado.length-5,3) +'-'+ dado.substr(dado.length-2,2);
					break;
					
					case "long":
						dado = dado.toString().replace(/[\.]/g,'');
						dado = dado.toString().replace(/[\,]/g,'.');
						
						dadoFormatado = dado;
						
						if(dado.search(/[\.|,]/g) < 0) {
							dadoFormatado = dado +'.00';
						}
					break;
					
					case "taxa":
						//dado = dado.toString().replace(/[\.|,]/g,'');
						var inteiro;
						var decimal;
						
						if(len > 2) {
							if (dado.charAt(1) == "."  ||  dado.charAt(1) == ",") {
								inteiro = dado.charAt(0);
								decimal = dado.charAt(2) +"0";
							} else {
								inteiro = dado.substr(0,len-2);
								decimal = dado.substr(len-2,2);
							}
						} else {
							inteiro = dado;
							decimal = "00";
						}
						
						dadoFormatado = inteiro + '.' + decimal;
					break;
					
					case "moeda":
						var i = j = 0;
						var len = len2 = 0;
						var strCheck = '0123456789';
						var sepCheck = '.';
						var inteiros = decimais = c = inteirosMilhas = '';
						var flagZero = false;

						// verifica se o dado ja esta formatado
						if (dado.indexOf(',') != -1) {
							dado = dado.replace(/\./g,'');
							sepCheck = ',';
						}
						
						len = dado.length;

						// obtem todos os numeros inteiros
						for (i = 0; i < len; i++) {
							c = dado.charAt(i);
							if ((inteiros.length == 0) && (c == '0')) {
								flagZero = true;
							} else {
								if (sepCheck.indexOf(c) != -1) break;
								if (strCheck.indexOf(c) != -1) inteiros += c;
							}
						}
						
						// obtem todos os numeros decimais
						for (; i < len; i++) {
							c = dado.charAt(i);
							if (strCheck.indexOf(c) != -1) decimais += c;
						}

						// aplica formatacao nos inteiros e decimais
						if ((inteiros.length == 0) && (decimais.length == 0) && (flagZero == false)) {
							dadoFormatado = dado;
						} else {
							if (inteiros.length == 0) inteiros = '0';
							if (decimais.length == 0) decimais = '00';
							if (decimais.length == 1) decimais = decimais + '0';

							// coloca separador de milhas nos inteiros
							for (j = inteiros.length; j > 3; j = j - 3) {
								inteirosMilhas = '.' + inteiros.substring(j - 3, j) + inteirosMilhas;
							}
							if (j > 0) {
								inteirosMilhas = inteiros.substring(0, j) + inteirosMilhas;
							}

							dadoFormatado = inteirosMilhas + ',' + decimais;
						}
					break;
				}
			}
			
			return dadoFormatado;
		
		// se der algum erro, retorna o dado sem formatar
		} catch(e) {
			return dado;
		}
	};
	
	
	this.convertToDouble = function(valor) {
		var valor = valor.toString();
		valor = valor.replace(/\./g,'');
		valor = valor.replace(/\,/,'.');
		return valor;
	};
	
		
	this.preencheZero = function(rest,qtde){
		var aux = '';
		if(rest < qtde){
			for(var i = 0; i < rest; i++){
				aux += '0';
			}
		}
		return aux;
	};
	
	this.limpaValor = function(classe, valor, campo){
		var classe = classe.split(" ");
		
		for(var j=0; j<=classe.length; j++){
			switch(classe[j]) {
				case "mask-cpf":
					valor = valor.replace(/[^0-9]/g,'');
				break;
				case "mask-cnpj":
					valor = valor.replace(/[^0-9]/g,'');
				break;
				case "mask-phone":
					valor = valor.replace('-','');
				break;
				case "mask-cep":
					valor = valor.replace('-','');
				break;
				case "mask-money":
					valor = valor.replace(/[\.]/g,'');
					valor = valor.replace(',','.');
				break;
				case "mask-hora":
					valor = valor.replace(/[\:]/g,'');
				break;
			}
		}
		
		return valor;
	};
	
	//converte uma string para array
	this.stringToArray = function(str) {
		var value	= str.value || "";
		var size	= str.size  || 0;
		var retorno	= null;
		
		if (value != "") {
			retorno = value.split(str.charSplit)[str.index];
			if(size > 0){ retorno = retorno.substr(str.init, size); }
		}
		return retorno;
	};


	
	// DATABIND ----------------------------------------------------------------------------- //
	
	this.objContent = "";
	
	this.alertObject = function(obj) {
		/*var content = '';
		
		for (var x in obj) {
			content += x +'= ';
			if (typeof(obj[x]) == 'object') {
				content += '\n';
				for (var y in obj[x]) {
					content += '    '+ y +'= ';
					if (typeof(obj[x][y]) == 'object') {
						content += '\n';
						for (var z in obj[x][y]) {
							content += '        '+ z +'= '+ obj[x][y][z] +'\n';
						}
					} else {
						content += obj[x][y] +'\n';
					}
				}
			} else {
				content += obj[x] +'\n';
			}
		}*/
		
		for (var x in obj) {
			ev.objContent += x +'= ';
			if (typeof(obj[x]) == 'object') {
				ev.objContent += '\n';
				ev.alertObject(obj[x]);
			} else {
				ev.objContent += obj[x] +'\n';
			}
		}
		//alert(ev.objContent)
	};
	
	
	this.valueToField = function(obj){
		for(var i = 0; i < obj.value.length; i++){
			get(obj.to[i]).value = obj.value[i];
		}
	};
	
	this.valueToLabel = function(obj){
		for(var i = 0; i < obj.value.length; i++){
			get(obj.to[i]).innerHTML = obj.value[i];
		}
	};
	
	// popula o combo com o json passado no parametro arrDados
	this.loadCombo = function(obj, arrDados, valor, texto, mantemItens, callback){
		var objCombo	= get(obj);
		var valor	  	= valor || 'id';
		var texto	  	= texto || 'texto';
		var mantemItens	= mantemItens || 1;
		var callback	= callback || '';

		me.resetCombo(obj, mantemItens);
		
		if (arrDados && arrDados.length) {
			for(var i=0; i<arrDados.length; i++) {
				objCombo.options[i+1]= new Option(arrDados[i][texto]);
				objCombo.options[i+1].value = arrDados[i][valor];
			}
		}
		
		if(callback!=''){ callback(); }
	};
	
	/*
	 * funcao para resetar o combo
	 * obj = combo
	 * mantemItens = a quantidade de itens que será mantido
	 * 				 0 = limpa todos os itens
	 * 				 1 = mantem o 1o. item
	 * 				 2 = mantem o 1o. e o 2o. itens e assim por diante...
	 */
	this.resetCombo = function(obj, mantemItens) {
		var objCombo	= get(obj);
		var totalItens	= objCombo.length - 1;
		
		for (var i=totalItens; i>=mantemItens; i--) {
			objCombo.remove(i);
		}
	};
	
	this.removeFirstItemCombo = function(obj) {
		get(obj).remove(0);
	};
	
	
	
	/*
	 * Popula Formulario a partir do JSON
	 *
	 * exemplo: jsonToForm(json,'myForm')
	 * json   = dados em json para popular o myForm
	 * myForm = id do formulario (<form id="myForm">)
	 */
	this.jsonToForm = function(dados,formulario) {
		var vForm = get(formulario);
		
		for (var dataSource in dados) {
			var valor = dados[dataSource];
			
			for (var i=0; i<vForm.length; i++) {
				var element = vForm.elements[i];
				var dataField = element.getAttribute('dataFld');
				
				if (dataSource == dataField) {				
					switch (element.type) {
						case "text":
							get(element.id).value = valor;
						break;
						case "textarea":
							get(element.id).value = valor;
						break;
						case "hidden":
							get(element.id).value = valor;
						break;
						
						case "radio":
							(valor == get(element.id).value) ? get(element.id).checked=true  :  get(element.id).checked=false;
						break;
						case "checkbox":
							if (dataField == dataSource){
								for (var val in valor) {
									(valor[val] == get(element.id).value) ? get(element.id).checked=true  :  get(element.id).checked=false;
								}
							}
						break;
						
						case "select-one":
							if (typeof(valor) != "object") {
								get(element.id).value = valor;
								/*for (var opt=0; opt < get(element.id).length; opt++) {
									if (valor == get(element.id)[opt].value) {
										get(element.id).selectedIndex = opt;
										break;
									}
								}*/
							} else {
								var dataFieldAtt		= element.getAttribute('dataFldAtt');
								get(element.id).value	= valor[dataFieldAtt];
								/*var valorAtt	 = valor[dataFieldAtt];
									for (var opt=0; opt < get(element.id).length; opt++) {
									if (valorAtt == get(element.id)[opt].value) {
										get(element.id).selectedIndex = opt;
										break;
									}
								}*/
							}
						break;
					}
				}
			}
		}
	};
	
	
	/*
	 * Popula Formulario a partir do JSON LIST
	 *
	 * exemplo	= jsonToFormList(json,'myForm')
	 * json   	= dados em json para popular o myForm
	 * myForm 	= id do formulario (<form id="myForm">)
	 * html 	= dataFld do formulario (<dataFld="nomeJson0">)
	 */
	this.jsonToFormList = function(dados,formulario) {
		var vForm = get(formulario);
	
		for (var index in dados) {
			for(var atributos in dados[index]){
				var valor = dados[index][atributos];
				
				for (var idx =0; idx < vForm.length; idx++) {
					var element = vForm.elements[idx];
					var dataField = element.getAttribute('dataFld');
					var dataSource = atributos+index;
					
					if (dataSource == dataField) {				
						switch (element.type) {
							case "text":
								get(element.id).value = valor;
							break;
							case "textarea":
								get(element.id).value = valor;
							break;
							case "hidden":
								get(element.id).value = valor;
							break;
							
							case "radio":
								(valor == get(element.id).value) ? get(element.id).checked=true  :  get(element.id).checked=false;
							break;
							case "checkbox":
								if (dataField == dataSource){
									for (var val in valor) {
										(valor[val] == get(element.id).value) ? get(element.id).checked=true  :  get(element.id).checked=false;
									}
								}
							break;
							
							case "select-one":
								if (typeof(valor) != "object") {
									get(element.id).value = valor;
									/*for (var opt=0; opt < get(element.id).length; opt++) {
										if (valor == get(element.id)[opt].value) {
											get(element.id).selectedIndex = opt;
											break;
										}
									}*/
								} else {
									var dataFieldAtt		= element.getAttribute('dataFldAtt');
									get(element.id).value	= valor[dataFieldAtt];
									/*var valorAtt	 = valor[dataFieldAtt];
										for (var opt=0; opt < get(element.id).length; opt++) {
										if (valorAtt == get(element.id)[opt].value) {
											get(element.id).selectedIndex = opt;
											break;
										}
									}*/
								}
							break;
						}
					}
				}
			}
		}
	};
	
	
	/*
	 * Popula os Campos do formulario a partir
	 * do JSON ou de um atributo especifico
	 *
	 * exemplo: jsonToForm(json.informacoes,'myArea')
	 * json   = dados em json para popular os campos
	 * myArea = id do div que contem os campos a serem populados
	 */
	this.jsonToFieldsArea = function(dados,area) {
		var inputs = get(area).getElementsByTagName('input');
		var selects = get(area).getElementsByTagName('select');
		var textareas = get(area).getElementsByTagName('textarea');
		
		for (var dataSource in dados) {
			var valor = dados[dataSource];
			
			for (var i=0; i<inputs.length; i++) {
				var dataFieldInputs = inputs[i].getAttribute('dataFld');
				
				if (dataSource == dataFieldInputs) {
					switch (inputs[i].type) {
						case "text":
							get(inputs[i].id).value = valor;
						break;
						case "hidden":
							get(inputs[i].id).value = valor;
						break;
						case "radio":
							(valor == get(inputs[i].id).value) ? get(inputs[i].id).checked=true  :  get(inputs[i].id).checked=false;
						break;
						case "checkbox":
							if (dataFieldInputs == dataSource){
								for (var val in valor) {
									(valor[val] == get(inputs[i].id).value) ? get(inputs[i].id).checked=true  :  get(inputs[i].id).checked=false;
								}
							}
						break;
					}
				}
			}
			
			for (var i=0; i<textareas.length; i++) {
				var dataFieldText = textareas[i].getAttribute('dataFld');
				if (dataSource == dataFieldText) {
					get(textareas[i].id).value = valor;
				}
			}
			
			for (var i=0; i<selects.length; i++) {
				var dataFieldSelects = selects[i].getAttribute('dataFld');
				if (dataSource == dataFieldSelects) {
					if (typeof(valor) != "object") {
						get(selects[i].id).value = valor;
					} else {
						var dataFieldAtt		 = selects[i].getAttribute('dataFldAtt');
						get(selects[i].id).value = valor[dataFieldAtt];
					}
				}
			}
		}
	};
	
	
	/* 
	 * Popula Labels a partir do JSON
	 *
	 * exemplo: jsonToLabel(json)
	 * json = dados em json para popular os labels
	 */
	this.jsonToLabel = function(dados) {
		for (var dataSource in dados) {
			try {
				var label		= get(('df_'+ dataSource));
				var valor		= dados[dataSource];
				var tipoValor	= ''+ typeof(valor);
				var printValor	= '';
				
				switch (tipoValor.toLowerCase()) {
					case "string" :
						printValor = valor;
					break;
					case "number" :
						printValor = valor;
					break;
					case "boolean" :
						printValor = '&nbsp;';
					break;
					
					case "object":
						if (valor) {
							if (typeof(valor.length) == "number") {
								for (var i=0; i<valor.length; i++) {
									printValor += valor[i] +' &nbsp;';
								}
							} else {
								for (var atrib in valor) {
									printValor += valor[atrib] +' &nbsp;';
								}
							}
						} else {
							printValor = '&nbsp;';
						}
					break;
				}
				label.innerHTML = printValor;
			
			} catch(e) { continue; }
		}
	};
	
	
	/*
	 * Popula Formulario a partir do JSON LIST
	 *
	 * exemplo	= jsonToLabelList(json,'myForm')
	 * json   	= dados em json para popular o myForm
	 * myForm 	= id do formulario (<form id="myForm">)
	 * html 	= df_ do label (<id="df_nomeJson0">)
	 */
	this.jsonToLabelList = function(dados) {
		for(var index in dados){
			for(var atributos in dados[index]){
				try{
					var label = get(('df_'+ atributos + index));
					var valor		= dados[index][atributos];
					var tipoValor	= ''+ typeof(valor);
					var printValor	= '';
					
					switch (tipoValor.toLowerCase()) {
						case "string" :
							printValor = valor;
						break;
						case "number" :
							printValor = valor;
						break;
						case "boolean" :
							printValor = '&nbsp;';
						break;
						
						case "object":
							if (valor) {
								if (typeof(valor.length) == "number") {
									for (var i=0; i<valor.length; i++) {
										printValor += valor[i] +' &nbsp;';
									}
								} else {
									for (var atrib in valor) {
										printValor += valor[atrib] +' &nbsp;';
									}
								}
							} else {
								printValor = '&nbsp;';
							}
						break;
					}
					label.innerHTML = printValor;
				}catch(e) {continue;}
			}
		}
	};
	
	
	/* 
	 * Popula Labels que estão dentro de um id
	 * a partir do JSON ou de um atributo especifico
	 *
	 * exemplo: jsonToLabel(json,area)
	 * json = dados em json para popular os labels
	 * area = id da area dos labels a serem populados
	 */
	this.jsonToLabelArea = function(dados,area) {
		var labels = get(area).getElementsByTagName('label');
		
		for (var dataSource in dados) {
			try {
				for(var i=0; i<labels.length; i++){
					var label		= get((area +'_'+ dataSource));
					var valor		= dados[dataSource];
					var tipoValor	= ''+ typeof(valor);
					var printValor	= '';
					
					switch (tipoValor.toLowerCase()) {
						case "string" :
							printValor = valor;
						break;
						case "number" :
							printValor = valor;
						break;
						case "boolean" :
							printValor = '&nbsp;';
						break;
						
						case "object":
							if (valor) {
								if (typeof(valor.length) == "number") {
									for (var i=0; i<valor.length; i++) {
										printValor += valor[i] +' &nbsp;';
									}
								} else {
									for (var atrib in valor) {
										printValor += valor[atrib] +' &nbsp;';
									}
								}
							} else {
								printValor = '&nbsp;';
							}
						break;
					}
					label.innerHTML = printValor;
				}
			
			} catch(e) { continue; }
		}
	};
	
	
	
	/*
	 * Popula Labels a partir do Formulario
	 *
	 * exemplo: formToLabel('myForm')
	 * myForm = id do formulario (<form id="myForm">)
	 */
	this.formToLabel = function(formulario) {
		var vForm = document.getElementById(formulario);
		
		for (var i=0; i<vForm.length; i++) {
			var element = vForm.elements[i];
			var dataSource = element.getAttribute('dataSrc');
			
			if (dataSource != null && dataSource != '') {
				var label = getId(('df_'+ dataSource));
				var valor = "";
				
				switch (element.type) {
					case "text":
						label.innerHTML = getId(element.id).value;
					break;
					case "textarea":
						label.innerHTML = getId(element.id).value;
					break;
					case "hidden":
						label.innerHTML = getId(element.id).value;
					break;
					
					case "radio":
						(element.checked) ? label.innerHTML = element.getAttribute('dataConf') : '';
					break;
					case "checkbox":
						(element.checked) ? valor = element.getAttribute('dataConf')+'&nbsp; ' :  '';
						label.innerHTML = valor;
					break;
					
					case "select-one":
						(element.selectedIndex) ? valor = element.options[element.selectedIndex].text : '';
						label.innerHTML = valor;
					break;
				}
			}
		}
	};
	
	
	/*
	 * Limpa os Labels
	 * 
	 * exemplo: resetLabel('confirmacao')
	 * confirmacao = id do div onde estão os labels a serem limpos
	 */
	this.resetLabel = function(divLabels) {
		// Acessando os Labels da área especificada (divLabels)
		var lblConfirm = get(divLabels).getElementsByTagName('label');
		for (var label in lblConfirm) {
			try {
				var element = getTag('label')[label].getAttribute('id');
				get(element).innerHTML = '';
			}
			catch(e) { continue; }
		}
	};
	
	
	
	/*
	 * Popula uma tabela com o json passado
	 *
	 * exemplo: tableGrid({
					tabela  : 'tbGrid',
					dados   : json.dados,
					bgLinha : ['#fff','#eee'],
					mensagem: ['divMessageId','Nenhum Registro encontrado']
				});
	 * tabela		= id da tabela a ser populada - obj.tabela
	 * dados		= dados em json para popular o tbGrid - obj.dados
	 * bgLinha		= cores do background das linhas zebradas - obj.bgLinha[0] e obj.bgLinha[1]
	 * mensagem[0]	= Id do elemento a ser inserido a mensagem
	 * mensagem[1]	= Mensagem a ser exibida
	 */
	this.tableGrid = function(obj) {
		loading.show();
		
		var tabela,corpo, dados,registros;
		
		tabela		= get(obj.tabela);
		corpo		= tabela.tBodies[0];
		dados		= obj.dados;
		registros	= dados.length;
		
		me.cleanTableGrid(tabela);
		
		if (registros <= 0) {
			loading.hide();
			
			if (obj.mensagem) {
				me.hide(obj.tabela);
				me.html(obj.mensagem[0],obj.mensagem[1]);
				me.show(obj.mensagem[0]);
			}
			return false;
		} else {
			me.hide(obj.mensagem[0]);
			me.clean(obj.mensagem[0]);
			me.show(obj.tabela);
		}
		
		
		//var cabecalho, rodape
		var linhas,colunas, bgLinhas, novaLinha;
		
		//cabecalho	= tabela.tHead;
		//rodape		= tabela.tFoot;
		linhas		= corpo.rows.length;
		colunas		= corpo.rows[0].cells.length;
		bgLinhas	= [obj.bgLinha[0],obj.bgLinha[1]];
		
		
		corpo1 = document.createElement("tbody");
		tabela.appendChild(corpo1);
		
		
		//copia o modelo da tabela
		for (var i=0; i<registros; i++) {
			for (var j=0; j<linhas; j++) {
				novaLinha = corpo.rows[j].cloneNode(true);
				novaLinha.style.backgroundColor = bgLinhas[i % 2];
				novaLinha.setAttribute("id",i);
				corpo1.appendChild(novaLinha);
			}
		}
		
		//oculta o template
		//corpo.style.display = "none";
		
		//apaga as linhas do template
		// for (var k=0; k<linhas; k++) {
			// corpo.deleteRow(0);
		// }
		
		
		var totalLinhas = corpo1.rows.length;
		var labels, totalLabels;
		var count = 0;
		
		labels		= corpo1.rows[0].getElementsByTagName('label');
		totalLabels	= labels.length;
		
		//popula a tabela com os dados do json
		for (var l=0; l<totalLinhas; l+=linhas) {
            //******Begin New Implementation to load table grid , inspired on Prototype Template
            //replace each cell of row is the only way to innerHTML a row in IE
            for(var z=0;z<corpo1.rows[l].cells.length;z++){
                //take the cell inner
                var str = corpo1.rows[l].cells[z].innerHTML;
                //take all tokens in this format: #{variable} and replace by json data
                 var result = str.replace(/(#\{(.*?)\})/gi, function(str){
                    //extract the variable name
                    str =str.replace(/\#\{(.+)\}/g,'$1');
                    var retorno = (typeof(dados[count][str])!='undefined')?dados[count][str]:null;
                    return retorno;
                });
                //return the cell inner with data
                corpo1.rows[l].cells[z].innerHTML = result;
            }//*******End New Implementation
            //old implementation
			for (var m=0; m<totalLabels; m++) {
				corpo1.rows[l].getElementsByTagName('label')[m].innerHTML = dados[count][labels[m].getAttribute('id')];
			}
			count++;
		}
		
		//remove as partes da tabela, se necessário
		/*
		tabela.removeChild(cabecalho);	// ou tabela.deleteTHead()
		tabela.removeChild(rodape);		// ou tabela.deleteTFoot()
		tabela.removeChild(corpo);
		*/
		
		loading.hide();
	};
	
	this.cleanTableGrid = function(tabela) {
		if (tabela!=null && tabela.tBodies[1]) {
			tabela.removeChild(tabela.tBodies[1]);
		}
	};
	
	
	/*
	 * Popula uma tabela com o json passado
	 *
	 * exemplo: fillTableGrid({
					tabela  : 'tbGrid',
					dados   : json.dados,
					bgLinha : ['#fff','#eee'],
					mensagem: ['300px','Nenhum Registro encontrado']
				}, forceNoRules);
	 *
	 * tabela		= id da tabela a ser populada - obj.tabela
	 * dados		= dados em json para popular o tbGrid - obj.dados
	 * bgLinha		= cores do background das linhas zebradas - obj.bgLinha[0] e obj.bgLinha[1]
	 * mensagem[0]	= Altura em pixel do splash
	 * mensagem[1]	= Mensagem a ser exibida
	 */
	this.fillTableGrid = function(obj, forceNoRules, fillZeroIfEmpty) {
		loading.show();
		
		
		var tabela, dados;
		var registros = 0;
		
		tabela		= get(obj.tabela);
		dados		= obj.dados;
		if(dados) {
			registros	= dados.length;
		}
		
		me.cleanDataTableGrid(tabela);
		
		if (registros <= 0) {
			loading.hide();
			
			if(fillZeroIfEmpty != true) {
				if (obj.mensagem) {
					me.hide(obj.tabela);
					me.html(obj.mensagem[0],obj.mensagem[1]);
					me.show(obj.mensagem[0]);
				}
				return false;
			}			
		} else {
			me.hide(obj.mensagem[0]);
			me.clean(obj.mensagem[0]);
			me.show(obj.tabela);
		}
		
		
		var corpo, linhas, bgLinhas, novaLinha;
		
		var tbodies;
		
		tbodies 	= tabela.tBodies;
		if(obj.bgLinha && obj.bgLinha[0] && obj.bgLinha[1]) {
			bgLinhas = [obj.bgLinha[0],obj.bgLinha[1]];
		}
		
		var hasRules = false;
		var rules = {};
		var k = 0;
		if(!forceNoRules) {
			for(var t = 0; t < tbodies.length; t++) {
				var classNameBody = tbodies[t].className;
				if(classNameBody.indexOf('rule') >= 0) {
					hasRules = true;
					rules[k] = {};
					var rule = classNameBody.split('[')[1].split(']')[0];
					var ruleSplit = rule.split('=');
					rules[k].ruleCol = ev.trim(ruleSplit[0]);
					rules[k].ruleVal = ev.trim(ruleSplit[1]);
					rules[k].indexTbody = t;
					k++;
				} else {
					corpo = tbodies[t];
				}
			}
		} else {
			corpo = tbodies[0];
		}
		
		var corpo1 = document.createElement("tbody");
		corpo1.id = 'dadosTabela';
		tabela.appendChild(corpo1);
		
		var linhasCounter = new Array();
		//copia o modelo da tabela
		if(registros > 0) {
			for (var i = 0; i < registros; i++) {
				var tbody = corpo;
				for(var r in rules) {
					if(this.equalsIgnoreCaseTrim( dados[i][rules[r].ruleCol], rules[r].ruleVal)) {
						tbody = tbodies[rules[r].indexTbody];
						break;
					}
				}
				linhas = tbody.rows.length;
				linhasCounter[i] = linhas;
				for (var j = 0; j < linhas; j++) {
					//Se não houverem regras, utilize o 'tbody' padrão (sem regras)
					if(!hasRules) {
						novaLinha = corpo.rows[j].cloneNode(true);
						if(bgLinhas) {
							novaLinha.style.backgroundColor = bgLinhas[i % 2];
						}
						corpo1.appendChild(novaLinha);
					}
					//Clone no 'tbody' que encaixa na regra
					else {
						novaLinha = tbody.rows[j].cloneNode(true);
						corpo1.appendChild(novaLinha);
					}
				}
			}
		} else if(fillZeroIfEmpty) {
			var tbody = corpo;
			linhas = tbody.rows.length;
			for (var j = 0; j < linhas; j++) {
				novaLinha = corpo.rows[j].cloneNode(true);
				if(bgLinhas) {
					novaLinha.style.backgroundColor = bgLinhas[i % 2];
				}
				corpo1.appendChild(novaLinha);
			}
		}
		
		var totalLinhas = corpo1.rows.length;
		var labels, totalLabels;
		var l = 0;
		
		//popula a tabela com os dados do json
		if(registros > 0) {
			for (var count = 0; count < registros; count++) {
				for(var lr = 0; lr < linhasCounter[count]; lr++) {
					labels		= corpo1.rows[l].getElementsByTagName('label');
					totalLabels	= labels.length;
					for (var m = 0; m < totalLabels; m++) {
						var label = corpo1.rows[l].getElementsByTagName('label')[m];
						var className = label.className;
						label.className = label.className + corpo1.rows[l].className;
						var value = dados[count][labels[m].getAttribute('id')];
						
						if(className != '' && className.indexOf('href') >= 0) {
							var funct = className.split('=')[1];
							var params = funct.split('(');
							if(params.length > 1) {
								params = params[1].split(')');
							}
							if(params.length > 0) {
								params = params[0];
							}
							params = params.split(',');
							
							for(var j = 0; j < params.length; j++) {
								var param = me.trim(params[j]);
								for(var col in dados[count]) {
									if(param == col) {
										funct = funct.replace(col, ('\'' + dados[count][col] + '\''));
									}
								}
							}
							label.value = funct;
							value = '<a href="javascript:;">' + value + '</a>';
							label.onclick = function() { eval(this.value);};
						}
						label.innerHTML = value;
					}
					l++;
				}
			}
		} else if(fillZeroIfEmpty) {
			for(var lr = 0; lr < totalLinhas; lr++) {
				labels		= corpo1.rows[l].getElementsByTagName('label');
				totalLabels	= labels.length;	
				for (var m = 0; m < totalLabels; m++) {
					var label = corpo1.rows[l].getElementsByTagName('label')[m];
					var className = label.className;
					label.className = label.className + corpo1.rows[l].className;
					var value = '-';
					
					label.innerHTML = value;
				}
				l++;
			}
		}
		
		loading.hide();
	};
	
	this.cleanDataTableGrid = function(tabela) {
		if (tabela != null) {
			if(typeof(tabela) == 'string') {
				tabela = get(tabela);
			}
			for(var k = 0; k < tabela.tBodies.length; k++) {
				if(tabela.tBodies[k].id == 'dadosTabela') {
					tabela.removeChild(tabela.tBodies[k]);
				} else {
					tabela.tBodies[k].style.display = 'none';
				}
			}
		}
	};
}