/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */

//matriz com a relação da páginas
var myIndice = {"pages": [
		/* MENU */
		{"ID":  1, "alias":"Home", "html":"jsps/extrato/html/home/home.html", "js":"jsps/extrato/js/home/home.js"},
		
		{"ID":  2, "alias":"Consultas",			"html":"jsps/extrato/html/consultas/diario.html",	"js":"jsps/extrato/js/consultas/diario.js"  },
		{"ID": 21, "alias":"ExtratoDiario",		"html":"jsps/extrato/html/consultas/diario.html",	"js":"jsps/extrato/js/consultas/diario.js"  },
		{"ID": 22, "alias":"ExtratoMensal",		"html":"jsps/extrato/html/consultas/mensal.html",	"js":"jsps/extrato/js/consultas/mensal.js"  },
		{"ID": 23, "alias":"ExtratoPorPeriodo",	"html":"jsps/extrato/html/consultas/periodo.html",	"js":"jsps/extrato/js/consultas/periodo.js" },
		
		{"ID":  3, "alias":"PedidoBobina",		"html":"jsps/extrato/html/pedido/bobina.html",		"js":"jsps/extrato/js/pedido/bobina.js" },
		
		
		/* FOOTER */
		{"ID": 100, "alias":"Empresa",			"html":"jsps/extrato/html/institucional/empresa.html"  },
		{"ID": 101, "alias":"Seguranca",		"html":"jsps/extrato/html/institucional/seguranca.html"  },
		{"ID": 102, "alias":"Politica",			"html":"jsps/extrato/html/institucional/politica.html"  },
		{"ID": 103, "alias":"Termos",			"html":"jsps/extrato/html/institucional/termos.html"  }
		
		
		/* LINKS NA HOME */
    ]
};



function Loader(id,div,callBack,notDisableStyle){
    this.id					= id || 0;
	this.div 				= div || "content";
	this.callBack 			= callBack || function(){};
	//este parametro define se o estilo anterior via ser ou não desabilitado
	//necessario estar setado pra true nas telas de splash 
	this.notDisableStyle	= notDisableStyle || false;
    var objPage				= "";
    
	var me = this;
	
	
    this.loadALL = function(){
        objPage = me.findPage(myIndice, me.id)
		
        if ((objPage)!=0){			
			if (objPage.html) {
				//me.loadCSS();
				if(isIE){
        	        var isIE7 = (typeof document.body.style.maxHeight != "undefined")?true:false;
            	    if (!isIE7){
                	    pause(200);
                	}
            	}
				me.loadHTML();
			} else { // abri popup
				me.openPopup();				
			}
        }
    }
	
    function pause(numberMillis){
        var dialogScript = 
           'window.setTimeout(' +
           ' function () { window.close(); }, ' + numberMillis + ');';
        var result = 
        //For IE5.
         window.showModalDialog(
           'javascript:document.writeln(' +
            '"<script>' + dialogScript + '<' + '/script>")');
    }
	
	
    //metodo local que procura as propiedades de um id 
    this.findPage = function(matriz,id){
        for (var x=0; x<myIndice.pages.length;x++){
            if(matriz.pages[x].ID==id){
                return myIndice.pages[x]
            }
        }
        return 0;
    }
	
	
	this.fullDate = function(){
		var now = new Date();
		var fullDate = now.getDate() +'/'+ now.getMonth() +'/'+ now.getFullYear() +' '+ now.getHours() +':'+ now.getMinutes() +':' + now.getSeconds();// + ':' + now.getMilliseconds();
		return fullDate;
	}
    
	
    this.openPopup = function() {
    	var objPage = me.findPage(myIndice,me.id);
    	//popups(objPage.popup, objPage.name, objPage.width, objPage.height, objPage.scroll, objPage.resize);
    }
	
	
	
	
/*** HTML ***/

    this.loadOnlyHTML = function(pDiv, pId){
		var div = pDiv || me.div;
		var id  = pId  || me.id;
		
	    var objPage = me.findPage(myIndice,id);
		
		ev.ajax({
			url		 : objPage.html +'?'+ me.fullDate(),
			method	 : 'get',
			callError: me.returnPageError,
			callBack : function(page){
				get(div).innerHTML = page;
			}
		});
    }


    this.loadHTML = function(){
	    var objPage = me.findPage(myIndice,me.id)
		
		ev.ajax({
			url		 : objPage.html +'?'+ me.fullDate(),
			method	 : 'get',
			callBack : me.returnPage,
			callError: me.returnPageError
		});
    }
    
    this.returnPage = function(page){
        get(me.div).innerHTML = page;
        me.loadJS();
    }
	
    this.returnPageError = function(mensagem){
        alert(mensagem);
    }
	
	
	
/*** JS ***/

    this.loadJS = function(){
		objPage=me.findPage(myIndice,me.id)
        var e = document.createElement("script");
        e.src = objPage.js +'?'+ me.fullDate();
        e.type="text/javascript";
		document.getElementsByTagName("head").item(0).appendChild(e);
		
		e.onload = me.callBack;
		e.onreadystatechange = function(){ if(/complete|loaded/.test(e.readyState)){ me.callBack(); } };
    }
	
	
	
/*** CSS ***/

    this.loadCSS = function(){
		objPage=me.findPage(myIndice,me.id)
      	
        var e=document.createElement("link")
		e.setAttribute("rel", "alternate stylesheet");
        e.setAttribute("type", "text/css");
        e.setAttribute("href", objPage.css +'?'+ me.fullDate());
        e.setAttribute("title", objPage.alias);
        e.setAttribute("id", objPage.alias);
       
        document.getElementsByTagName("head").item(0).appendChild(e);
		
		if(isIE){
			e.onreadystatechange = function(){ if(/complete|loaded/.test(e.readyState)){ me.setActiveStyleSheet(); } };
		}else{
			e.onload = me.setActiveStyleSheet();	
		}
    }
    
	/*this.loadCSS=function(){
        objPage=me.findPage(myIndice,me.id);
        var ajax = new AJAX();
        ajax.mode="T";
        ajax.method ="get"
        ajax.url= objPage.css;
        ajax.callError = me.returnPageError;
        ajax.callBack = me.returnCss;
        ajax.load();	
	}
	this.returnCss = function(cssFile){
        objPage=me.findPage(myIndice,me.id)
      	
        var e=document.createElement("link")
		e.setAttribute("rel", "alternate stylesheet");
        e.setAttribute("type", "text/css");
        e.setAttribute("href", objPage.css);
        e.setAttribute("title", objPage.alias);
        e.setAttribute("id", objPage.alias);
       
        document.getElementsByTagName("head").item(0).appendChild(e);
        get(objPage.alias).innerHTML = cssFile;
        //e.innerHTML = cssFile;
        me.setActiveStyleSheet();
        me.loadHTML();
	}*/
	
    this.setActiveStyleSheet=function () {
        var i, a, main;
		var title = objPage.alias
        for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
            if(a.getAttribute("rel").indexOf("style") != -1
            && a.getAttribute("title")) {
				if (!me.notDisableStyle)
                	a.disabled = true;
                if(a.getAttribute("title") == title) a.disabled = false;
            }
        }
    }
}

/*
 * -> start.js
var objLoader = new Loader();
*/