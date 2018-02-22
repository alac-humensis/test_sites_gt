function componentToHex(c: number): string {
    let hex: string = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function hexToRgb(hex: string): RgbColor {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    if(hex.length < 3){
        return null;
    }
    var shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result.length > 0 ? new RgbColor(parseInt(result[1], 16), 
                                parseInt(result[2], 16), 
                                parseInt(result[3], 16))
                : null;
}
function rgbToHex(r: number, g:number, b:number): string {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

class RgbColor{
    constructor(public r: number=0, public g:number=0, public b: number=0){
        //
    }
}

export class Color extends RgbColor{
    hexColor: string;
    constructor(public r: number=0, public g:number=0, public b: number=0){
        super(r, g, b);
        this.initFromRgb(r,g,b);
    }

    initFromHex(hexColor: string){
        this.hexColor = hexColor;
        let rgbCl: RgbColor = hexToRgb(hexColor);
        //TODO : Gestion d'erreur
        this.r = rgbCl.r;
        this.g = rgbCl.g;
        this.b = rgbCl.b;
    }

    initFromRgb(r: number, g:number, b: number){
        //TODO : Gestion d'erreur
        this.r = r;
        this.g = g;
        this.b = b;
        this.hexColor = rgbToHex(r, g, b);
    }

    get rgbCssString(): string{
        return 'rgb('+this.r+', '+this.g+', '+this.b+')';
    }
    get rgbaCssString(): string{
        return 'rgba('+this.r+', '+this.g+', '+this.b+', 1)';
    }
    CssString(browser): string{
        let browserName: string = browser.options.desiredCapabilities.browserName;
        let rgba = browserName.toLowerCase() == 'chrome';
        return (rgba ? this.rgbaCssString : this.rgbCssString);
    }
}

export function colorFromHex(hexColorString: string): Color{
    let rgb = hexToRgb(hexColorString);
    return (rgb != null) ? new Color(rgb.r, rgb.g, rgb.b) : null;
}

/*
module.exports = {
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