import {loadTable, loadJson, saveJson, createForm} from "./helpers/helpers.js";


let toggle = document.getElementById('toggle'),
    search = document.getElementById('searchInput'),

    //form data
    jsonDocument = await loadJson(),
    data = jsonDocument.data;

//god level
loadTable(table, data, document);


export function updateView(table, data, document) {
    //vaciar y remplazar la tbody
    let newTbody = document.createElement('tbody');
    table.replaceChild(newTbody, table.children[1]);
    //recargar la table
    loadTable(table, data, document);
}

toggle.onclick = function () {
    toggle.classList.toggle('active');
    if (!document.getElementById('popupContact')) {
        createForm(document, this, null, data);
    }
}

//--------------------------------------------------------------
// function filterTable(event) {
//     let queryResults = [],
//         inputValue = event.target.value;
//
//     // debugger;
//     if (!inputValue) {
//         updateView(table, data, document);
//     } else {
//         for (let clients of data) {
//             if (inputValue === clients.name) {
//                 queryResults.push(clients);
//             }
//         }
//         updateView(table, queryResults, document);
//     }
// }
//
// search.addEventListener('keyup', event => filterTable(event));
// search.addEventListener('search', event => filterTable(event));



let events = ['keyup', 'search'];
for (let event of events){
    search.addEventListener(event, evt => {
        let queryResults = [],
            inputValue = evt.target.value;

        // debugger;
        if (!inputValue) {
            updateView(table, data, document);
        } else {
            for (let clients of data) {
                if (inputValue === clients.name) {
                    queryResults.push(clients);
                }
            }
            updateView(table, queryResults, document);
        }
    })
}



