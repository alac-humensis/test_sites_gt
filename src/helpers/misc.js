function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

module.exports = {
    getDateStr : function(){
    var now = new Date();
    //console.log('Jour : ' + ( );
    var str = now.getFullYear().toString() 
                +'-'+ ((''+(now.getMonth()+1)).padStart(2, '0'))
                +'-'+ (now.getDate().toString().padStart(2, '0'));
    console.log('Jour : '+str);
    return str;
    },
    hexToRgb : function(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
    
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    rgbToHex: function(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    },
    colorFromHex: function(hexColorString){
        var rgb = this.hexToRgb(hexColorString);
        return rgb ? {
            hexColor: hexColorString,
            r: rgb.r,
            g: rgb.g,
            b: rgb.b,
            rgbCssString: 'rgb('+rgb.r+', '+rgb.g+', '+rgb.b+')'
        } : null;
       
    }
}