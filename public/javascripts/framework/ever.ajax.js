/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */

function Ajax(obj) {
	(!obj) ? obj={} : '';
	
	var me			= this;
	var sys			= 0;
	var app			= 0;
	var httprequest = null;
	var retorno		= null;
	
	loading.show();
	
	
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
	this.beforeLoad	= obj.beforeLoad || '';//loading.show;
	this.afterLoad	= obj.afterLoad  || '';//loading.hide;
	
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
	            httprequest.open(me.method, me.url, me.async);
                httprequest.onreadystatechange = me.processRequest;
				
				if (me.method == "POST") {
					httprequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=ISO-8859-1");
					httprequest.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
					httprequest.setRequestHeader("Cache-Control", "post-check=0, pre-check=0");
					httprequest.setRequestHeader("Pragma", "no-cache");
				}
				
				httprequest.send("ajax=true&" + me.params)
				loading.hide();
				/*if (me.mode == 'xml' || me.mode == 'json')
					me.beforeLoad();*/
				
				
	        }else {
				//throw("Não conseguiu criar objeto httprequest")
	        	loading.hideTotal();
				throw("Seu browser não conseguiu criar objeto de httprequest,\nsem ele você não conseguirá acessar este sistema!");
			}
		} catch(err) {
			loading.hideTotal();
			me.showError(err);
		}
	};
	
	
	//metodo local que cuida do recebimento dos dados
	this.processRequest = function() {
		try {
           	//if (typeof(me.beforeLoad)=='undefined') me.beforeLoad = loading.show;
            //if (typeof(me.afterLoad)=='undefined')  me.afterLoad  = loading.hide;
	        
			if (httprequest.readyState == 4 ) {
	            if(httprequest.status == 200 ) {
					switch (me.mode) {
						case "json":
							retorno = eval('('+ httprequest.responseText +')');
							if (me.jsonHasRC()) { return false; }
						break;
						case "text":
							retorno = httprequest.responseText;
						break;
						case "xml":
							retorno = httprequest.responseXML;
							//if(me.xmlHasRC()){ return false; }
						break;
						case "noRC":
							//nao trata o retorno, usado principalmente no Logoff
						break;
						default:
							retorno = httprequest.responseText;
					}
					
					//Envia o Retorno da Requisicao para a funcao de passada
					me.callBack(retorno);
					loading.hide();
					
					//Limpa o Objeto e a Resposta do XHR
					retorno		= null;
					httprequest	= null;
					
					//me.afterLoad();
					
				} else if (httprequest.status == 404 ){
                    loading.hideTotal();
                    me.showError('Erro 404 - Arquivo não encontrado');
					return false;
					
				} else if (httprequest.status == 500 ){
                    loading.hideTotal();
                    me.showError('Erro 500 - Falha no serviço');
					return false;
	            }/* else {
                    if (me.typeConnection != 'pooling') {
                        err = 'Ocorreu um erro interno no servidor, e o serviço estará temporariamente indisponivel.';
						me.showError(err);
                    }
	            }*/
	        }
		} catch(err) {
			/*
			 * Se na string existir o texto "NS_ERROR_NOT_AVAILABLE",
			 * será tratodo para que lançar um Exception amigavel.
			 * Excluiso para o FF2
			 */
            if (err.toString().search(/NS_ERROR_NOT_AVAILABLE/) != -1) {
				err = '<span class="red">Ocorreu um erro interno no sistema.</span><br />Serviço temporariamente indisponivel.<br />Tente novamente mais tarde.';
            }
            me.showError(err);
		}
	};
	
	
	this.jsonHasRC = function() {
		// verifica o JSON
		if (!retorno) {
			loading.hideTotal();
			alert('Falha no sistema. Tente novamente mais tarde."');
			return true;
		}
		
		sys				= parseInt(retorno.rc.sys);
		app				= parseInt(retorno.rc.app);
		var mensagem	= retorno.rc.msg;
		var stack		= retorno.rc.stack;
		
		
		//codigo 12 = timeout da aplicacao
		//codigo 75 = derrubado por outro usuario com mesmo login
		if (sys==12 || sys==75  ||  app==12 || app==75) {
			loading.hideTotal();
			ev.dialog.open({
				type: "alert", 
				msg: mensagem,
				stack: stack,
				callback: function(){
					this.href = "/portal-web-afiliacao";
					window.location = this.href;
				}
			});
			return true;
			
		} else if (sys != 0  || app != 0) {
			me.showError(mensagem, stack);
			return true;
			
		} else {
			return false;
		}		
	};
	
	
	//metodo local que trata os erros
	this.showError = function(err, stk){
		loading.hideTotal();
		var mensagem = '';
		(err.description) ? mensagem = err +' - '+ err.description : mensagem = err;
		var stack = stk || "";
        
		
        //se for passado uma funcao de erro , passar a mensagem de erro
        //(typeof(me.callError) == "function") ? me.callError(mensagem) : alert(mensagem);
		
		if (typeof(me.callError) == "function") {
			me.callError(mensagem);
		
		} else {
			ev.dialog.open({
				type: "alert", 
				msg: mensagem,
				stack: stack
			});
		}
	};
	
	
	//Funcao para cancelar a requisicao
	this.abortRequest = function(){
		if (httprequest != null && httprequest != undefined ) {
			httprequest.abort();
		}
	};
}
