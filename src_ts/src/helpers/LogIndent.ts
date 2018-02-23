export class LogIndent{
  indentLevel : number = 0;

  indentStr(logIndentTitle?: string): string {
    let indentFull = '';
    if(this.indentLevel > 0){
      let indentSpace = '|___';//'˾__';//'...';//'…';//'__';//
      let indentTags = ['##', '+', '-', '°', '~', '*'];
      for(let i=1; i<this.indentLevel; i++){
        indentFull += indentSpace;
      }
      indentFull += indentTags[Math.min(this.indentLevel-1, indentTags.length-1)];
    }
    indentFull += ' ';
    if(logIndentTitle != undefined){
      indentFull += logIndentTitle;
    }
    return indentFull;
  }

  Inc(){
    this.indentLevel++;
  }

  Dec(){
    this.indentLevel--;
  }
}