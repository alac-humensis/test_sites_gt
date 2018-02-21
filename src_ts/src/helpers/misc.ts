export function getDateStr(): string {
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


export function zeroPad(num: number, numZeros: number): string {
        var n = Math.abs(num);
        var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
        var zeroString: string = Math.pow(10,zeros).toString().substr(1);
        if( num < 0 ) {
            zeroString = '-' + zeroString;
        }
    
        return zeroString+n;
    }