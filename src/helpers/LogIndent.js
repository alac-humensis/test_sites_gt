module.exports =  {
    indentLevel : 0,
    indentStr : function(logIndentTitle) {
      var indentFull = '';
      if(this.indentLevel > 0){
        var indentSpace = '|___';//'˾__';//'...';//'…';//'__';//
        var indentTags = ['##', '+', '-', '°'];
        for(var i=1; i<this.indentLevel; i++){
          indentFull += indentSpace;
        }
        indentFull += indentTags[Math.min(this.indentLevel-1, indentTags.length-1)];
      }
      indentFull += ' ';
      if(logIndentTitle != undefined){
        indentFull += logIndentTitle;
      }
      return indentFull;
    },
    Inc : function(){this.indentLevel++;},
    Dec : function(){this.indentLevel--;}
  }