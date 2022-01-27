// Definér variabler
var timer = 100,
    grades = [],
    snit = 0,
    hasrun = false;

// Tilføj CSS til

// main-funktion
init = function(){

    // Udregn ikke snit to gange
    if(hasrun){
        return false;
    }

    hasrun = true;

    // Definér tabel som variabel
    table = document.querySelector("table.Data tbody");

    // Kør funktion for hver linje i tabellen
    Array.from(table.children).forEach(function(element, i){

        // Check om resultatet er et tal (Alternativ er bestået/ikke bestået)
        if(!isNaN(parseInt(element.children[4].innerHTML))){
            grades.push({
                ECTS: parseInt(element.children[6].innerHTML),
                res: parseInt(element.children[4].innerHTML)
            });
        } else {

            // Eventuelt lav en bestået%
        }
    });

    // Udregn total ECTS fra data nu tilføjet til grades
    totalECTS = grades.reduce(function(a, b){
        return {
            ECTS: a.ECTS + b.ECTS
        };
    }).ECTS;

    // Udregn snit med vægt = ECTS / totalECTS
    grades.forEach(function(element, i){
        snit += (element.res * (element.ECTS / totalECTS));
    });

    // Afrund snit til 2 decimaler
    snit = Math.round(snit * 100) / 100;

    // Definér linje med snit
    snitLinje = document.createElement("tr");

    // Mimér DOM-strukturen fra tabellen
    snitLinje.setAttribute("class", "DataSelect snit");
    snitLinje.innerHTML = '<td class="DataValue" valign="top"></td><td class="DataValue" valign="top">ECTS-vægtet gennemsnit</td><td class="DataValue" align="center" valign="top"></td><td class="DataValue" align="center" valign="top"></td><td class="DataValue" valign="top" align="center">' + snit + '</td><td class="DataValue" valign="top" align="center"></td><td class="DataValue" align="right" valign="top"></td>'

    // Tilføj linjen til tabellen
    table.appendChild(snitLinje);
}

// Kør ikke funktionen før karakterer er loaded
checkinit = function(){
    if(document.querySelector("table.Data").children.length > 0){
        init();
    }

    else {
        window.setTimeout(checkinit, timer);
    }
}

checkinit();
