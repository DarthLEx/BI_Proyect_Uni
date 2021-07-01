const xlsx = require('xlsx');

const tbl_Matricula = xlsx.utils.sheet_to_json(xlsx.readFile('tbl_Matricula.xlsx').Sheets['tbl_Matricula']);

var Id_gen = 0;
var percentTuition


let BecasTotales = []

let BecasParciales = []

//Hacer becas totales
for(let i = 0; i <= 319; i++){
    let jsonTotal = {
        Id: Id_gen,
        Type: "Total",
        TuitionPay: tbl_Matricula[i].tuitionCostPerYear,
        TuitionPercent: 100,
        HousingPay: getRandomInt(2, 8) * 1000,
        FoodPay: getRandomInt(0.6, 4) * 100,
        HealthcarePay: getRandomInt(8, 15) * 1000,
        TransportPay: getRandomInt(0.4, 3) * 100,
        StudyingMaterialPay: getRandomInt(2, 6) * 100,
    }

    jsonTotal.TotalAmount = jsonTotal.TuitionPay+jsonTotal.TuitionPercent+jsonTotal.HousingPay+jsonTotal.FoodPay+jsonTotal.HealthcarePay+jsonTotal.TransportPay+jsonTotal.StudyingMaterialPay

    tbl_Matricula[i].fk_SchoolarShip = jsonTotal.Id

    BecasTotales.push(jsonTotal);
    // console.log(tbl_Matricula[i])
    //console.log(jsonTotal)
    Id_gen++;
}


//Hacer becas parciales
for(let i = 320; i <= 845; i++){

    percentTuition = getRandomInt(0, 80)/100;

    let jsonTotal = {
        Id: Id_gen,
        Type: "Parcial",
        TuitionPay: tbl_Matricula[i].tuitionCostPerYear*percentTuition,
        TuitionPercent: percentTuition*100,
        HousingPay: getRandomInt(0, 8) * 1000,
        FoodPay: getRandomInt(0, 4) * 100,
        HealthcarePay: getRandomInt(0, 15) * 1000,
        TransportPay: getRandomInt(0, 3) * 100,
        StudyingMaterialPay: getRandomInt(0, 6) * 100,
    }

    jsonTotal.TotalAmount = jsonTotal.TuitionPay+jsonTotal.TuitionPercent+jsonTotal.HousingPay+jsonTotal.FoodPay+jsonTotal.HealthcarePay+jsonTotal.TransportPay+jsonTotal.StudyingMaterialPay

    tbl_Matricula[i].fk_SchoolarShip = jsonTotal.Id

    BecasParciales.push(jsonTotal);
    // console.log(tbl_Matricula[i])
    // console.log(jsonTotal)
    Id_gen++;
}





var newWb = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet([...BecasTotales, ...BecasParciales]);
xlsx.utils.book_append_sheet(newWb, newWS, "tbl_Schoolarships");

xlsx.writeFile(newWb, "tbl_Schoolarships.xlsx");

console.log("Done!")


//Reescribir matriculas

var newWb = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(tbl_Matricula);
xlsx.utils.book_append_sheet(newWb, newWS, "tbl_Matricula");

xlsx.writeFile(newWb, "tbl_Matricula.xlsx");

console.log("Done!")


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//console.log(BecasTotales);