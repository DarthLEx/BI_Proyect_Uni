const xlsx = require("xlsx");

const rankWorbook = xlsx.readFile("sources/soucesInXLSX.xlsx");
const tbl_Universidades = xlsx.readFile("tbl_Unis.xlsx")

const rankWorkSheet =  xlsx.utils.sheet_to_json(rankWorbook.Sheets["Universidades"]);
const tbl_UniSheet = xlsx.utils.sheet_to_json(tbl_Universidades.Sheets["tbl_Unisersities"])


var rankingJSON=[];

console.log(tbl_UniSheet)

tbl_UniSheet.forEach(Uni=>{

    rankWorkSheet.forEach(Rank=>{
        if(Rank.institution === Uni.NombreUniversidad){
            console.log(true);
            Rank.fk_University=Uni.Id
            rankingJSON.push(Rank);
        } 

    })


})

rankingJSON = rankingJSON.map(({
    fk_University,
    national_rank, quality_of_education,
    alumni_employment, 
    publications, 
    citations, 
    patents,
    })=>{

    return {
        fk_University: fk_University,
        national_rank: national_rank,
        quality_of_education: quality_of_education,
        alumni_employment: alumni_employment,
        publications: publications,
        citations: citations,
        patents: patents
    }
})

console.log(rankingJSON)


var scoreWB = xlsx.utils.book_new();
var scoreWS = xlsx.utils.json_to_sheet(rankingJSON);
xlsx.utils.book_append_sheet(scoreWB, scoreWS, "tbl_Scores");
xlsx.writeFile(scoreWB, "tbl_Scores.xlsx");