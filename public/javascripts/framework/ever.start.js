/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */

function Start() {
	this.screenAvailHeight	= screen.availHeight;
	this.screenAvailWidth	= screen.availWidth;
	this.topOfLoading		= Math.floor((screenAvailHeight / 3) -  75/2); // 75 = altura do Loading
	this.leftOfLoading		= Math.floor((screenAvailWidth / 2)  - 115/2); //115 = largura do Loading
	this.topOfDialog		= Math.floor((screenAvailHeight / 3) - 150/2); //150 = altura do Dialog
	this.leftOfDialog		= Math.floor((screenAvailWidth / 2)  - 360/2); //360 = largura do Dialog
	this.dbody				= document.getElementsByTagName("body").item(0);
	
	
	// instancia as Classes
	this.ev			 = new EverSystems();
	this.loader		 = new Loader();
	this.menu		 = new Menu();
	this.app		 = new Application();
	
	this.userContext = {
		usuario	: dados.usuario.nome,
		cpf		: dados.usuario.cpf,
		mobe	: dados.usuario.mobe
	};
	
	
	
	/*
	 * Funcoes de Inicializacao
	 */
	menu.init();
	menu.goToHome();
	app.popularDadosUsuario();	
		
	
	
	/*
	 * Eventos
	 */
	//menu
	get('logo').onclick				= menu.goToHome;
	get('cboMobe').onchange			= menu.goToHome;
	get('btcHome').onclick			= menu.goToHome;
	get('menuSairId').onclick		= app.sair;
	
	//footer
	get('lnkEmpresa').onclick		= function(){ ev.splash.open({width:600, height:255, page:100}); };
	get('lnkSeguranca').onclick		= function(){ ev.splash.open({width:600, height:263, page:101}); };
	get('lnkPolitica').onclick		= function(){ ev.splash.open({width:600, height:550, page:102}); };
	get('lnkTermos').onclick		= function(){ ev.splash.open({width:600, height:550, page:103}); };
}

window.onload = Start;


window.onresize = function() {
	screenAvailHeight	= document.documentElement.clientHeight;
	screenAvailWidth	= document.documentElement.clientWidth;
	documentScrollTop	= document.documentElement.scrollTop
	
	// Loading
	if(get("loading").style.display == "block") {
		var loadingTop  = documentScrollTop + Math.floor((screenAvailHeight / 3) - 60/2);
		var loadingLeft = Math.floor((screenAvailWidth / 2) - 100/2);
		if (loadingTop < 0) loadingTop = 20;
		if (loadingLeft < 0) loadingLeft = 20;
		get("loading").style.top  = loadingTop +'px';
		get("loading").style.left = loadingLeft +'px';
	}
	
	// Dialog
	if(get("dialog").style.display == "block") {
		var dialogTop  = documentScrollTop + Math.floor((screenAvailHeight / 3) - 150/2);
		var dialogLeft = Math.floor((screenAvailWidth / 2) - 360/2);
		if (dialogTop < 0) dialogTop = 20;
		if (dialogLeft < 0) dialogLeft = 20;
		get("dialog").style.top  = dialogTop +'px';
		get("dialog").style.left = dialogLeft +'px';
	}
	
	// Splash
	if(get("splash").style.display == "block") {
		var splashTop  = documentScrollTop + Math.floor((screenAvailHeight / 3) - 350/2);
		var splashLeft = Math.floor((screenAvailWidth / 2) - 600/2);
		if (splashTop < 0) splashTop = 20;
		if (splashLeft < 0) splashLeft = 20;
		get("splash").style.top  = splashTop +'px';
		get("splash").style.left = splashLeft +'px';
	}
}
