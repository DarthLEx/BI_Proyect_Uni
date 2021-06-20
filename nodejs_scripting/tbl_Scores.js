const xlsx = require("xlsx");

const rankWorbook = xlsx.readFile("sources/soucesInXLSX.xlsx");
const tbl_Universidades = xlsx.readFile("tbl_Unis.xlsx")

const rankWorkSheet =  xlsx.utils.sheet_to_json(rankWorbook.Sheets["Universidades"]);
const tbl_UniSheet = xlsx.utils.sheet_to_json(tbl_Universidades.Sheets["tbl_Universities"])


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

rankingJSONArrayPrev = rankingJSON.map(({
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


let tbl_UniversityScores = [];

rankingJSONArrayPrev.forEach(score=>{
    //console.log(student)

    score.year = 2018;

    //console.log(score);

    tbl_UniversityScores.push(score)

    let Variation1 = {
        fk_University: score.fk_University,
        national_rank: Varianza(score.national_rank, (Math.random()*25)/100),
        quality_of_education: Varianza(score.quality_of_education, (Math.random()*25)/100),
        alumni_employment: Varianza(score.alumni_employment, (Math.random()*25)/100),
        publications: Varianza(score.publications, (Math.random()*25)/100),
        citations: Varianza(score.citations, (Math.random()*25)/100),
        patents: Varianza(score.patents, (Math.random()*25)/100),
        year: 2019
    }; tbl_UniversityScores.push(Variation1)

    let Variation2 = { 
        fk_University: score.fk_University,
        national_rank: Varianza(Variation1.national_rank, (Math.random()*25)/100),
        quality_of_education: Varianza(Variation1.quality_of_education, (Math.random()*25)/100),
        alumni_employment: Varianza(Variation1.alumni_employment, (Math.random()*25)/100),
        publications: Varianza(Variation1.publications, (Math.random()*25)/100),
        citations: Varianza(Variation1.citations, (Math.random()*25)/100),
        patents: Varianza(Variation1.patents, (Math.random()*25)/100),
        year: 2020
        
    }; tbl_UniversityScores.push(Variation2)

    let Variation3 = {
        fk_University: score.fk_University,
        national_rank: Varianza(Variation2.national_rank, (Math.random()*25)/100),
        quality_of_education: Varianza(Variation2.quality_of_education, (Math.random()*25)/100),
        alumni_employment: Varianza(Variation2.alumni_employment, (Math.random()*25)/100),
        publications: Varianza(Variation2.publications, (Math.random()*25)/100),
        citations: Varianza(Variation2.citations, (Math.random()*25)/100),
        patents: Varianza(Variation2.patents, (Math.random()*25)/100),
        year: 2021
    }; tbl_UniversityScores.push(Variation3)

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




console.log(tbl_UniversityScores)


var scoreWB = xlsx.utils.book_new();
var scoreWS = xlsx.utils.json_to_sheet(tbl_UniversityScores);
xlsx.utils.book_append_sheet(scoreWB, scoreWS, "tbl_Scores");
xlsx.writeFile(scoreWB, "tbl_Scores.xlsx");