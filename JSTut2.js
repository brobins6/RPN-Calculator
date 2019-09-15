let newVal = "";
let result = "";
let express = "";
let postfix = "";
let decimalPress = false;
let valExp = "";
let valMem = "";
let stc = [];
let stc2 = [];
function prec(c){
    switch (c) {
        case "*":
        case "/":
        case "%":
            return 11;
        case "+":
        case "-":
            return 10;

        case ">>":
        case "<<":
        case ">>>":
        case "<<<":
           return 9;
        case "<":
        case "<=":
        case ">":
        case ">=":
            return 8;
        case "==":
        case "!=":
            return 7;
        case "&":
            return 6;
        case "^":
            return 5;
        case "|":
            return 4;
        case "&&":
            return 3;
        case "^^":
            return 2;
        case "||":
            return 1;
    }
    return -1;

}
function numButPress(n){
    if(result){
        newVal = n;
        result = "";
    }else {
        if(n == '.'){
            if(decimalPress != true){
                newVal += n;
                decimalPress = true;
            }
        }else {
            newVal += n;
            document.getElementById("InFix").value = newVal;
        }
    }
}

function eval(postfix){
    
    postfix = postfix.split(" ");
    for(var i = 0; i < postfix.length-1; i++){
        var c = postfix[i];
        console.log(c);
        if(!isNaN(parseInt(c))){
            stc2.push(parseInt(c));
        }
        else{
            var val1 = stc2.pop();
            var val2 = stc2.pop();
            switch (c) {
                case "*":
                    stc2.push(val2 * val1);
                    break;
                case "/":
                    if (val2 == 0 ){
                        stc2.push(0);
                        break;}
                    else if (val1 == 0){
                        return "Error";
                    }
                    else{
                        stc2.push(val2 / val1);
                        break;}
                case "%":
                    if (val1 == 0 || val2 == 0){
                        stc2.push(0);
                        break;}
                    else{
                        stc2.push(val2 % val1);
                        break;}
                case "+":
                    stc2.push(val2 + val1);
                    break;
                case "-":
                    stc2.push(val2 - val1);
                    break;
                case "<<":
                    stc2.push(val2 << val1);
                    break;
                case ">>":
                    stc2.push(val2 >> val1);
                    break;
                case "<<<":
                    let res = val2 * Math.pow(2,val1);
                    stc2.push(parseInt(Math.round(res)));
                    break;
                case ">>>":
                    stc2.push(val2 >>> val1);
                    break;
                case "<":
                    if (val2 < val1){
                        stc2.push(-1);
                        break;
                    }
                    else {
                        stc2.push(0);
                        break;
                    }
                case "<=":
                    if (val2 <= val1){
                        stc2.push(-1);
                        break;
                    }
                    else {
                        stc2.push(0);
                        break;
                    }
                case ">":
                    if (val2 > val1){
                        stc2.push(-1);
                        break;
                    }
                    else {
                        stc2.push(0);
                        break;
                    }
                case ">=":
                    if (val2 >= val1){
                        stc2.push(-1);
                        break;
                    }
                    else {
                        stc2.push(0);
                        break;
                    }
                case "==":
                    if (val2 == val1){
                        stc2.push(-1);
                        break;
                    }
                    else {
                        stc2.push(0);
                        break;
                    }
                case "!=":
                    if (val2 != val1){
                        stc2.push(-1);
                        break;
                    }
                    else {
                        stc2.push(0);
                        break;
                    }
                case "&":
                    stc2.push(val2 & val1);
                    break;
                case "^":
                    stc2.push(val2 ^ val1);
                    break;
                case "|":
                    stc2.push(val2 | val1);
                    break;
                case "&&":
                    if ((val2 == -1) &&(val1 == -1)){
                        stc2.push(-1);
                        break;
                    }
                    else {
                        stc2.push(0);
                        break;
                    }
                case "||":
                    if ((val2 == -1) || (val1 == -1)){
                        stc2.push(-1);
                        break;
                    }
                    else {
                        stc2.push(0);
                        break;

                    }
                case "^^":
                    if (((val2 == -1) && (val1 == 0)) || ((val2 == 0) && (val1 == -1))){
                        stc2.push(-1);
                        break;
                    }
                    else {
                        stc2.push(0);
                        break;
                    }

            }

        }
    }

    return stc2.pop().toString();

}

function evalButPress(){
    var exp = document.getElementById('PostFix').value;
    document.getElementById('result').value = eval(exp);
}

function clearButPress(){
    prev = "";
    newVal = "";
    result = "";
    mathOP = "";
    decimalPress = false;
    document.getElementById("InFix").value = "0";
    document.getElementById("PostFix").value = "0";
    document.getElementById("result").value = "0";
}
function rpnButPress(){
        valExp = document.getElementById('InFix').value;
        valMem = valExp.split(" ");
          let regex1 = RegExp('[0-9]');
        let regex2 = RegExp('[(]');
        let regex3 = RegExp('[)]');
        let i;
        for (i =0; i<valMem.length;i++){
            
            let c = valMem[i];
            if(regex1.test(c)){
                express+= c + " ";
            }
            else if (regex2.test(c)){
                stc.push(c);
            }
            else if(regex3.test(c)){
                //this will add the operators to the postfix
                while(stc.length && regex2.test(stc[stc.length-1]) == false)
                    express+= stc.pop() + " ";
                if(stc.length && regex2.test(stc[stc.length-1]) == false)
                    return "Invalid expression";
                else stc.pop();
            }
            else {
                //this adds to the postfix depending on precedence level the
                while(stc.length && prec(c) <= prec(stc[stc.length]))
                    express+= stc.pop() + " ";
                stc.push(c);
            }
        }
        //this gets the remaining operators and adds to the express string
        while(stc.length && regex2.test(stc[stc.length-1]) == false)
            express += stc.pop() + " ";
        document.getElementById('PostFix').value = express;
        express = "";
        evalButPress();
    }
