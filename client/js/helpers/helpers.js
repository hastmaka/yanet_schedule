import {updateView} from "../main.js";

let url = 'http://localhost:9100/api/json';


export function loadTable(table, data, document) {
    //add new row number dynam
    for (let i in data) {
        let trData = data[i],
            cloneThead = table.children[0].cloneNode(true),
            tr = cloneThead.children[0],
            ths = tr.children;
        trData.number = parseInt(i) + 1;

        for (let th of ths) {
            if (th.id !== 'actions') {
                th.innerHTML = trData[th.id];
                continue;
            }
            //generate buttons
            let deleteButton = createActionBtn(document, 'Delete'),
                editButton = createActionBtn(document, 'Edit');
            deleteButton.id = 'deleteButton';
            deleteButton.className = 'deleteButton btn-secondary';
            editButton.id = 'editButton';
            editButton.className = 'editButton btn-primary-dark';
            deleteButton.onclick = function (event) {
                let button = event.target,
                    actions = button.parentNode,
                    tr = actions.parentNode,
                    th = tr.children[0],
                    value = parseInt(th.innerHTML);
                for (let client of data) {
                    if (client.number === value) {
                        let result = confirm("Want to delete?");
                        if (result) {
                            let index = data.indexOf(client);
                            table.children[1].removeChild(tr);
                            data.splice(index, 1);
                            saveJson(data);
                            break;
                        }
                        //devuelve la posicion

                    }
                }
            };
            editButton.onclick = function (event) {
                let form = createForm(document, toggle, trData, data);
            };
            th.innerHTML = '';
            th.appendChild(editButton);
            th.appendChild(deleteButton);

        }
        table.children[1].appendChild(tr);
    }
    //tremendo palo
    //recorrer data
    // for (let row of data) {
    //     let cloneThead = table.children[0].cloneNode(true),
    //         tr = cloneThead.children[0],
    //         ths = tr.children;
    //
    //     for (let th of ths) {
    //         th.innerHTML = row[th.id];
    //     }
    //     table.children[1].appendChild(tr);
    // }
}

//buen palo
//recorrer la data
// for (let i = 0; i < data.length; i++) {
//     let row = data[i],
//         cloneThead =  table.children[0].cloneNode(true),
//         tr = cloneThead.children[0],
//         ths = tr.children;
//
//     for (let j = 0; j < ths.length; j++) {
//         // ths[j].innerHTML = row[ths[j].id];
//         //refactor
//         let th = ths[j],
//             id = th.id;
//         th.innerHTML = row[id];
//     }
//     table.children[1].appendChild(tr);
// }

//medio palo
//recorrer la data
// for (let i = 0; i < data.length; i++) {
//     let row = data[i],
//         cloneThead =  table.children[0].cloneNode(true),
//         tr = cloneThead.children[0],
//         ths = tr.children;
//
//     ths[0].innerHTML = row[ths[0].id];
//     ths[1].innerHTML = row['name'];
//     ths[2].innerHTML = row.bed;
//     ths[3].innerHTML = row.bath;
//     ths[4].innerHTML = row.phone;
//     ths[5].innerHTML = row.service;
//     ths[6].innerHTML = row.area;
//     ths[7].innerHTML = row.notes;
//     ths[8].innerHTML = row.status;
//     table.children[1].appendChild(tr);
// }

//palo example
// let row1 = data[0],
//     row2 = data[1],
//     cloneRow = table.children[0].cloneNode(true),
//     cloneRow2 = table.children[0].cloneNode(true),
//     tr = cloneRow.children[0],
//     tr2 = cloneRow2.children[0],
//     ths = tr.children,
//     ths2 = tr2.children;
//
// ths[0].innerHTML = data[0].number;
// ths[1].innerHTML = data[0].name;
// ths[2].innerHTML = data[0].bed;
// ths[3].innerHTML = data[0].bath;
// ths[4].innerHTML = data[0].phone;
// ths[5].innerHTML = data[0].service;
// ths[6].innerHTML = data[0].area;
// ths[7].innerHTML = data[0].notes;
// ths[8].innerHTML = data[0].status;
//
// ths2[0].innerHTML = data[1].number;
// ths2[1].innerHTML = data[1].name;
// ths2[2].innerHTML = data[1].bed;
// ths2[3].innerHTML = data[1].bath;
// ths2[4].innerHTML = data[1].phone;
// ths2[5].innerHTML = data[1].service;
// ths2[6].innerHTML = data[1].area;
// ths2[7].innerHTML = data[1].notes;
// ths2[8].innerHTML = data[1].status;
//
// //appendChild
// table.children[1].appendChild(tr);
// table.children[1].appendChild(tr2);

