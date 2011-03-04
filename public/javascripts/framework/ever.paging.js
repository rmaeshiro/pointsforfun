/*
 * JavaScript Document by:
 * EverSystems
 */

function Paginacao() {
	
	var me = this;
	
	var tabela;
	var dataGrid;
	var totalRegs;
	this.totalPages = 0;
	var pageArray;
	var pagePosition;
	var forPage;
	var iniReg;
	var endReg;
	var posTop;
	var mensagem;
	var callback;
	
	var dados;
	var btnPrev;
	var btnNext;
	
	
	this.load = function(obj) {
		tabela			= get(obj.tabela);
		dataGrid		= obj.dataGrid;
		forPage			= obj.forPage;
		btnPrev			= obj.btnPrev;
		btnNext			= obj.btnNext;
		posTop			= obj.mensagem[0];
		mensagem		= obj.mensagem[1];
		callback		= obj.callback || '';
		
		totalRegs		= dataGrid.length;
		me.totalPages	= Math.ceil(totalRegs / forPage);
		
		pageArray	 	= [];
		pagePosition	= -1;
		iniReg			= 0;
		endReg			= forPage;
		
		me.init();
	};
	
	
	this.init = function() {
		var novoItem = {};
		
		for (var i=0; i<me.totalPages; i++) {
			if (totalRegs <= endReg) {
				forPage = totalRegs - (endReg - forPage);
				endReg  = iniReg + forPage;
			}
			
			novoItem = {"iniReg":iniReg, "endReg":endReg, "forPage":forPage};
			pageArray[i] = novoItem;
			
			iniReg += forPage;
			endReg = iniReg + forPage;
		}
		
		novoItem = null;
	};
	
	
	this.prev = function() {
		pagePosition--;
		me.execute();
	};
	
	this.next = function() {
		pagePosition++;
		me.execute();
	};
	
	
	this.execute = function(){
		if (totalRegs <= 0) {
			ev.loading.hide();
			ev.cleanTableGrid(tabela);
			ev.showMessage(posTop,mensagem);
			return false;
		}
		
		
		dados = [];
		
		for (var i=0; i<pageArray[pagePosition].forPage; i++) {
			dados[i] = dataGrid[pageArray[pagePosition].iniReg + i];
		}
		
		// controle dos Botoes Anterior e Proximo
		if (pagePosition <= 0){
			ev.hideShow(btnPrev,btnNext);
		} else if (pagePosition == (pageArray.length - 1)) {
			ev.hideShow(btnNext,btnPrev);
		} else {
			ev.show(btnNext);
			ev.show(btnPrev);
		}
		
		(callback != '') ? callback(dados) :'';
	};
}