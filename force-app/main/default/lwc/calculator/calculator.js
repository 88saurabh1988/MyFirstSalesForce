import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {
    a = 0;
    b = 0;
    typeCal='';
    outPut='';
    outPutStatus=false;
    
    handleOperation(event){
        console.log(event.target.name);
        let input = event.target.name;
        if(input === 'Input A'){
            this.a = event.target.value;
        }else if(input === 'Input B'){
            this.b = event.target.value;
        }
        console.log('a: '+this.a+', b: '+this.b);
    }

    handleCal(event){
        console.log(event.target.name);
        let opertaionType = event.target.name;
        
        if(this.a && this.b){
            this.typeCal = opertaionType;
        }
        else{
            this.typeCal="";
            this.outPut="";
            this.outPutStatus=false;
        }
        this.operation();
    }

    operation(){
        switch(this.typeCal){
            case 'Add': 
            this.outPut = parseFloat(this.a)+parseFloat(this.b);
            if(this.outPut==0){
                this.outPutStatus = true;
                break;
            }
            this.outPut==''?this.outPutStatus = false:this.outPutStatus = true;
            break;

            case 'Sub': 
            this.outPut = parseFloat(this.a)-parseFloat(this.b);
            console.log(this.outPut);
            
            if(this.outPut==0){
                this.outPutStatus = true;
                break;
            }
            this.outPut==''?this.outPutStatus = false:this.outPutStatus = true;
            break;

            case 'Mul': 
            this.outPut = parseFloat(this.a)*parseFloat(this.b);
            if(this.outPut==0){
                this.outPutStatus = true;
                break;
            }
            this.outPut==''?this.outPutStatus = false:this.outPutStatus = true;
            break;

            case 'Div': 
            this.outPut = parseFloat(this.a)/parseFloat(this.b);
            if(this.a==0){
                this.outPutStatus = false;
                break;
            }
            this.outPut==''?this.outPutStatus = false:this.outPutStatus = true;
            break;
        }
    }
}