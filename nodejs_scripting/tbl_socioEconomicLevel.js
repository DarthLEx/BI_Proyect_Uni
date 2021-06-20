//TODO:
    //Importar la tabla de Studiantes
    //Definir rangos salariales segun la nacionalidad y nivel academico


const xlsx = require("xlsx");

const tbl_Students = xlsx.utils.sheet_to_json(xlsx.readFile('tbl_Students.xlsx').Sheets["tbl_Students"]);


//Definir rangos salariasles

let salaries = [2000, 5000, 8000, 10000, 15000, 30000, 35000, 40000, 50000];
let tipoVivienda = ['Propia', 'Alquilada'];
let ZonaVivienda = ['Urbana', 'Rural'];
let tieneVehiculo = ['Si', 'No']

//Filtrar por nivel educativo y Nacionalidad

// let studentsDocMasterUSA = tbl_Students.filter(value=>{
//     return value.AcademicLevel == 'Doctorate' || value.AcademicLevel == 'Master’s Degree';
// });


let tbl_socioEconomicLevel = tbl_Students.map(value=>{

    if(value.AcademicLevel == "Doctorate"){

        if(value.Nationality == "American") return{
            fk_Student: value.Id,
            salarioAnual: salaries[random(6, 8)],
            tipoVivienda: 'Propia',
            ZonaVivienda: ZonaVivienda[random(0,1)],
            tieneVehiculo: 'Si',
            cantidadPersonaACargo: random(0, 5),
            cabezaFamilia: Boolean(random(0,1))
        }
        else return {
            fk_Student: value.Id,
            salarioAnual: salaries[random(5, 8)],
            tipoVivienda: tipoVivienda[random(0,1)],
            ZonaVivienda: ZonaVivienda[random(0,1)],
            tieneVehiculo: 'Si',
            cantidadPersonaACargo: random(0, 5),
            cabezaFamilia: Boolean(random(0,1))
        }


    }

    if(value.AcademicLevel == "Master’s Degree"){
        return {
            fk_Student: value.Id,
            salarioAnual: salaries[random(4, 7)],
            tipoVivienda: tipoVivienda[random(0,1)],
            ZonaVivienda: ZonaVivienda[random(0,1)],
            tieneVehiculo: tieneVehiculo[random(0,1)],
            cantidadPersonaACargo: random(0, 5),
            cabezaFamilia: Boolean(random(0,1))
        }
    }

    if(value.AcademicLevel == "High School") return{
        fk_Student: value.Id,
        salarioAnual: salaries[random(0, 4)],
        tipoVivienda: tipoVivienda[random(0,1)],
        ZonaVivienda: ZonaVivienda[random(0,1)],
        tieneVehiculo: tieneVehiculo[random(0,1)],
        cantidadPersonaACargo: random(0, 5),
        cabezaFamilia: Boolean(random(0,1))
    }
    

    if(value.AcademicLevel == "Bachelor’s Degree"){
        return{
            fk_Student: value.Id,
            salarioAnual: salaries[random(0, 4)],
            tipoVivienda: tipoVivienda[random(0,1)],
            ZonaVivienda: ZonaVivienda[random(0,1)],
            tieneVehiculo: tieneVehiculo[random(0,1)],
            cantidadPersonaACargo: random(0, 5),
            cabezaFamilia: Boolean(random(0,1))
        }
        
    }





})


function random(mn, mx) { 
    return Math.round(Math.random() * (mx - mn) + mn); 
} 


var socioEconomicWB = xlsx.utils.book_new();
var socioEconomicWS = xlsx.utils.json_to_sheet(tbl_socioEconomicLevel);
xlsx.utils.book_append_sheet(socioEconomicWB, socioEconomicWS, "tbl_socioEconomicLevel");
xlsx.writeFile(socioEconomicWB, "tbl_socioEconomicLevel.xlsx");



//Log for debbuging
console.log(tbl_socioEconomicLevel);