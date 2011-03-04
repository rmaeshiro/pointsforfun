/*
 * JavaScript Document by:
 * EverSystems
 */


//function $(id) {return document.getElementById(id);}

var isIE = (window.ActiveXObject)?true:false;





//---------------------------------------- maskform.js ----------------------------------------//

function maskForm(vForm){
	if(vForm){
		var r = new Restrict(vForm.name);
	    //varre todos os elementos do form
	    for (var x = 0;x<vForm.length;x++) {
	        var elm = (vForm[x].id == '') ? vForm[x].name:vForm[x].id;
			//alert(elm +'\n'+ get(elm) +'\n'+ get(elm).id);
	        var elClasses = vForm[elm].className;
			// verifica se a classe existe
			if(typeof(elClasses) != "undefined"){
	        	elClasses = elClasses.split(" ");
				//varre todas as classes do elemento
				for(var y = 0; y<=elClasses.length;y++){
					switch (elClasses[y]){
						case 'mask-date':
							r.field[get(elm).name] = "\\d/";
							r.mask[get(elm).name]= "##/##/####";                
							addEvent(get(elm),'paste',function(){return false});
						break;
						
						case 'mask-calendar':
							r.field[get(elm).name] = "\\d/";
							r.mask[get(elm).name]= "##/##/####";                
							addEvent(get(elm),'paste',function(){return false});
							
							
							/*if(!get(elm + '_imgDataPicker')){
                                //create img calendar element
								var imgElement = document.createElement("img");
                                    //config img element, this way works in IE, FF, etc
                                    imgElement.setAttribute("id",  get(elm).id+ "_imgDataPicker");   
                                    imgElement.setAttribute("src", "_framework/thirdparty/jscalendar/1.0/skins/images/calendario.gif");   
                                    imgElement.setAttribute("style", "vertical-align:top; margin-left:5px;");   
                                    imgElement.setAttribute("alt", "Selecione uma Data");
                                //workaround to implements inserAfter. The command bellow means: insert img node after text node
                                get(elm).parentNode.insertBefore(imgElement, get(elm).nextSibling);
                                                                 
								Calendar.setup({
									inputField     :    get(elm).id,     // id of the input field
									ifFormat       :    "%d/%m/%Y",      // format of the input field
									button         :    get(elm).id + "_imgDataPicker",  // trigger for the calendar (button ID)
									align          :    "Bl",           // alignment (defaults to "Bl")
									singleClick    :    true
								});
							}*/
						break;
						
						case 'mask-money':
							//if(isIE){ get(elm).maxLength='18' }else{ get(elm).maxLength='22'}
							addEvent(get(elm),'paste',function(){return false});
							formatCurrency(get(elm), 2, ".", ",");
						break;
						
						case 'mask-rate':
							addEvent(get(elm),'paste',function(){return false});
							formatCurrency(get(elm), 2, ".", ".");
						break;
						
						case 'input-ucase':
							get(elm).style.textTransform='uppercase';
							addEvent(get(elm),'blur',function(){get(elm).value = get(elm).value.toUpperCase()});
						break;
						
						case 'input-lcase':
							get(elm).style.textTransform='lowercase';
							addEvent(get(elm),'blur',function(){get(elm).value = get(elm).value.toLowerCase()});
						break; 
						
						case 'mask-cpf':
							MaskInput(get(elm),"999.999.999-99");
							removeEvent(get(elm),'blur');
							addEvent(get(elm),'paste',function(){return false});
						break;
						
						case 'mask-cnpj':
							MaskInput(get(elm),"99.999.999/9999-99");
							removeEvent(get(elm),'blur');
							addEvent(get(elm),'paste',function(){return false});
						break;
						
						case 'mask-cpfcnpj':
							get(elm).maxLength=18;
							MaskInput(get(elm),"9^");
							removeEvent(get(elm),'blur');
							addEvent(get(elm),'blur',function(){FormataCpfCnpj(get(elm),0)})
							addEvent(get(elm),'paste',function(){return false});
						break;
						
						case 'mask-cep':
							MaskInput(get(elm),"99999-999");
							addEvent(get(elm),'paste',function(){return false});
						break;
						
						case 'mask-phone':
							MaskInput(get(elm),"9999-9999");
							addEvent(get(elm),'paste',function(){return false});
						break;
						
						case 'mask-digits':
							MaskInput(get(elm),"9^");
							addEvent(get(elm),'paste',function(){return false});
						break;
						
						case 'mask-alphanum':
							MaskInput(get(elm),"A^");
							addEvent(get(elm),'paste',function(){return false});  
						break;
						
						case 'mask-alpha':
							MaskInput(get(elm),"C^");
							addEvent(get(elm),'paste',function(){return false});  
						break;
						
						case 'mask-email':
							MaskInput(get(elm),"a^@.-_");
							addEvent(get(elm),'paste',function(){return false});  
						break;
						
						case 'mask-hora':
							MaskInput(get(elm),"99:99");
							addEvent(get(elm),'paste',function(){return false});  
						break;
					}
				 }
			}
	    }
	   
	    r.start();	
	}
}





