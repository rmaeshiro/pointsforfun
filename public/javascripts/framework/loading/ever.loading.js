/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */

function Loading() {
	var me = this;
	
	var divLoading	 = "loading";
	var divModal	 = "loadingModal";
	var loadingCount = 0;
	var loadingTime;
	
	
	this.show = function() {
		var screenAvailHeight		= document.documentElement.clientHeight;
		var screenAvailWidth		= document.documentElement.clientWidth;
		var documentScrollTop		= document.documentElement.scrollTop
		
		var top  = documentScrollTop + Math.floor((screenAvailHeight / 3) - 60/2);
		var left = Math.floor((screenAvailWidth / 2) - 100/2);
		if (top  < 0) top  = 20;
		if (left < 0) left = 20;
		
		get(divLoading).style.top	= top +'px';
		get(divLoading).style.left	= left +'px';
		
		
		var sizeModal = dbody.offsetHeight;
		get(divModal).style.height = sizeModal;
		
		ev.show(divModal);
		ev.show(divLoading);
		
		loadingCount++;
		
		//loadingTime = setTimeout('loading.hideTotal()',1000);
	};
	
	
	this.hide = function() {
		loadingCount--;
		if(loadingCount<=0){ loading.hideTotal(); }
	};
	
	
	this.hideTotal = function() {
		loadingCount = 0;
		//clearTimeout(loadingTime);
		ev.hide(divModal);
		ev.hide(divLoading);
	};
	
	
	this.create = function() {
		/*
		 * TODO
		 * 
		 * criar os divs dinamicamente
		 * verificar IE6 para criar o iframe
		 */
	};
};
var loading = new Loading();
//loading.create();