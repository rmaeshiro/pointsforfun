function RecordSet(){
    //********* variaveis ***************
    this.Items = {"List":[]}
    var  Index = 0;
    //**********metodos****************
    this.AddRow    = function(row){
        row.Index = Index++;
        this.Items.List.push(row)
        this.OnAfterAdd();
    }
    this.DeleteRow = function(key,value){
        for(var x=0;x< this.Items.List.length;x++){
            for(var prop in this.Items.List[x]){
                if(prop == key && this.Items.List[x][prop]==value){
                     this.Items.List.splice(x,1);
                }
            }
        }
        this.OnAfterDelete();
    }
    this.LoadFromJson = function(objJson,arrayName){
        for(var x=0; x<objJson[arrayName].length;x++){
            this.AddRow(objJson[arrayName][x])
        }
    }
    this.ReturnJson = function(arrayName){
        var obj ={};
         obj[arrayName] =  [].concat(this.Items.List);
         return obj;
    }
    //**********eventos***************
    this.OnAfterAdd      = function(){};
    this.OnAfterDelete   = function(){};
}