//---------------------------------------- mascaras.js ----------------------------------------//

//========================================================
// REQUIRES http://www.jsfromhell.com/geral/event-listener
//========================================================

MaskInput = function(f, m){
	function mask(e){
		var patterns = {"1": /[A-Za-z\s]/, "2": /[0-9]/, "4": /[\xC0-\xFF]/i, "8": /./ },
			rules = { "a": 3, "A": 7, "9": 2, "C":5, "c": 1, "*": 8};
		function accept(c, rule){
			for(var i = 1, r = rules[rule] || 0; i <= r; i<<=1)
				if(r & i && patterns[i].test(c))
					break;
				return i <= r || c == rule;
		}
		var k, mC, r, c = String.fromCharCode(k = e.key), l = f.value.length;
		(!k || k == 8 ? 1 : (r = /^(.)\^(.*)$/.exec(m)) && (r[0] = r[2].indexOf(c) + 1) + 1 ?
			r[1] == "O" ? r[0] : r[1] == "E" ? !r[0] : accept(c, r[1]) || r[0]
			: (l = (f.value += m.substr(l, (r = /[A|9|C|\*]/i.exec(m.substr(l))) ?
			r.index : l)).length) < m.length && accept(c, m.charAt(l))) || e.preventDefault();
	}
    
    //desabilita o menu do botao esquerdo do mouse,para evitar o paste
    addEvent(f, "contextmenu",function(){return false});
    
	for(var i in !/^(.)\^(.*)$/.test(m) && (f.maxLength = m.length), {keypress: 0, keyup: 1}){
        //antes de adicionar a mascara, retira todas as funções
        //associadas ao evento       
        removeEvent(f,i);
        addEvent(f, i,mask);
    }
}
/**************************************
* formatCurrency Function v1.1       *
* Autor: Carlos R. L. Rodrigues      *
**************************************
*/

//========================================================
// REQUIRES http://www.jsfromhell.com/geral/event-listener
//========================================================

function formatCurrency(o, n, dig, dec){
    //antes de adicionar a mascara, retira todas as funções
    //associadas ao evento 
    removeEvent(o,"keypress");
    removeEvent(o,"click");
    
    var flagFocus=false;
 
    o.c = !isNaN(n) ? Math.abs(n) : 2;
    o.dec = typeof dec != "string" ? "," : dec, o.dig = typeof dig != "string" ? "." : dig;
    
    addEvent(o, "click", function(e){
        this.select();
        flagFocus = true;
    });
    
    addEvent(o, "keypress", function(e){
         if(flagFocus){
            this.value="";
            flagFocus=false;
        }       
        if(e.key > 47 && e.key < 58){
            var o, s, l = (s = ((o = this).value.replace(/^0+/g, "") + String.fromCharCode(e.key)).replace(/\D/g, "")).length, n;
            if(o.maxLength + 1 && l >= o.maxLength) return false;
            l <= (n = o.c) && (s = new Array(n - l + 2).join("0") + s);
            for(var i = (l = (s = s.split("")).length) - n; (i -= 3) > 0; s[i - 1] += o.dig);
            n && n < l && (s[l - ++n] += o.dec);
            o.value = s.join("");
        }
        e.key > 30 && e.preventDefault();
    });
    //desabilita o menu do botao esquerdo do mouse,para evitar o paste
    addEvent(o, "contextmenu",function(){return false});
}

