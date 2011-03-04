/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */

function Dialog() {
	var me = this;
	
	var divDialog	= "dialog";
	var divModal	= "dialogModal";
	
	this.info		= "info";
	this.alert		= "alert";
	this.error		= "error";
	this.question	= "question";
	
	
	this.create = function() {
		//implementar
		me.load();
	};
	
	this.load = function() {
		//preload das imagens
		img_iconInfo	 = new Image();		img_iconInfo.src	 = "_framework/dialog/images/info_icon.gif";
		img_iconAlert	 = new Image();		img_iconAlert.src	 = "_framework/dialog/images/alert_icon.gif";
		img_iconError	 = new Image();		img_iconError.src	 = "_framework/dialog/images/error_icon.gif";
		img_iconQuestion = new Image();		img_iconQuestion.src = "_framework/dialog/images/question_icon.gif";
		
		img_btnOk		 = new Image();		img_btnOk.src		 = "_framework/dialog/images/btn_ok.gif";
		img_btnSim		 = new Image();		img_btnSim.src		 = "_framework/dialog/images/btn_sim.gif";
		img_btnNao		 = new Image();		img_btnNao.src		 = "_framework/dialog/images/btn_nao.gif";
		
		//variaveis para escrita das imagens
		iconInfo			= '<img id="dialogIconInfo" src="'+ img_iconInfo.src +'" />';
		iconAlert			= '<img id="dialogIconAlert" src="'+ img_iconAlert.src +'" />';
		iconError			= '<img id="dialogIconError" src="'+ img_iconError.src +'" />';
		iconQuestion		= '<img id="dialogIconQuestion" src="'+ img_iconQuestion.src +'" />';
		
		btnOk				= '<input type="button" id="btnOk" class="btnSplash handLink" />';
		btnSim				= '<input type="button" id="btnSim" class="btnSplash handLink" />';
		btnNao				= '<input type="button" id="btnNao" class="btnSplash handLink" />';
	};
	
	
	this.open = function(obj) {
		var type			= obj.type;
		var message			= obj.msg;
		var fnCallback		= obj.callback || function(){};
		var fnCallbackAux	= obj.callbackAux || function(){};
		var sizeNoBody		= dbody.offsetHeight;
		var botaoAtivo		= "";
		
		
		var top  = Math.floor((screenAvailHeight / 3) - 150/2);
		var left = Math.floor((screenAvailWidth / 2)  - 360/2);
		if (top  < 0) top  = 20;
		if (left < 0) left = 20;
		
		get(divDialog).style.top	= document.documentElement.scrollTop + top +"px";
		get(divDialog).style.left	= left +"px";
		get(divModal).style.height	= sizeNoBody;
		
		
		switch(type) {
			case "info":
				message = '<label class="msgInfo">'+ message +'</label>';
				
				botaoAtivo = "btnOk";
				ev.html("dialogIcon", iconInfo);
				get("dialogIcon").src = img_iconInfo.src;
				
				ev.html("dialogButton", btnOk);
				get("btnOk").onclick = function(){ me.close(fnCallback); };
				
				ev.show("dialogIconInfo");
			break;
			
			case "alert":
				message = '<label class="msgAlert">'+ message +'</label>';
				
				botaoAtivo = "btnOk";
				ev.html("dialogIcon", iconAlert);
				get("dialogIcon").src = img_iconAlert.src;
				
				ev.html("dialogButton", btnOk);
				get("btnOk").onclick = function(){ me.close(fnCallback); };
				
				ev.show("dialogIconAlert");
			break;
			
			case "error":
				message = '<label class="msgError">'+ message +'</label>';
				
				botaoAtivo = "btnSim";
				ev.html("dialogIcon", iconError);
				get("dialogIcon").src = img_iconError.src;
				
				ev.html("dialogButton", btnSim +"&nbsp;&nbsp;"+ btnNao);
				get("btnSim").onclick = function(){ me.close(fnCallback); };
				get("btnNao").onclick = function(){ me.close(fnCallbackAux); };
				
				ev.show("dialogIconError");
			break;
			
			case "question":
				message = '<label class="msgQuestion">'+ message +'</label>';
				
				botaoAtivo = "btnSim";
				ev.html("dialogIcon", iconQuestion);
				get("dialogIcon").src = img_iconQuestion.src;
				
				ev.html("dialogButton", btnSim +"&nbsp;&nbsp;"+ btnNao);
				get("btnSim").onclick = function(){ me.close(fnCallback); };
				get("btnNao").onclick = function(){ me.close(fnCallbackAux); };
				
				ev.show("dialogIconQuestion");
			break;
		}
		
		ev.html("dialogMessage", message);
		
		
		ev.show(divModal);
		ev.show(divDialog);
		get(botaoAtivo).focus();
	};
	
	
	this.close = function(callback) {
		ev.hide(divDialog);
		ev.hide(divModal);
		
		if (typeof(callback) == "function") {
			callback();
		}
	};
}