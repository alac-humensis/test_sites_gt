module.exports = {
    getDateStr : function(){
    var now = new Date();
    //console.log('Jour : ' + ( );
    var str = now.getFullYear().toString() 
                +'-'+ ((''+(now.getMonth()+1)).padStart(2, '0'))
                +'-'+ (now.getDate().toString().padStart(2, '0'));
    console.log('Jour : '+str);
    return str;
    }  
}