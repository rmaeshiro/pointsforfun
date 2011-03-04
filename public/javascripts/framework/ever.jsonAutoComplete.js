/*
 * JavaScript Document by:
 * EverSystems - www.eversystems.com.br
 */


/*function get(id) {
	return document.getElementById(id)
}*/


function JsonAutoComplete(obj) {
	var me					= this;
	var regexp				= /[\(\)]/g;
	
	var objeto				= obj.objeto;
	var dados				= obj.dados;
	var atributo			= obj.atributo;
	var totalDados			= dados.length;
	var campo				= obj.campo;
	var divResult			= obj.div;
	var divResultClass		= obj.divResultClass	|| "divAutocomplete";
	var itensNormalClass	= obj.itemClass			|| "divItens";
	var itensOverClass		= obj.itemOverClass		|| "divItensOver";
	var itensColor			= obj.itemColor			|| "#000";
	var itemBgColor			= obj.itemBgColor		|| "#fff";
	var itemBgColorSel		= obj.itemBgColorSel	|| "#ddd";
	var itemBold			= obj.itemBold			|| false;
	var callback			= obj.callback			|| function(){};
	
	var itens				= "";
	var arrayIds			= [];
	var totalIds			= 0;
	
	this.selecionado		= false;
	divAberto				= "";
	
	
	var prevIndex;
	var atualIndex;
	var nextIndex;
	
	var topo;
	var fatorScroll;
	var posCursor;
	
	
	this.init = function() {
		get(campo).onkeydown = me.detectEvent;
		get(campo).onkeyup   = me.execute;
		
		//Cria o Div de Resultado do Autocomplete
		var newDiv = document.createElement("div");
		newDiv.setAttribute("id",divResult);
		document.getElementsByTagName("body").item(0).appendChild(newDiv);
		newDiv = null;
		
		//Configura o Div Autocomplete
		/*get(divResult).style.top	 = (get(campo).offsetTop + get(campo).offsetHeight) +"px";
		get(divResult).style.left	 = get(campo).offsetLeft +"px";*/
		get(divResult).style.width	 = get(campo).offsetWidth +"px";
		get(divResult).className	+= " divAutocomplete";
		
		
		document.getElementsByTagName("body").item(0).onclick = function() {
			if(divAberto!=""){
				get(divAberto).style.display = 'none';
			}
		}
		
		
		for (var x=0; x<totalDados; x++) {
			var replaceValor = dados[x][atributo];
			replaceValor = replaceValor.replace("\(","- ");
			dados[x][atributo] = replaceValor.replace("\)","");
		}
	}
	
	
	
	this.execute = function(e) {
		var evt		= e || window.event;
		var busca	= true;
		me.selecionado	= false;
		
		switch(evt.keyCode) {
			case  9: case 13:
			case 18: case 27:
			case 33: case 34:
			case 38: case 40:
				busca = false;
			break;
			
			default:
				busca = true;
		}
		
		if (busca) {
			var valor	= (get(campo).value).replace(regexp,"");
			//var valor	= get(campo).value;
			result		= "";
			itens		= "";
			arrayIds	= [];
			
			if (valor.length > 0) {
				var valorComp = new RegExp(valor,"i");
				
				for (var i=0; i<totalDados; i++) {
					var texto = dados[i][atributo];
					//var txtComp	= texto.replace(regexp,"");
					
					if (texto.search(valorComp) >= 0) {
						texto = texto.replace(valorComp,"<b>"+texto.match(valorComp)+"</b>");
						itens += '<div id="'+ i +'" onclick="'+objeto+'.selecionar('+ i +');" onmouseover="'+objeto+'.mouseEmcima(this.id,true);" onmouseout="'+objeto+'.mouseSaiu(this.id)" class="'+ itensNormalClass +'" style="color:'+ itensColor +'">'+ texto +'</div>';
						arrayIds.push(i);
					}
				}
				
				if (arrayIds.length > 0) {
					result += itens;
					get(divResult).innerHTML = result;
					me.abrir();
				} else {
					result = "";
					get(divResult).innerHTML = result;
					get(divResult).style.display = "none";
				}
			} else {
				result = "";
				get(divResult).innerHTML = "";
				me.fechar();
				
			}
		}
	};
	
	this.resetVars = function() {
		prevIndex	= -2;
		atualIndex	= -1;
		nextIndex	=  0;
		topo		=  0;
		
		divHeight	= 200; //altura maxima do divResultado
		posCursor	= divHeight / 2;
		fatorScroll	= get(divResult).offsetTop + divHeight + posCursor;
		get(divResult).scrollTop = 0;
	};
	
	this.mouseEmcima = function(id,mouse) {
		get(id).style.background	= itemBgColorSel;
		get(id).style.cursor		= "pointer";
		//get(id).className = itensOverClass;
		if(itemBold){ get(id).style.fontWeight = "bold"; }
		
		if (mouse && arrayIds[atualIndex]) {
			me.mouseSaiu(arrayIds[atualIndex]);
			for (var x=0; x<totalIds; x++) {
				if (arrayIds[x] == id) {
					atualIndex	= x;
					prevIndex	= atualIndex - 1;
					nextIndex	= atualIndex + 1;
					break;
				}
			}
		}
	};
	this.mouseSaiu = function(id) {
		get(id).style.background = itemBgColor;
		get(id).style.fontWeight = "normal";
		//get(id).className = itensNormalClass;
	};
	this.selecionar = function(id) {
		if (typeof(id) == "number") {
			me.selecionado = true;
			get(campo).value = dados[id][atributo];
			get(campo).blur();
			me.fechar();
			
			callback(id);
		}
	};
	
	this.abrir = function() {
		divAberto = divResult;
		get(divResult).style.display = "block";
		me.resetVars();
	};
	this.fechar = function() {
		divAberto = "";
		me.resetVars();
		get(divResult).style.display = "none";
	};
	this.sair = function() {
		setTimeout(me.fechar, 500);
	};
	
	
	
	this.detectEvent = function(e) {
		var evt = e || window.event;
		totalIds = arrayIds.length;
		//alert(evt.type +'\n'+ evt.keyCode +'\n'+ evt.charCode);
		
		if (totalIds > 0){
			var selectedItem = arrayIds[atualIndex];
			
			switch(evt.keyCode) {
				//Down e PageDown
				case 40:
				case 34:
					if (nextIndex < totalIds) {
						selectedItem = arrayIds[atualIndex];
						
						(atualIndex>-1) ?
							me.mouseSaiu(selectedItem) :
							me.mouseSaiu(arrayIds[0]);
						
						prevIndex++;
						atualIndex++;
						nextIndex++;
						
						selectedItem = arrayIds[atualIndex];
						me.mouseEmcima(selectedItem,false);
						me.moveDown(selectedItem,true);
						
						if (nextIndex == totalIds) {
							nextIndex = totalIds;
							atualIndex = nextIndex-1;
							prevIndex = atualIndex-1;
						}
					}
				break;
				
				//Up e PageUp
				case 38:
				case 33:
					if (prevIndex > -1) {
						selectedItem = arrayIds[atualIndex];
						me.mouseSaiu(arrayIds[nextIndex-1]);
						
						prevIndex--;
						atualIndex--;
						nextIndex--;
						
						if (prevIndex < -1) {
							prevIndex = 0;
							atualIndex = 0;
							nextIndex = 1;
						}
						selectedItem = arrayIds[atualIndex];
						me.mouseEmcima(selectedItem,false);
						me.moveUp(selectedItem,false);
					}
				break;
				
				//Enter
				case 13:
					me.selecionar(selectedItem);
				break;
				
				//Tab e Esc
				case  9:
				case 27:
					me.selecionado = false;
					me.fechar();
			}
		}
	};
	
	this.moveDown = function(posArray) {
		topo = (fatorScroll + get(posArray).offsetTop) - posCursor;
		if (topo > fatorScroll) {
			get(divResult).scrollTop += 20;
		}
	};
	this.moveUp = function(posArray) {
		topo = (fatorScroll + get(posArray).offsetTop) - posCursor;
		(topo > fatorScroll) ?
			get(divResult).scrollTop = topo - fatorScroll :
			get(divResult).scrollTop = 0;
	};
}