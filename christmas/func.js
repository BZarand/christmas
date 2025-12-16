/**
 * Létrehoz egy táblázat cellát
 * @param {string} text A cella tartalma
 * @param {HTMLTableRowElement} row A sor amihez csatoljuk
 * @param {"th"|"td"} type Hogy thead vagy tbody cella legyen
 * @returns {HTMLTableCellElement} A létrehozott cella
 */
function createCell(text, row, type){
    const cell = document.createElement(type)
    cell.innerText = text
    row.appendChild(cell)
    return cell
}

/**
 * Tbody renderelése
 * @param {TbodyItem[]} list A táblázat adatai
 * @returns {void}
 */
function renderTbody(list){
    tbody.innerHTML = ""
    for(const item of list){
        const row1 = document.createElement("tr")
        tbody.appendChild(row1)
 
        const tdWhat = createCell(item.what, row1, "td")
        createCell(item.who1, row1, "td")
        createCell(item.shift1, row1, "td")
 
        if(item.who2 && item.shift2){
            tdWhat.rowSpan = "2"
            const row2 = document.createElement("tr")
            tbody.appendChild(row2)
 
            createCell(item.who2, row2, "td")
            createCell(item.shift2, row2, "td")
        }
    }
}

/**
 * Űrlap létrehozása
 * @param {FormField[]} fields Űrlap mezői
 * @returns {HTMLFormElement} A létrehozott form
 */
function createForm(fields){
    const form = document.createElement("form")
    for(const field of fields){
        createField(field, form)
    }
 
    const button = document.createElement("button")
    button.type = "submit"
    button.innerText = "Hozzáadás"
    form.appendChild(button)
 
    return form
}

/**
 * Egy mező létrehozása a formon belül
 * @param {FormField} field A mező adatai
 * @param {HTMLFormElement} form A form amihez csatoljuk
 * @returns {void}
 */
function createField(field, form){
    const div = document.createElement("div")
    form.appendChild(div)
 
    if(field.type === "checkbox"){
        const input = document.createElement("input")
        input.type = "checkbox"
        input.id = field.id
        input.name = field.name
        div.appendChild(input)
 
        const label = document.createElement("label")
        label.innerText = field.label
        label.htmlFor = field.id
        div.appendChild(label)
    } else {
        const label = document.createElement("label")
        label.innerText = field.label
        label.htmlFor = field.id
        div.appendChild(label)
        div.appendChild(document.createElement("br"))
 
        if(field.type === "select"){
            const select = document.createElement("select")
            select.id = field.id
            div.appendChild(select)
 
            const defaultOption = document.createElement("option")
            defaultOption.innerText = "Válassz műszakot!"
            defaultOption.value = ""
            select.appendChild(defaultOption)
 
            for(const opt of field.optionList){
                const option = document.createElement("option")
                option.value = opt.value
                option.innerText = opt.label
                select.appendChild(option)
            }
        } else {
            const input = document.createElement("input")
            input.id = field.id
            input.name = field.name
            div.appendChild(input)
        }
    }
 
    const span = document.createElement("span")
    span.classList.add("error")
    div.appendChild(span)
}

/**
 * Input mező validálása
 * @param {HTMLInputElement|HTMLSelectElement} input A mező
 * @returns {boolean} Igaz, ha kitöltött
 */
function validate(input){
    let valid = true
    if(input.value === ""){
        input.parentElement.querySelector(".error").innerText = "Kötelező elem!"
        valid = false
    }
    return valid
}

/**
 * Hibák törlése a formon belül
 * @param {HTMLFormElement} form A form
 * @returns {void}
 */
function clearErrors(form){
    const errors = form.querySelectorAll(".error")
    for(const err of errors){
        err.innerText = ""
    }
}