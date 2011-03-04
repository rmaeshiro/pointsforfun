/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */

function Menu() {
	var me = this;
	
	
	var menuAtivo			= '';
	var menuImageAtivo		= '';
	var submenuAtivo		= '';
	
	
	//Botoes do Menu
	//var menuHome		= ["images/menu/home.gif", "images/menu/home_ov.gif", "images/menu/home_on.gif"];
	this.menuConsultas	= ["images/menu/consultas.gif", "images/menu/consultas_ov.gif", "images/menu/consultas_on.gif"];
	var menuPedido		= ["images/menu/pedido_bobina.gif", "images/menu/pedido_bobina_ov.gif", "images/menu/pedido_bobina_on.gif"];
	var menuSair		= ["images/menu/sair.gif", "images/menu/sair_ov.gif", "images/menu/sair_on.gif"];
	
	
	
	
	this.init = function() {
		// menu over
		//get('menuHomeId').onmouseover			= function(){ me.over(this.id, menuHome); };
		get('menuConsultasId').onmouseover		= function(){ me.over(this.id, me.menuConsultas); };
		get('menuPedidoId').onmouseover			= function(){ me.over(this.id, menuPedido); };
		get('menuSairId').onmouseover			= function(){ me.over(this.id, menuSair); };
		
		// menu out
		//get('menuHomeId').onmouseout			= function(){ me.out(this.id, menuHome); };
		get('menuConsultasId').onmouseout		= function(){ me.out(this.id, me.menuConsultas); };
		get('menuPedidoId').onmouseout			= function(){ me.out(this.id, menuPedido); };
		get('menuSairId').onmouseout			= function(){ me.out(this.id, menuSair); };
		
		// menu click
		//get('menuHomeId').onclick				= me.goToHome;//function(){ me.click(this.id, menuHome, 1); };
		get('menuConsultasId').onclick			= function(){ me.click(this.id, me.menuConsultas, 22); };
		get('menuPedidoId').onclick				= function(){ me.click(this.id, menuPedido, 3); };
		//get('menuSairId').onclick				= function(){ me.click(this.id, menuSair, 0); };
		
		
		
		
		/*// Footer
		get('lnkPolitica').onclick = function() {
			app.instInfoPage = "Politica";
			menuAux		= 'institucional'
			submenuAux	= 'subInstitucional';
			me.itemClick('itemInstInformacoes',3);
		};*/
	};
	
	
	
	// funcoes do Menu
	this.over = function(menuId, menuImageSrc) {
		if (menuId != menuAtivo) {
			get(menuId).src = menuImageSrc[1];
		}
	};
	
	this.out = function(menuId, menuImageSrc) {
		if (menuId != menuAtivo) {
			get(menuId).src = menuImageSrc[0];
		}
	};
	
	this.click = function(menuId, menuImageSrc, pageLoaderId) {
		if (menuAtivo != '') {
			get(menuAtivo).src = menuImageAtivo;
		};
		
		get(menuId).src = menuImageSrc[2];
		
		menuAtivo = menuId;
		menuImageAtivo = menuImageSrc[0];
		
		if (pageLoaderId != 0 ) {
			me.loadPage(pageLoaderId);
		}
	};
	
	
	
	// funcoes do Submenu
	this.subclick = function(submenuId, pageLoaderId) {
		if (submenuAtivo != '') {
			get(submenuAtivo).className = "";
		};
		
		get(submenuId).className = "subativo";
		submenuAtivo = submenuId;
		
		if (pageLoaderId != 0 ) {
			me.loadPage(pageLoaderId);
		}
	};
	
	
	
	
	// funcoes da classe
	
	this.loadPage = function(pageLoaderId) {
		loader.id = pageLoaderId;
		loader.loadALL();
	};
	
	
	this.goToHome = function(){
		//me.click("menuHomeId", menuHome, 1);
		me.click("menuConsultasId", me.menuConsultas, 22);
	};
	
	this.sair = function() {
		me.click("menuSairId", menuSair, 0);
	}
}