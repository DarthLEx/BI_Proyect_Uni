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

let Id_generator = 1;

let studentsArray = [];

let Grades = [70, 50, 35];


let nacionalidades = [
    'American',
    'German', 
    'Chilean', 
    'Mexican',
    'South African', 
    'Venezuelan',
    'Albanian',
    'Armenian',
    'Australian',
    'Belgian',
    'Canadian',
    'Egyptian',
    'Indian',
    'Italian',
    'Russian',
    'English',
    'Chinese',
    'Vietnamese',
    'New Zealander',
    'Israeli'
]


let gradeLevels = [
    'High School',
    'Bachelor’s Degree',
    'Master’s Degree',
    'Doctorate'
];


for (let i=0; i<2000; i++){
    //Random definitions
    let MathVariation = (getRandomInt(35))/100;
    let WritingVariation = (getRandomInt(30))/100;
    let ReadingVariation = (getRandomInt(20))/100;


    //console.log(MathVariation, WritingVariation, ReadingVariation)

    let NameGenderIndex = getRandomInt(NamesGenre.length)

    studentsArray.push({
        Id: Id_generator,
        Nombre: NamesGenre[NameGenderIndex].Name,
        Apellido: LastNames[getRandomInt(LastNames.length)].Surname.toLowerCase(),
        Sexo: NamesGenre[NameGenderIndex].Gender,
        Nationality: nacionalidades[getRandomInt(nacionalidades.length)],
        AcademicLevel: gradeLevels[getRandomInt(gradeLevels.length)],
        MathScore: Varianza(Grades[getRandomInt(Grades.length)], MathVariation) ,
        ReadingScore: Varianza(Grades[getRandomInt(Grades.length)], ReadingVariation), 
        WritingScore: Varianza(Grades[getRandomInt(Grades.length)], WritingVariation),
        fk_Program: tbl_Programs[getRandomInt(tbl_Programs.length)].Id,
        fk_parentalLevel: tbl_parentalLevel[getRandomInt(tbl_parentalLevel.length)].Id
    });

    Id_generator++;

}


let tbl_Estudiantes = studentsArray.map(value => {
    return {
        Id: value.Id,
        Nombre: value.Nombre,
        Apellido: value.Apellido,
        Nationality: value.Nationality,
        AcademicLevel: value.AcademicLevel,
        Sexo: value.Sexo,
        fk_Program: value.fk_Program,
        fk_parentalLevel: value.fk_parentalLevel
    }
})

let tbl_studentPerformancePrev = studentsArray.map(value=>{
    return{
        Id: value.Id*4,
        MathScore: value.MathScore,
        ReadingScore: value.ReadingScore,
        WritingScore: value.WritingScore,
        fk_Student: value.Id
    }
})

let tbl_studentPerformance = [];

tbl_studentPerformancePrev.forEach(student=>{
    //console.log(student)

    student.Year = 2018;

    tbl_studentPerformance.push(student)

    let Variation1 = {
        Id: student.Id+1,
        MathScore: Varianza(student.MathScore, (Math.random()*25)/100),
        ReadingScore: Varianza(student.ReadingScore, (Math.random()*25)/100),
        WritingScore: Varianza(student.MathScore, (Math.random()*25)/100),
        Year: 2019,
        fk_Student: student.fk_Student
    }; tbl_studentPerformance.push(Variation1)

    let Variation2 = { 
        Id: student.Id+2,
        MathScore: Varianza(Variation1.MathScore, (Math.random()*25)/100),
        ReadingScore: Varianza(Variation1.ReadingScore, (Math.random()*25)/100),
        WritingScore: Varianza(Variation1.MathScore, (Math.random()*25)/100),
        Year: 2020,
        fk_Student: student.fk_Student
    }; tbl_studentPerformance.push(Variation2)

    let Variation3 = {
        Id: student.Id+3,
        MathScore: Varianza(Variation2.MathScore, (Math.random()*25)/100),
        ReadingScore: Varianza(Variation2.ReadingScore, (Math.random()*25)/100),
        WritingScore: Varianza(Variation2.MathScore, (Math.random()*25)/100),
        Year: 2021,
        fk_Student: student.fk_Student
    }; tbl_studentPerformance.push(Variation3)

});




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Varianza(num, percent){
    let sign = Math.floor(Math.random()*2);

   //console.log(sign)
    if(sign == 1) return Math.round(num - (num*percent));
    else return Math.round(num + (num*percent));

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
console.log(tbl_studentPerformance);

