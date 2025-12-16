// === SECTION ÉS TÁBLA LÉTREHOZÁSA ===
const section = document.createElement("div")
section.id = "jssection"
section.classList.add("hide")
document.body.appendChild(section)
 
const table = document.createElement("table")
section.appendChild(table)
 
// === CREATE CELL FUNCTION ===

 
// === THEAD ===
/** @type {string[]} */
const theadArr = ["Osztály", "Manó", "Műszak"]
const thead = document.createElement("thead")
const tr = document.createElement("tr")
for(const text of theadArr){
    createCell(text, tr, "th")
}
thead.appendChild(tr)
table.appendChild(thead)
 
// === ADATOK ===
/**
 * @typedef {Object} TbodyItem
 * @property {string} what Osztály neve
 * @property {string} who1 Első manó neve
 * @property {string} shift1 Első manó műszaka
 * @property {string} [who2] Második manó neve (opcionális)
 * @property {string} [shift2] Második manó műszaka (opcionális)
 */
 
/** @type {TbodyItem[]} */
const tbodyArr = [
    { what: "Logisztika", who1: "Kovács Máté", shift1: "Délelöttös", who2: "Kovács József", shift2: "Délutános" },
    { what: "Könyvelés", who1: "Szabó Anna", shift1: "Éjszakai" },
    { what: "Játékfejlesztés", who1: "Varga Péter", shift1: "Délutános", who2: "Nagy Eszter", shift2: "Éjszakai" }
]
initSelect(tbodyArr)
 
// === TBODY ===
const tbody = document.createElement("tbody")
tbody.id = "jstbody"
table.appendChild(tbody)
 
renderTbody(tbodyArr)
 
// === FORM GENERÁLÁS ===
/**
 * @typedef {Object} FormField
 * @property {string} id Az input mező id-ja
 * @property {string} label A label szövege
 * @property {string} name Az input mező neve
 * @property {"checkbox"|"select"} [type] Input típusa
 * @property {{value:string,label:string}[]} [optionList] Select opciók listája
 */
 
/** @type {FormField[]} */
const formArr = [
    { id: "osztaly", label: "Osztály", name: "osztaly" },
    { id: "mano1", label: "Manó 1", name: "mano1" },
    { id: "muszak1", label: "Manó 1 műszak", name: "muszak1", type: "select", optionList: [
        { value: "1", label: "Délelöttös" },
        { value: "2", label: "Délutános" },
        { value: "3", label: "Éjszakai" }
    ]},
    { id: "masodikmano", label: "Két manót veszek fel", name: "masodikmano", type: "checkbox" },
    { id: "mano2", label: "Manó 2", name: "mano2" },
    { id: "muszak2", label: "Manó 2 műszak", name: "muszak2", type: "select", optionList: [
        { value: "1", label: "Délelöttös" },
        { value: "2", label: "Délutános" },
        { value: "3", label: "Éjszakai" }
    ]}
]
 
const form = createForm(formArr)
form.id = "jsform"
section.appendChild(form)
 
// === JS FORM SUBMIT ===
form.addEventListener("submit", function(e){
    e.preventDefault()
    const osztaly = form.querySelector("#osztaly")
    const mano1 = form.querySelector("#mano1")
    const muszak1 = form.querySelector("#muszak1")
    const masodikmano = form.querySelector("#masodikmano")
    const mano2 = form.querySelector("#mano2")
    const muszak2 = form.querySelector("#muszak2")
 
    clearErrors(form)
    if(validate(osztaly) & validate(mano1) & validate(muszak1)){
        const newEntry = { what: osztaly.value, who1: mano1.value, shift1: mapMuszak(muszak1.value) }
        if(masodikmano.checked){
            newEntry.who2 = mano2.value
            newEntry.shift2 = mapMuszak(muszak2.value)
        }
        createNewElement(newEntry, form, tbodyArr)
    }
})
 
// === HTML FORM SUBMIT ===
document.getElementById("htmlform").addEventListener("submit", function(e){
    e.preventDefault()
    const chooser = e.target.querySelector("#manochooser")
    const man1 = e.target.querySelector("#manotev1")
    const man2 = e.target.querySelector("#manotev2")
 
    clearErrors(e.target)
    if(validate(chooser) & validate(man1)){
        const tbodyHTML = document.getElementById("htmltbody")
        const tr = document.createElement("tr")
        tbodyHTML.appendChild(tr)
 
        createCell(chooser.value, tr, "td")
        const td2 = createCell(man1.value, tr, "td")
 
        if(man2.value){
            createCell(man2.value, tr, "td")
        } else {
            td2.colSpan = 2
        }
 
        e.target.reset()
    }
})
 
// === CHECKBOX INIT ===
initCheckbox(form.querySelector("#masodikmano"))