/*
**************************************
* Restrict Class v1.0                *
* Autor: Carlos R. L. Rodrigues      *
**************************************
*/

//========================================================
// REQUIRES http://www.jsfromhell.com/geral/event-listener
//========================================================

Restrict = function(form){
    this.form = form, this.field = {}, this.mask = {};
}
Restrict.field = Restrict.inst = Restrict.c = null;
Restrict.prototype.start = function(){
    var $, __ = document.forms[this.form], s, x, j, c, sp, o = this, l;
    var p = {".":/./, w:/\w/, W:/\W/, d:/\d/, D:/\D/, s:/\s/, a:/[\xc0-\xff]/, A:/[^\xc0-\xff]/};
    for(var _ in $ = this.field)
        if(/text|textarea|password/i.test(__[_].type)){
            x = $[_].split(""), c = j = 0, sp, s = [[],[]];
            for(var i = 0, l = x.length; i < l; i++)
                if(x[i] == "\\" || sp){
                    if(sp = !sp) continue;
                    s[j][c++] = p[x[i]] || x[i];
                }
                else if(x[i] == "^") c = (j = 1) - 1;
                else s[j][c++] = x[i];
            o.mask[__[_].name] && (__[_].maxLength = o.mask[__[_].name].length);
            __[_].pt = s, addEvent(__[_], "keydown", function(e){
                var r = Restrict.field = e.target;
                if(!o.mask[r.name]) return;
                r.l = r.value.length, Restrict.inst = o; Restrict.c = e.key;
                setTimeout(o.onchanged, r.e = 1);
            });
            addEvent(__[_], "keyup", function(e){
                (Restrict.field = e.target).e = 0;
            });
            addEvent(__[_], "keypress", function(e){
                o.restrict(e) || e.preventDefault();
                var r = Restrict.field = e.target;
                if(!o.mask[r.name]) return;
                if(!r.e){
                    r.l = r.value.length, Restrict.inst = o, Restrict.c = e.key || 0;
                    setTimeout(o.onchanged, 1);
                }
            });
        }
}
Restrict.prototype.restrict = function(e){
    var o, c = e.key, n = (o = e.target).name, r;
    var has = function(c, r){
        for(var i = r.length; i--;)
            if((r[i] instanceof RegExp && r[i].test(c)) || r[i] == c) return true;
        return false;
    }
    var inRange = function(c){
        return has(c, o.pt[0]) && !has(c, o.pt[1]);
    }
    return (c < 30 || inRange(String.fromCharCode(c))) ?
        (this.onKeyAccept && this.onKeyAccept(o, c), !0) :
        (this.onKeyRefuse && this.onKeyRefuse(o, c),  !1);
}
Restrict.prototype.onchanged = function(){
    var ob = Restrict, si, moz = false, o = ob.field, t, lt = (t = o.value).length, m = ob.inst.mask[o.name];
    if(o.l == o.value.length) return;
    if(si = o.selectionStart) moz = true;
    else if(o.createTextRange){
        var obj = document.selection.createRange(), r = o.createTextRange();
        if(!r.setEndPoint) return false;
        r.setEndPoint("EndToStart", obj); si = r.text.length;
    }
    else return false;
    for(var i in m = m.split(""))
        if(m[i] != "#")
            t = t.replace(m[i] == "\\" ? m[++i] : m[i], "");
    var j = 0, h = "", l = m.length, ini = si == 1, t = t.split("");
    for(i = 0; i < l; i++)
        if(m[i] != "#"){
            if(m[i] == "\\" && (h += m[++i])) continue;
            h += m[i], i + 1 == l && (t[j - 1] += h, h = "");
        }
        else{
            if(!t[j] && !(h = "")) break;
            (t[j] = h + t[j++]) && (h = "");
        }
    o.value = o.maxLength > -1 && o.maxLength < (t = t.join("")).length ? t.slice(0, o.maxLength) : t;
    if(ob.c && ob.c != 46 && ob.c != 8){
        if(si != lt){
            while(m[si] != "#" && m[si]) si++;
            ini && m[0] != "#" && si++;
        }
        else si = o.value.length;
    }
    !moz ? (obj.move("character", si), obj.select()) : o.setSelectionRange(si, si);
}



