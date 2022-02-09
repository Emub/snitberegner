// main-funktion
init = function(){

    // Definér variabler
     var grades = [],
         snit = 0;
    
    // Definér tabel som variabel
    table = document.querySelector("table.Data tbody");

    // Fjern snitlinjen hvis denne eksisterer, da funktionen nu vil genberegne denne
    if(document.querySelector("tr.snit")) document.querySelector("tr.snit").remove();

    // Kør funktion for hver linje i tabellen
    Array.from(table.children).forEach(function(element, i){

        if(element.getAttribute("class").indexOf("childRow") == -1){

            // Check om resultatet er et tal (Alternativ er bestået/ikke bestået)
            if(!isNaN(parseInt(element.children[element.children.length - 3].innerHTML))){
                grades.push({
                    ECTS: parseInt(element.children[element.children.length - 1].innerHTML),
                    res: parseInt(element.children[element.children.length - 3].innerHTML)
                });
            } else {
                // Eventuelt lav en bestået%
            }
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

    // Test antal felter i tabel, da denne varierer
    if(table.children[0].children.length == 8){
        snitLinje.innerHTML = '<td class="DataValue" valign="top"></td><td class="DataValue" valign="top"></td><td class="DataValue" valign="top">ECTS-vægtet gennemsnit</td><td class="DataValue" align="center" valign="top"></td><td class="DataValue" align="center" valign="top"></td><td class="DataValue" valign="top" align="center">' + snit + '</td><td class="DataValue" valign="top" align="center"></td><td class="DataValue" align="right" valign="top"></td>'

    }

    else {
        snitLinje.innerHTML = '<td class="DataValue" valign="top"></td><td class="DataValue" valign="top">ECTS-vægtet gennemsnit</td><td class="DataValue" align="center" valign="top"></td><td class="DataValue" align="center" valign="top"></td><td class="DataValue" valign="top" align="center">' + snit + '</td><td class="DataValue" valign="top" align="center"></td><td class="DataValue" align="right" valign="top"></td>'
    }

    // Tilføj linjen til tabellen
    table.appendChild(snitLinje);
}


checkinit = function(){
    if(document.querySelector("table.Data")){

        // Table eksisterer, kør nu funktionen 50 gange over de næste 5 sekunder, for at imødekomme eventuelle load-tider
        var initLoop = setInterval(init, 100);
        setTimeout(() => {
            clearInterval(initLoop);
        }, 5000);
    }

    else {
        window.setTimeout(checkinit, 10);
    }
}

checkinit();
