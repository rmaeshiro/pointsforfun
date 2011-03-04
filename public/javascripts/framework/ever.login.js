/*
 * JavaScript Document by:
 * EverSystems
 */

// Pega os elementos pelo id
function get(id) {
	if (document.getElementById) { return document.getElementById(id); }
	else if (document.all) { return document.all[id]; }
	else { return false; }
}
function show(id){ get(id).style.display = 'block' };
function hide(id){ get(id).style.display = 'none' };
function hideShow(idHide,idShow){ hide(idHide); show(idShow); };

var isIE = (window.ActiveXObject) ? true : false;;





function Login(){
	var ACTION_LOGIN			= "extrato.do?metodo=login";
	var ACTION_LOGINTROCASENHA	= "login.trocaSenhaAberta.action";

	var me			= this;

	var vForm		= 'formLogin';
	var dForm		= document.extratoForm;
	//var vFormSenha	= 'fromTrocaSenha';
	//var dFormSenha	= document.fromTrocaSenha;
	
	var icoAlerta	= new Image();	
	var icoError	= new Image();	
	var icoLoading	= new Image();	
	
	
	
	this.init = function() {
		icoAlerta.src  = "_framework/images/login/icon_alerta.gif";
		icoError.src   = "_framework/images/login/icon_error.gif";
		icoLoading.src = "_framework/images/login/loading.gif";
		
		vForm.method	= "post";
		vForm.action	= ACTION_LOGIN;
		
		
		get("btConfirmar").onclick	= me.executeLogin;
		get(vForm).onkeypress		= (isIE) ? function(){me.getEnter(event)} : me.getEnter;

		get("txtSenha").focus();
		
		
		if (parseInt(dados.rc.app) != 0) {
			me.showError("imgAlerta", "mensagem", dados.rc.msg);
			get("txtSenha").focus();
		}
		
		/*var ajax = new Ajax || null;
		ajax.initialize();
		if(!ajax){ return false; }
		ajax = null;*/
	};
	
	
/*
 * Funcoes do Login
 */
	// Login
	this.executeLogin = function() {
		/*
		if(!validation(vForm,'fieldErr','fielRight')){
			me.showAlert("icon_alerta", "msgReturnLogin", "Informe seu ID e Senha");
			return false;
		}
		
		me.showLoading("icon_alerta", "msgReturnLogin", "Acessando o sistema");
		var dados = "login.nomeLogin="+ get('txtLogin').value +"&login.senha="+ get('txtSenha').value;
		
		var ajax = new Ajax({
			url		 : ACTION_LOGIN,
			method	 : 'post',
			params	 : dados,
			mode	 : 'json',
			callBack : me.sucessLogin,
			callError: me.errorLogin
		});
		ajax.load();
		*/
		
		if (get("txtSenha").value == "") {
			me.showAlert("imgAlerta", "mensagem", "Informe sua Senha");
			get("txtSenha").focus();
			return false;
		}
		
		me.sucessLogin();
	};
	
	this.sucessLogin = function(resultado) {
		me.showLoading("imgAlerta", "mensagem", "Acessando o sistema");
		get(vForm).submit();
    };
	
	this.errorLogin = function(msg, tipo) {
		(tipo == 'app') ? 
			me.showError("icon_alerta", "msgReturnLogin", "ID ou Senha inválidos") : 
			me.showError("icon_alerta", "msgReturnLogin", "Erro de sistema. Tente mais tarde.");
    };
	
	
	
/*
 * Funcoes da Troca de Senha
 */
	// Executa a Troca da Senha
	this.executaTrocaSenha = function() {
		if(!validation(vFormSenha,'fieldErr','fielRight')){
			me.showAlert("icon_alertaTS", "msgReturnTS", "Preencha os campos obrigatórios");
			return false;
		}
		
		var novaSenha	= get('txtNovaSenha').value;
		var confSenha	= get('txtConfNovaSenha').value;
		
		if (novaSenha.length < 8) {
			get('txtNovaSenha').className = "mask-alphanum required fieldErr";
			get('txtNovaSenha').focus();
			me.showAlert("icon_alertaTS", "msgReturnTS", "Nova Senha com formato inválido");
			return false;
		}
		
		if (novaSenha != confSenha) {
			get('txtNovaSenha').className = "mask-alphanum required fieldErr";
			get('txtConfNovaSenha').className = "mask-alphanum required fieldErr";
			get('txtConfNovaSenha').focus();
			me.showAlert("icon_alertaTS", "msgReturnTS", "As senhas não conferem");
			return false;
		}
		get('txtNovaSenha').className = "mask-alphanum required";
		get('txtConfNovaSenha').className = "mask-alphanum required";
		
		
		me.showLoading("icon_alertaTS", "msgReturnTS", "Aguarde...");
		var dados = "login.nomeLogin="+ get('txtLogin').value +"&"+
					"oldPassword="+ get('txtSenha').value +"&"+
					"newPassword="+ get('txtNovaSenha').value +"&"+
					"newPasswordConf="+ get('txtConfNovaSenha').value;
		
		var ajax = new Ajax({
			url		 : ACTION_LOGINTROCASENHA,
			method	 : 'post',
			params	 : dados,
			mode	 : 'json',
			callBack : me.sucessChangePass,
			callError: me.errorChangePass
		});
		ajax.load();
	};
	
	this.sucessChangePass = function(resultado) {
		get('txtSenha').value = get('txtNovaSenha').value;
		me.showLoading("icon_alertaTS", "msgReturnTS", "Senha alterada com sucesso");
		setTimeout(function(){me.showLoading("icon_alertaTS", "msgReturnTS", "Acessando o sistema");}, 2000);
		setTimeout(function(){me.executeLogin();}, 3000);
    };
	
	this.errorChangePass = function(msg, tipo) {
		me.showError("icon_alertaTS", "msgReturnTS", "Erro de sistema. Tente mais tarde.");
    };
	
	
	
/*
 * Funcoes Genericas
 */
	//envia o form de login ao teclar o Enter
	this.getEnter = function(e) {
		var codigo;
		(isIE) ? codigo = e.keyCode : codigo = e.which ? e.which : e.charCode;
		if (codigo == 13) me.executeLogin();
	};
	this.getEnterTS = function(e) {
		var codigo;
		(isIE) ? codigo = e.keyCode : codigo = e.which ? e.which : e.charCode;
		if (codigo == 13) me.executaTrocaSenha();
	};
	
	
	this.showAlert = function(idImgAlert, idMsgAlert, msgAlert) {
		get(idImgAlert).src = icoAlerta.src;
		get(idMsgAlert).innerHTML = "<span class='orange'>"+ msgAlert +"</span>";'';
	};
	
	this.showLoading = function(idIcoLoading, idMsgLoading, msgLoading) {
		get(idIcoLoading).src = icoLoading.src;
		get(idMsgLoading).innerHTML = "<span class='green'>"+ msgLoading +"</span>";
	};
	
	this.showError = function(idIcoErro, idMsgError, msgError) {
		get(idIcoErro).src = icoError.src;
		get(idMsgError).innerHTML = "<span class='red'>"+ msgError +"</span>";
	};
}


window.onload = function() {
	var login = new Login();
	login.init();
};