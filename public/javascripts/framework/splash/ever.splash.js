/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */

function Splash() {
	var me = this;
	
	var divSplash		= "splash";
	var divModal		= "splashModal";
	var divContent		= "splashContent";
	var divContainer	= "splashContainer";
	var btnClose		= "splashBtnClose";
	
	var defWidth		= 600;
	var defHeight		= 350;
	//var defTop		= 140;
	//var defLeft		= 340;
	
	
	
	this.create = function() {
		//implementar
		me.load();
	};
	
	this.load = function() {
		get(btnClose).onclick	= me.close;
		get(divModal).onclick	= me.close;
	};
	
	
	this.open = function(config) {
		get(divContainer).innerHTML = "";
		
		var width	= config.width	|| defWidth;
		var height	= config.height	|| defHeight;
		
		
		var top = Math.floor((screenAvailHeight / 3) - height / 2);
		if (height > (screenAvailHeight / 2))
			top = Math.floor((screenAvailHeight - height) / 3);
		
		var left = Math.floor((screenAvailWidth - width) / 2);
		
		if (top  < 0) top  = 20;
		if (left < 0) left = 20;
		
		
		
		with (get(divSplash)) {
			style.width		= width +"px";
			style.height	= height +"px";
			style.top		= document.documentElement.scrollTop + top +"px";
			style.left		= left +"px";
		}
		
		with (get(divContent)) {
			style.width		= (width - 20) +"px";
			style.height	= (height - 30) +"px";
			style.overFlowY = "auto";
		}
		
		
		loader.loadOnlyHTML(divContainer, config.page);
		
		
		ev.show(divModal);
		ev.show(divSplash);
	};
	
	
	this.close = function(callback) {
		get(divContent).scrollTop = 0;
		ev.hide(divSplash);
		ev.hide(divModal);
		
		if (typeof(callback) == 'function') {
			callback();
		}
	};
}