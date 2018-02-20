export function getDateStr(): String{
    let now: Date = new Date();
    //console.log('Jour : ' + ( );
    let m: any = (''+(now.getMonth()+1));//any car padStart et padEnd (du js) ne sont pas dans les définitions de String
    m = m.padStart(2, '0');
    let d: any = now.getDate().toString();
    d = d.padStart(2, '0');
    let str: string = now.getFullYear().toString() +'-'+ m +'-'+ d;
    console.log('Jour : '+str);
    return str;
}

/*
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
    colorFromHex: function(hexColorString, browser){
        var rgb = this.hexToRgb(hexColorString);
        return rgb ? {
            hexColor: hexColorString,
            r: rgb.r,
            g: rgb.g,
            b: rgb.b,
            rgbCssString: 'rgb('+rgb.r+', '+rgb.g+', '+rgb.b+')',
            rgbaCssString: 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', 1)',
            cssString : function(browser){
                var rgba = browser.options.desiredCapabilities.browserName == 'chrome';
                return (rgba ? this.rgbaCssString : this.rgbCssString);
            }
        } : null;
       
    }
}
*/