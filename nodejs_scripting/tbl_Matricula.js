//Todo:
    //Import tbl_Estudiante
    //Relacionar una matricula con cada estudiante segun, su nivel academico y darle un precio

const xlsx = require('xlsx');

const tbl_Estudiantes = xlsx.utils.sheet_to_json(xlsx.readFile('tbl_Students.xlsx').Sheets['tbl_Students']);


let Matriculas = [];

//let matrizProbabilidades =  [true, true, true, false, true, true, true, false, false]

Matriculas = tbl_Estudiantes.map(value=>{

    let tuition;

    switch (value.AcademicLevel){
        case 'High School':
            tuition = getRandomInt(20, 35)*1000;
            break;
        case 'Bachelor’s Degree':
            tuition = getRandomInt(38, 48)*1000;
            break
        case 'Master’s Degree':
            tuition = getRandomInt(50, 72)*1000;
            break
        case 'Doctorate':
            tuition = getRandomInt(80, 150)*1000;
            break
    }

    return {
        fk_Estudiante: value.Id, 
        tuitionCostPerYear: tuition,
        fk_Program: value.fk_Program,
        fk_SchoolarShips: null
    }

})


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


var newWb = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(Matriculas);
xlsx.utils.book_append_sheet(newWb, newWS, "tbl_Matricula");

xlsx.writeFile(newWb, "tbl_Matricula.xlsx");

console.log("Done!")

console.log(Matriculas)

