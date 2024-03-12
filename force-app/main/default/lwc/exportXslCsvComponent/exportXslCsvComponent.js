import { LightningElement } from 'lwc';
import getExportAcc from '@salesforce/apex/AccountDetail.getExportAcc';
//import Account from '@salesforce/schema/AccountHistory.Account';

const col=[
    {label:"Name", fieldName:"Name", type:"text"},
    {label:"Phone", fieldName:"Phone", type:"Phone"},
    {label:"Website", fieldName:"Website", type:"url"},
    {label:"Fax", fieldName:"Fax", type:"Phone"},
    {label:"Type", fieldName:"Type", type:"text"},
];
export default class ExportXslCsvComponent extends LightningElement {
    column = col;
    exportData;
    columnHeader =['Id','Name','Phone','Website','Fax','Type'];
    
    connectedCallback(){
        getExportAcc()
        .then(res=>{
            this.exportData = res;
            console.log('---- Export Data ----- ',this.exportData);
        })
        .catch(err=>{
            console.error('---- Export Error ---- ',err);
        })
    }

    handleAccount(){
    try{
        let doc = '<table>';
        doc+= '<style>';
        doc+= 'table,th,td{ border: 1px solid black;';
        doc+= 'border-collapse: collapse;';
        doc+= '}</style>';
        // Add header
        doc+= '<tr>';
        this.columnHeader.forEach(header=>{
            doc+='<th>'+header+'</th>';
        });
        doc+='</tr>';
        // Add data
        this.exportData.forEach(data=>{
            doc+='<tr>';
            if(data.Name.toLowerCase().startsWith('s')){
                doc+='<td style="background-color:yellow">'+ this.removeUndefine(data.Id) +'</td>' ;
            }else{
                doc+='<td>'+ this.removeUndefine(data.Id) +'</td>' ;
            }
            doc+='<td>'+ this.removeUndefine(data.Name) +'</td>' ;
            doc+='<td>'+ this.removeUndefine(data.Phone) +'</td>' ;
            doc+='<td>'+ this.removeUndefine(data.Website) +'</td>' ;
            doc+='<td>'+ this.removeUndefine(data.Fax) +'</td>' ;
            doc+='<td>'+ this.removeUndefine(data.Type) +'</td>' ;
            doc+='</tr>';
        });
        doc+='</table>';
        var element = 'data:application/vnd.ms-excel,'+ encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        downloadElement.download = 'Account Data.xls'; // use .csv extension for download csv file
        document.body.appendChild(downloadElement);
        downloadElement.click();
        console.log('Export Successfull');
    }
    catch(error)
    {
        console.error(error);
    }
    }

    removeUndefine(value){
        //let val = value;
        if(!value){
            value='';
        }
        return value;
    }
}