/*
 * função de apoio que ignora
 * as teclas de navegacao
 */
ignoreKey = function(f, a){
	addEvent(f, "keydown", function(e){
		ev.ignoredKey = false;
		var code	  = e.key;
		var igs		  = [8,9,13,16,17,18,20,27,33,34,35,36,37,38,39,40,45,46,91,92];
		for(x in igs){ (code == igs[x]) ? ev.ignoredKey=true : ''; }
	});
};





//---------------------------------------- eventos.js ----------------------------------------//
/*
**************************************
* Event Listener Function v1.4       *
* Autor: Carlos R. L. Rodrigues      *
**************************************
*/
addEvent = function(o, e, f, s){
    var r = o[r = "_" + (e = "on" + e)] = o[r] || (o[e] ? [[o[e], o]] : []), a, c, d;
    r[r.length] = [f, s || o], o[e] = function(e){
        try{
            (e = e || event).preventDefault || (e.preventDefault = function(){e.returnValue = false;});
            e.stopPropagation || (e.stopPropagation = function(){e.cancelBubble = true;});
            e.target || (e.target = e.srcElement || null);
            e.key = (e.which + 1 || e.keyCode + 1) - 1 || 0;
        }catch(f){}
        for(d = 1, f = r.length; f; r[--f] && (a = r[f][0], o = r[f][1], a.call ? c = a.call(o, e) : (o._ = a, c = o._(e), o._ = null), d &= c !== false));
        return e = null, !!d;
    }
};

removeEvent = function(o, e, f, s){
   
    var x = (e = o["_on" + e] || []).length
    //caso não venha uma funcao definida
    //serah apagado todas as funcoes associadas ao evento
	for(var i=0;i<=x ; i++){
        if (typeof(f)=='undefined'){
            delete e[i];
        }
        else{
            //se for passada uma funcao, tenta apagar
		    if(e[--i] && e[i][0] == f && (s || o) == e[i][1])
                return delete e[i];
            break;
        }
    }
	return false;
};



//---------------------------------------- formatacao ----------------------------------------//

// Formata CPF/CNPJ
function FormataCpfCnpj(elm,tipo){
    var valor = elm.value;
    var CPFCNPJ=elm.value;
    //só deixa os numeros
    valor = valor.replace(/[^0-9]/g,'')
    //verifica se eh um cpf
    if ((tipo == 0)||(tipo == 1)){
        if (validaCPF(valor)){
            //completa com zeros caso seja um cpf antigo
            for (var x=valor.length; x<11;x++){
                valor = '0' + valor;
            }
            //adota a mascara
            CPFCNPJ = valor.substr(0,3) + '.' + valor.substr(3,3) + '.' + valor.substr(6,3) + '-' + valor.substr(9,2);
            elm.value = CPFCNPJ;
            return;
        }
    }
    if ((tipo == 0)||(tipo == 2)){    
        if(validaCNPJ(valor)){
            for (var x=valor.length; x<14;x++){
                valor = '0' + valor;
            }
            //adota a mascara
            CPFCNPJ = valor.substr(0,2) + '.' + valor.substr(2,3) + '.' + valor.substr(5,3) + '/' + valor.substr(8,4) + '-' + valor.substr(12,2);
            elm.value=CPFCNPJ;
            return;
        }
    }
        
    //~ elm.value=CPFCNPJ;
}