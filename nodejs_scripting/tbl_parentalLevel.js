const xlsx = require("xlsx");

const sourceJSON = xlsx.utils.sheet_to_json(xlsx.readFile("sources/soucesInXLSX.xlsx").Sheets["StudentsPerformanceExcel"]);

let Id_generator = 0;

let tbl_parentalLevel = sourceJSON.map(value=>{

    return JSON.stringify({
        education_level: value["parental level of education"]
    });
}).filter((value,index,array)=>{
    return index === array.indexOf(value);
}).map(value => {
    Id_generator++;
    return {
        Id: Id_generator,
        ...JSON.parse(value)
    }
    
})

console.log(tbl_parentalLevel);

var newWb = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(tbl_parentalLevel);
xlsx.utils.book_append_sheet(newWb, newWS, "tbl_parentalLevel");

xlsx.writeFile(newWb, "tbl_parentalLevel.xlsx");
