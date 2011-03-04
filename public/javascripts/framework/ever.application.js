/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */

function Application() {
	var me = this;
	
	
	//mensagens de erro
	this.validationMessage			= "Há campos obrigatórios não preenchidos.";
	this.validationMessageDefault	= "Há campos obrigatórios não preenchidos na(s) seguinte(s) aba(s):";
	this.notFoundRegistryMessage	= "Nenhum registro foi encontrado.";
	this.notFoundItensMessage		= "Nenhum item adicionado.";
	this.saveMessageDefault			= "Os dados digitados não salvos serão perdidos. Deseja continuar?";
	this.saveSuccess				= "Solicitação de Afiliação salva com sucesso.";
	this.saveSuccessSE				= "Solicitação de Solução Eletrônica salva com sucesso.";
	this.exitSystemMessage			= "Deseja realmente sair do sistema?";
	
	this.bgLineOff					= '#fff';
	this.bgLineOn					= '#f0f9fb';
	
	
	
	this.goToHome = function() {
		menu.goToHome();
	};
	
	
	this.popularDadosUsuario = function() {
		ev.html('lblUsuario',userContext.usuario);
		ev.html('lblCpf',userContext.cpf);
		ev.loadCombo('cboMobe',userContext.mobe);
		ev.removeFirstItemCombo('cboMobe');
	};
	
	
	/*
	 * funcoes de configuracao do Brad Crum Trail (Tracker)
	 */
	this.resetTracker = function() {
		ev.hide(["seta2","link2", "seta3","link3"]);
		ev.cleanList(["btcLink1","btcLink2","btcLink3"]);
	};
	
	this.setTracker = function(btc) {
		me.resetTracker();
		
		for (var x=0; x < btc.nivel.length; x++) {
			ev.html(btc.nivel[x].linkId, btc.nivel[x].linkLabel);
			get(btc.nivel[x].linkId).onclick = btc.nivel[x].linkAcao;
			ev.showInline(btc.nivel[x].spanSetaId);
			ev.showInline(btc.nivel[x].spanLinkId);
		}
	};
	
	
	
	this.sair = function() {
		ev.dialog.open({
			type: ev.dialog.question,
			msg: me.exitSystemMessage,
			callback: logout
		});
			
			function logout() {
				/*ev.ajax({
					url		 : "login.logout.action",
					method	 : 'post',
					mode	 : 'noRC',
					callBack : function(){
						setTimeout(
							function(){
								this.href = "index.jsp";
								window.location = this.href;
							}, 1000
						)
					}
				});*/
				
				setTimeout(
					function(){
						this.href = "extrato.do?metodo=login&cpf=02204680877";
						window.location = this.href;
					}, 1000
				);
			}
	};
}