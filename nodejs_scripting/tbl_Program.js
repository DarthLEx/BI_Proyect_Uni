//TODO:
    //Take all the names of the programs from soucerinXLSX.xlsx:ProgramasPorUniversidades
    //Generate an unique Id for each of them
    //Import Universities list from tbl_Unis.xlsx and match every program with the name of the Uni using the source xlsx
    //Import Delivery list from tbl_Delivery.xlsx and match every program with the name of the Delivery using the source xlsx

const xlsx = require("xlsx");

const sourceXLSX = xlsx.utils.sheet_to_json(xlsx.readFile("sources/soucesInXLSX.xlsx").Sheets["ProgramasPorUniversidades"]); 
const UniversitiesList = xlsx.utils.sheet_to_json(xlsx.readFile("tbl_Unis.xlsx").Sheets["tbl_Universities"]);
const DeliveryList = xlsx.utils.sheet_to_json(xlsx.readFile("tbl_Delivery.xlsx").Sheets["tbl_Delivery"]);

let Id_Generation = 0;

let tbl_Program = sourceXLSX.map((value, index, array)=>{
    return value.PROGRAM
}).filter((value, index, array)=>{
    return index === array.indexOf(value);
}).map((value, index, array)=>{
    Id_Generation++;
    return {
        Id: Id_Generation,
        NameProgram: value
    }
})


//Match Program with type of delivery

tbl_Program = tbl_Program.map((value, index, array)=>{

    var MatchingArrayDelivery = sourceXLSX.filter(valuesrc=>{
        return valuesrc.PROGRAM === value.NameProgram
    }).map(value=>{
        return JSON.stringify(value)
    }).filter((value, index, array)=>{
        return index === array.indexOf(value);
    }).map(value=>{
        return JSON.parse(value);
    })

    let matchingDelivery = MatchingArrayDelivery[0].DELIVERY;
    
    let fk_Deliverymatched =  DeliveryList.filter(value=>{
        //console.log(matchingDelivery);
        return matchingDelivery === value.ProgramName
    }).map(value1=>{
        return value1.Id
    });

    return {...value, fk_Delivery: fk_Deliverymatched[0]}
})

//Match Program with University

let SchoolProgramArray = sourceXLSX.map( value =>  {
    return JSON.stringify({SCHOOL: value.SCHOOL, PROGRAM: value.PROGRAM})}).filter((value, index, array)=>{
        return index === array.indexOf(value);
}).map(value=>{
    return JSON.parse(value);
});




tbl_Program = tbl_Program.map(valueProgram => {

    let SchoolProgramFiltered = SchoolProgramArray.filter(valueSchool=>{
        if(valueSchool.PROGRAM == valueProgram.NameProgram) console.log(valueSchool.PROGRAM == valueProgram.NameProgram);
        return valueSchool.PROGRAM == valueProgram.NameProgram
    })

    let UniFiltered = UniversitiesList.filter(valueUnis=>{
        return valueUnis.NombreUniversidad === SchoolProgramFiltered[0].SCHOOL
    })

    return {...valueProgram, fk_University: UniFiltered[0].Id}

})

console.log(tbl_Program)

var newWb = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(tbl_Program);
xlsx.utils.book_append_sheet(newWb, newWS, "tbl_Program");

xlsx.writeFile(newWb, "tbl_Program.xlsx");

console.log("Done!")









