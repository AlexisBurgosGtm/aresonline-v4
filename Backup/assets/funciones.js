function fcn_hablar(texto) {
    var utterance = new SpeechSynthesisUtterance(texto);
    return window.speechSynthesis.speak(utterance); 
};

function fcn_CompaniaTelefono(numero, hablado){
    var rangos = [[30000000,32289999,"TIGO"],
                  [32290000,32299999,"CLARO"],
                  [32300000,33099999,"TIGO"],
                  [34000000,34499999,"MOVISTAR"],
                  [40000000,40999999,"TIGO"],
    [41000000,42999999,"CLARO"],
    [43000000,44759999,"MOVISTAR"],
    [44760000,46999999,"TIGO"],
    [47000000,47729999,"CLARO"],
    [47730000,48199999,"TIGO"],
    [48200000,48219999,"UNITEL"],
    [48220000,50099999,"TIGO"],
    [50100000,50199999,"CLARO"],
    [50200000,50299999,"MOVISTAR"],
    [50300000,50699999,"TIGO"],
    [50700000,51099999,"MOVISTAR"],
    [51100000,51399999,"CLARO"],
    [51400000,51499999,"MOVISTAR"],
    [51500000,51999999,"TIGO"],
    [52000000,52099999,"TIGO"],
    [52100000,52999999,"MOVISTAR"],
    [53000000,53099999,"TIGO"],
    [53100000,53119999,"CLARO"],
    [53120000,53139999,"MOVISTAR"],
    [53140000,53899999,"TIGO"],
    [53900000,54099999,"MOVISTAR"],
    [54100000,54999999,"CLARO"],
    [55000000,55099999,"MOVISTAR"],
    [55100000,55179999,"CLARO"],
    [55180000,55199999,"MOVISTAR"],
    [55210000,55299999,"TIGO"],
    [55310000,55399999,"CLARO"],
    [55400000,55429999,"MOVISTAR"],
    [55430000,55449999,"CLARO"],
    [55450000,55499999,"MOVISTAR"],
    [55500000,55539999,"TIGO"],
    [55540000,55799999,"CLARO"],
    [55800000,55819999,"TIGO"],
    [55820000,55999999,"CLARO"],
    [56000000,56089999,"MOVISTAR"],
    [56100000,56399999,"CLARO"],
    [56400000,56899999,"MOVISTAR"],
    [56900000,56999999,"CLARO"],
    [57000000,57099999,"TIGO"],
    [57100000,57189999,"CLARO"],
    [57190000,57899999,"TIGO"],
    [57900000,57999999,"MOVISTAR"],
    [58000000,58099999,"TIGO"],
    [58100000,58189999,"CLARO"],
    [58190000,58199999,"TIGO"],
    [58200000,58799999,"CLARO"],
    [58800000,59099999,"TIGO"],
    [59100000,59149999,"CLARO"],
    [59150000,59179999,"MOVISTAR"],
    [59180000,59199999,"TIGO"],
    [59200000,59899999,"CLARO"],
    [59900000,59999999,"TIGO"]],

    lengthRangos = rangos.length;

    var num = numero;
    len = num.length; 
    nnum = parseInt(num,10);

    if (len == 8 ) {
        for (var i = lengthRangos - 1; i >= 0; i--) {
            if (rangos[i][0] <= nnum && nnum <= rangos[i][1]) {
                if (hablado=='SI'){     
                    fcn_hablar("Su línea telefónica es " + rangos[i][2]);
                }else{
                    return rangos[i][2];
                }
                found = true;
            }
        };
    
        if (!found) {
            if (hablado=='SI'){ 
                fcn_hablar("El número indicado no aparece en la lista");
            }else{
                return "No Disponible";
            }
        }

    } else {
        return "Ingrese 8 dígitos";
    }


};