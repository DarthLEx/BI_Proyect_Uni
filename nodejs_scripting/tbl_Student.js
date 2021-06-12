//TODO:
    //Importar EstudentsPerformance
    //Importar tbl_Program
    //Importar tbl_parentalLevel
    //Importar Nombres, sexos
    //Importar Apellidos
    //Realizar una combinacion de todos estos datos de como minimo 5000 registros
    //Separar el performance y el estudiante en tablas separadas (performace con FK a estudiante)
    //Replicar los scores con diferentes fechas (Clonar un registro 3 o 4 veces por año)


const xlsx = require("xlsx");

const StudentsPerformanceSrc = xlsx.utils.sheet_to_json(xlsx.readFile("sources/soucesInXLSX.xlsx").Sheets["StudentsPerformanceExcel"]);
const tbl_Programs = xlsx.utils.sheet_to_json(xlsx.readFile("tbl_Program.xlsx").Sheets["tbl_Program"]);
const tbl_parentalLevel = xlsx.utils.sheet_to_json(xlsx.readFile("tbl_parentalLevel.xlsx").Sheets["tbl_parentalLevel"]);
const NamesGenre = xlsx.utils.sheet_to_json(xlsx.readFile("sources/soucesInXLSX.xlsx").Sheets["Nombres"]);
const LastNames = xlsx.utils.sheet_to_json(xlsx.readFile("sources/soucesInXLSX.xlsx").Sheets["Apellidos"]);

let Id_generator = 0;

let studentsArray = StudentsPerformanceSrc.map(value=>{

    let NameGenderIndex = getRandomInt(NamesGenre.length);
    Id_generator++;
    return {
        Id: Id_generator,
        Nombre: NamesGenre[NameGenderIndex].Name,
        Apellido: LastNames[getRandomInt(LastNames.length)].Surname.toLowerCase(),
        Sexo: NamesGenre[NameGenderIndex].Gender,
        MathScore: value["math score"],
        ReadingScore: value["reading score"], 
        WritingScore: value["writing score"],
        fk_Program: tbl_Programs[getRandomInt(tbl_Programs.length)].Id,
        fk_parentalLevel: tbl_parentalLevel[getRandomInt(tbl_parentalLevel.length)].Id
    }
})

let tbl_Estudiantes = studentsArray.map(value => {
    return {
        Id: value.Id,
        Nombre: value.Nombre,
        Apellido: value.Apellido,
        Sexo: value.Sexo,
        fk_Program: value.fk_Program,
        fk_parentalLevel: value.fk_parentalLevel
    }
})

let tbl_studentPerformance = studentsArray.map(value=>{
    return{
        Id: value.Id*3,
        MathScore: value.MathScore,
        ReadingScore: value.ReadingScore,
        WritingScore: value.WritingScore,
        fk_Student: value.Id
    }
})




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



//Exportar los datos a excel.

var studentsWB = xlsx.utils.book_new();
var studentsWS = xlsx.utils.json_to_sheet(tbl_Estudiantes);
xlsx.utils.book_append_sheet(studentsWB, studentsWS, "tbl_Students");
xlsx.writeFile(studentsWB, "tbl_Students.xlsx");


var performanceWB = xlsx.utils.book_new();
var performanceWS = xlsx.utils.json_to_sheet(tbl_studentPerformance);
xlsx.utils.book_append_sheet(performanceWB, performanceWS, "tbl_Performance");
xlsx.writeFile(performanceWB, "tbl_Performance.xlsx");


//Console logs for debugger
console.log("Done!");

