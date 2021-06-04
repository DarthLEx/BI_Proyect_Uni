const xlsx = require("xlsx");

const wb = xlsx.readFile("sources/soucesInXLSX.xlsx");

const ubicationWorksheet = xlsx.utils.sheet_to_json(wb.Sheets["ProgramasPorUniversidades"]);

//console.log(ubicationWorksheet);

var ID = 1;

var ubicaciones = ubicationWorksheet.map((rows)=> {

        return JSON.stringify({"state": rows.STATE, "City": rows.CITY})

    }).filter((ubicacion, index, ubicaciones)=>{
        
        return index === ubicaciones.indexOf(ubicacion);

    }).map(value=>{
        var Json = {Id: ID,...JSON.parse(value)};
        ID++;
        return Json;
})


ID = 1;

var StateList = ubicationWorksheet.map(ubication=>{
        return ubication.STATE;
}).filter((state, index, States)=>{
        return index === States.indexOf(state);
}).map(state=>{
        var stateJSON = {Id: ID, Name: state}
        ID++;
        return stateJSON;
})

ID = 1

var CitiesList = ubicationWorksheet.map(ubication=>{
    return ubication.CITY;
}).filter((city, index, Cities)=>{
    return index === Cities.indexOf(city);
}).map(city=>{
    var cityJSON = {Id: ID, Name: city}
    ID++;
    return cityJSON;
})


// WE WILL USE THE OLD WAYS!!!!
CitiesList.forEach(city => {
    
    var ubicationRow = {}

    ubicaciones.forEach(ubi=>{
        if(city.Name === ubi.City) ubicationRow = ubi;
    })


    var stateID = null
    StateList.forEach(state=>{
        if(ubicationRow.state === state.Name) stateID = state.Id;
    })

    city.fk_StateID = stateID;


});

console.log(StateList)

console.log(CitiesList);


var stateWB = xlsx.utils.book_new();
var stateWS = xlsx.utils.json_to_sheet(StateList);
xlsx.utils.book_append_sheet(stateWB, stateWS, "tbl_States");
xlsx.writeFile(stateWB, "tbl_States.xlsx");

var cityWB = xlsx.utils.book_new();
var cityWS = xlsx.utils.json_to_sheet(CitiesList);
xlsx.utils.book_append_sheet(cityWB, cityWS, "tbl_Cities");
xlsx.writeFile(cityWB, "tbl_Cities.xlsx");

console.log("Done!")