const xlsx = require("xlsx");

const wb = xlsx.readFile("sources/soucesInXLSX.xlsx");

const programsWorksheet = xlsx.utils.sheet_to_json(wb.Sheets["ProgramasPorUniversidades"]);

var programs = programsWorksheet.map(program=>program.DELIVERY).filter((program, index, programs)=>index === programs.indexOf(program))

var tbl_Delivery = [];

var ID = 1;
programs.forEach((program)=>{
    tbl_Delivery.push({
        "Id": ID,
        "ProgramName": program
    })
    ID++;
})

var newWb = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(tbl_Delivery);
xlsx.utils.book_append_sheet(newWb, newWS, "tbl_Delivery");

xlsx.writeFile(newWb, "tbl_Delivery.xlsx");

console.log("Done!")