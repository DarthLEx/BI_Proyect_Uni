const xlsx = require("xlsx");

const rankWorbook = xlsx.readFile("sources/soucesInXLSX.xlsx");
const tbl_CitiesBook = xlsx.readFile("tbl_Cities.xlsx");

const tbl_CitiesSheet =  xlsx.utils.sheet_to_json(tbl_CitiesBook.Sheets["tbl_Cities"]);
const UniversitiesSheet = xlsx.utils.sheet_to_json(rankWorbook.Sheets["ProgramasPorUniversidades"]);



var Id = 0;

var UniversitiesJSON = UniversitiesSheet.map(Universidad=>{

    aux = tbl_CitiesSheet.filter(value=>{
        return value.Name === Universidad.CITY;
    })

    

    return JSON.stringify({
        NombreUniversidad: Universidad.SCHOOL,
        fk_City: aux[0].Id
    })

    

}).filter((university, index, universities)=>{

    return index === universities.indexOf(university)

}).map(value=>{
    Id++;
    return {Id: Id, ...JSON.parse(value)};
});

console.log(UniversitiesJSON);

var scoreWB = xlsx.utils.book_new();
var scoreWS = xlsx.utils.json_to_sheet(UniversitiesJSON);
xlsx.utils.book_append_sheet(scoreWB, scoreWS, "tbl_Unisersities");
xlsx.writeFile(scoreWB, "tbl_Unis.xlsx");