function createActionBtn(document, text) {
    let button = document.createElement('button');
    button.innerHTML = text;
    return button;
}

export function createForm(document, toggle, trData, data) {
    // debugger;
    let body = document.getElementById('body'),
        popupContact = document.createElement('div'),
        form = document.createElement('form'),
        h2 = document.createElement('h2'),
        hr = document.createElement('hr'),
        nameInput = document.createElement('input'),
//#region bedSelect
        bedOptions = [{
            innerHTML: 'Bed'
        }, {
            text: '1',
            value: 1
        }, {
            text: '2',
            value: 2
        }, {
            text: '3',
            value: 3
        }, {
            text: '4',
            value: 4
        }, {
            text: '5',
            value: 5
        }],
        bedAttributes = {
            id: 'bed',
            class: 'input-group'
        },
        bedSelect = createSelect(bedAttributes, bedOptions, (trData && trData.bed) ? trData.bed : null),

//#endregion
//#region bathSelect
        bathOptions = [{
            selected: true,
            innerHTML: 'Bath'
        }, {
            text: '1',
            value: 1
        }, {
            text: '2',
            value: 2
        }, {
            text: '3',
            value: 3
        }, {
            text: '4',
            value: 4
        }, {
            text: '5',
            value: 5
        }],
        bathAttributes = {
            id: 'bath',
            class: 'input-group'
        },
        bathSelect = createSelect(bathAttributes, bathOptions, (trData && trData.bath) ? trData.bath : null),
//#endregion
        phoneInput = document.createElement('input'),
//#region serviceSelect
        serviceOptions = [{
            selected: true,
            innerHTML: 'Service'
        }, {
            text: 'Rent',
            value: 'Rent'
        }, {
            text: 'Buy',
            value: 'Buy'
        }, {
            text: 'Sell',
            value: 'Sell'
        }, {
            text: 'Rent by Own',
            value: 'Rent by Own'
        }, {
            text: 'Sell by Own',
            value: 'Sell by Own'
        }, {
            text: 'Multifamily',
            value: 'Multifamily'
        }],
        serviceAttributes = {
            id: 'service',
            class: 'input-group'
        },
        serviceSelect = createSelect(serviceAttributes, serviceOptions, (trData && trData.service) ? trData.service : null),
//#endregion
        areaInput = document.createElement('input'),
        priceInput = document.createElement('input'),
//#region statusSelect
        statusOptions = [{
            selected: true,
            innerHTML: 'Status'
        }, {
            text: 'Done',
            value: 'Done'
        }, {
            text: 'Pending',
            value: 'Pending'
        }, {
            text: 'Call',
            value: 'Call'
        }, {
            text: 'Note',
            value: 'Note'
        }],
        statusAttributes = {
            id: 'status',
            class: 'input-group'
        },
        statusSelect = createSelect(statusAttributes, statusOptions, (trData && trData.status) ? trData.status : null),
//#endregion
        textArea = document.createElement('textarea'),
        datePickerInput = document.createElement('input'),

        saveBtn = createActionBtn(document, 'Save'),
        cancelBtn = createActionBtn(document, 'Cancel');


    saveBtn.onclick = function (event) {
        event.preventDefault();

        if (!form[0].value || !form[1].value || !form[2].value || !form[3].value ||
            !form[4].value || !form[5].value || !form[6].value || !form[7].value) {
            return alert('Some Field is missing');
        }
        //edit
        if (trData) {
            let index = data.indexOf(trData);
            let newValues = {
                name: form[0].value,
                phone: form[1].value,
                area: form[2].value,
                price: form[3].value,
                bed: form[4].value,
                bath: form[5].value,
                service: form[6].value,
                status: form[7].value,
                notes: form[8].value,
                date: form[9].value,
            };
            let result = confirm('Check Everything is OK');
            if (result) {
                data[index] = newValues;
            }
            ;

        } else {
            data.push({
                number: data.length+1,
                name: form[0].value,
                phone: form[1].value,
                area: form[2].value,
                price: form[3].value,
                bed: form[4].value,
                bath: form[5].value,
                service: form[6].value,
                status: form[7].value,
                notes: form[8].value,
                date: form[9].value,
            });
        }
        saveJson(data);
        updateView(table, data, document);
        cancelBtn.click();
    }

    cancelBtn.onclick = function (event) {
        event.preventDefault();
        if(!trData){
            toggle.click();
        }
        popupContact.remove();
    }

    body.appendChild(popupContact);
    popupContact.appendChild(h2);
    popupContact.appendChild(hr);
    popupContact.appendChild(form);

    form.appendChild(nameInput);
    form.appendChild(phoneInput);
    form.appendChild(areaInput);
    form.appendChild(priceInput);
    form.appendChild(bedSelect);
    form.appendChild(bathSelect);
    form.appendChild(serviceSelect);
    form.appendChild(statusSelect);
    form.appendChild(textArea);
    form.appendChild(datePickerInput);
    form.appendChild(saveBtn);
    form.appendChild(cancelBtn);

    popupContact.setAttribute('id', 'popupContact');
//form
    form.setAttribute("id", 'form');
    form.setAttribute('method', 'post');
    form.className = 'row g-3';
//h2
    h2.id = 'h2';
    h2.innerText = 'Contact Us';
//hr
    hr.setAttribute('id', 'hr');
//nameInput
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute("placeholder", "Full Name");
    nameInput.id = 'nameInput';
    nameInput.className = 'form-control col-md-6';
    nameInput.required = true;
    if (trData && trData.name) {
        nameInput.value = trData.name;
    }
//phoneInput
    phoneInput.setAttribute('type', 'tel');
    phoneInput.pattern = '1';
    phoneInput.setAttribute("placeholder", "Phone");
    phoneInput.id = 'phoneInput';
    phoneInput.className = 'form-control';
    phoneInput.oninput = (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }
    if (trData && trData.phone) {
        phoneInput.value = trData.phone;
    }
//areaInput
    areaInput.setAttribute('type', 'text');
    areaInput.setAttribute("placeholder", "Area");
    areaInput.id = 'areaInput';
    areaInput.className = 'form-control';
    if (trData && trData.area) {
        areaInput.value = trData.area;
    }
//priceInput
    priceInput.setAttribute('type', 'number');
    priceInput.setAttribute("placeholder", "Price");
    priceInput.id = 'priceInput';
    priceInput.className = 'form-control';
    if (trData && trData.price) {
        priceInput.value = trData.price;
    }
//textArea
    textArea.className = 'notes';
    textArea.id = 'notesForm';
    textArea.setAttribute("placeholder", 'Notes');
    if (trData && trData.notes) {
        textArea.value = trData.notes;
    }
//datePickerInput
    datePickerInput.setAttribute('type', 'date');
    datePickerInput.id = 'datePickerInput';
    datePickerInput.className = 'form-control';
    if (trData && trData.price) {
        datePickerInput.value = trData.price;
    }
//buttons
    saveBtn.classList = 'btn btn-primary';
    saveBtn.id = 'saveBtn';
    cancelBtn.classList = 'btn btn-secondary';
    cancelBtn.id = 'cancelBtn';
}

function createSelect(attributes, options, selectedOpt) {
    let select = document.createElement('select');
    select.setAttribute('id', attributes.id);
    select.setAttribute('class', attributes.class);

    let condition = false;
    for (let opt of options) {
        let selectOpt = document.createElement('option');
        if (opt.text) {
            selectOpt.text = opt.text;
        }
        if (opt.value) {
            if (`${opt.value}` === selectedOpt) {
                opt.selected = true;
                condition = true;
            }
            selectOpt.value = opt.value;
        }
        if (opt.selected) {
            selectOpt.selected = opt.selected;
        }
        if (opt.innerHTML) {
            selectOpt.innerHTML = opt.innerHTML;
        }
        select.appendChild(selectOpt);
    }
    if (!condition) {
        options[0].selected = true;
    }
    return select;
}

export async function loadJson() {
    const response = await fetch(url);
    const client = await response.json();
    return client;
}

export async function saveJson(data) {
    //save to json file
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

