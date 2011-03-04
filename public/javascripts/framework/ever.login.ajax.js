/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */

function Ajax(obj) {
	(!obj) ? obj={} : '';
	
	var me = this;
	var httprequest = null;
	var retorno		= null;
	
	
    //Metodo
    this.method = (obj.method || "post").toUpperCase();
	
	//URL para a conexão
	this.url = obj.url || "";
	
	//Se a Conexao será Assincrona
	this.async = obj.async || true;
    
    //Dados que serão enviados vai post: default=null
	this.params = obj.params || null;
    
	//Tipo de retorno desejado (text, xml ou json)
	this.mode = (obj.mode || "text").toLowerCase();
    
    
	//funcao de retorno em caso de sucesso
	this.callBack	= obj.callBack;
	this.beforeLoad	= obj.beforeLoad || '';//loading.on;
	this.afterLoad	= obj.afterLoad  || '';//loading.off;
	
	//funcao de retorno em caso de erro
	this.callError	= obj.callError || null;
	
	
	
	/* Cria o objeto httpRequest */
	this.initialize = function() {
		/* Mozilla, Safari, FireFox ... */
		if (window.XMLHttpRequest) {
		    httprequest = new XMLHttpRequest();
			
		/* IE */
		} else if (window.ActiveXObject) {
		    try{
			    httprequest = new ActiveXObject("Msxml2.XMLHTTP");
		    } catch(e) {
                try{
                    httprequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e){}
		    }
		}
	};
	
	
	me.load = function(){
		me.initialize();
		
		try{
			if (typeof(me.callBack)!="function") {
				throw("Função de CallBack inválida!")
			}
			
			/* Verifica se URL é válda */
	        if (me.url == undefined || me.url == '') {
	           throw("URL inválida!")
	        }
			
	        if (httprequest != null && httprequest != undefined ) {
                httprequest.onreadystatechange = me.processRequest;
	            httprequest.open(me.method, me.url, me.async);
				
				if (me.method == "POST") {
					httprequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=ISO-8859-1");
					httprequest.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
					httprequest.setRequestHeader("Cache-Control", "post-check=0, pre-check=0");
					httprequest.setRequestHeader("Pragma", "no-cache");
				}
				
				httprequest.send("ajax=true&" + me.params)
	        }else {
				//throw("Não conseguiu criar objeto httprequest")
				throw("Seu browser não conseguiu criar objeto de httprequest,\nsem ele você não conseguirá acessar este sistema!");
			}
		} catch(err) {
			me.showError(err);
		}
	};
	
	
	//metodo local que cuida do recebimento dos dados
	this.processRequest = function() {
		try {
			if (httprequest.readyState == 4 ) {
	            if(httprequest.status == 200 ) {
					switch (me.mode) {
						case "json":
							retorno = eval('('+ httprequest.responseText +')');
							if(me.jsonHasRC()){ return false; }
						break;
						case "text":
							retorno = httprequest.responseText;
						break;
						case "xml":
							retorno = httprequest.responseXML;
							//if(me.xmlHasRC()){ return false; }
						break;
						default:
							retorno = httprequest.responseText;
						break;
					}
					
					//Envia o Retorno da Requisicao para a funcao de passada
					me.callBack(retorno);
					
					//Limpa o Objeto e a Resposta do XHR
					retorno		= null;
					httprequest	= null;
					
				} else if (httprequest.status == 404 ){
                    me.showError('Erro 404 - Arquivo não encontrado');
					return false;
					
				} else if (httprequest.status == 500 ){
                    me.showError('Erro 500 - Falha no serviço');
					return false;
	            }
	        }
		} catch(err) {
			/*
			 * Se na string existir o texto "NS_ERROR_NOT_AVAILABLE",
			 * será tratodo para que lançar um Exception amigavel.
			 * Excluiso para o FF2
			 */
            if(err.toString().search(/NS_ERROR_NOT_AVAILABLE/) != -1){
                err = 'Ocorreu um erro interno no servidor, e o serviço estará temporariamente indisponivel.';
            }
            me.showError(err);
			
		}
	};
	
	
	this.jsonHasRC = function() {
		// verifica o JSON
		if (!retorno) {
			alert('Falha no serviço"');
			return true;
		}
		//varifica erros do Sistema
		if (parseInt(retorno.rc.sys) != 0) {
			me.showError(retorno.rc.msg, 'sys');
			return true;
		}
		//varifica erros da Aplicacao
		if (parseInt(retorno.rc.app) != 0) {
			//Troca de Senha
			if (retorno.rc.app == 994) {
				get('lblLogin').innerHTML = get('txtLogin').value;
				get('txtNovaSenha').value		= "";
				get('txtConfNovaSenha').value	= "";
				get('icon_alertaTS').innerHTML	= "";
				get('msgReturnTS').innerHTML	= "";
				
				hideShow('formLogin','formTrocaSenha');
				get('txtNovaSenha').focus();
				return true;
			//Erro ao logar
			} else {
				me.showError(retorno.rc.msg, 'app');
				return true;
			}
			
		} else {
			return false;
		}
	}
	
	
	//metodo local que trata os erros
	this.showError = function(err, tipo){
		var mensagem = '';
		(err.description) ? mensagem = err +' - '+ err.description : mensagem = err;
        //se for passado uma funcao de erro , passar a mensagem de erro
        (typeof(me.callError) == "function") ? me.callError(mensagem, tipo) : alert(mensagem);
	}
	
	
	//Funcao para cancelar a requisicao
	this.abortRequest = function(){
		 if (httprequest != null && httprequest != undefined ) {
			httprequest.abort();
		 }
	};
}