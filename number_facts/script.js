const factForm = document.getElementById("number-fact-form");
const addButton = document.getElementById("add");
const multiForm = document.getElementById("multiNumber");
const fourFactForm = document.getElementById("four-fact-form")

function showNumberFact(number) {
    const factSession = document.getElementById("fact-session");
    clearElement(factSession);
    factPromise = axios.get(`http://numbersapi.com/${number}?json`)
factPromise
        .then(response => addFactPara(response.data.text, factSession))
        .catch(error => addFactPara(error, factSession))
}

function addFactToDom(data) {
    const factSession = document.getElementById("fact-session");
    newPara = document.createElement("p");
    newPara.innerText = data
    factSession.appendChild(newPara)
}

function createAnotherInput() {
    const newP = document.createElement("p");
    const newLabel = document.createElement("label");
    newLabel.innerText = "Enter number:"
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("name", "numberArray");
    newInput.required = true;
    newP.appendChild(newLabel);
    newP.appendChild(newInput);
    const multiForm = document.getElementById("multiNumber")
    multiForm.insertBefore(newP, multiForm.firstChild)
}


factForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const number = document.getElementById("numberFact").value
    showNumberFact(number);
})

addButton.addEventListener("click", evt => {
    evt.preventDefault();
    createAnotherInput();
})

function showMultiFormFacts(response) {
    const factSession = document.getElementById("facts-session");
    clearElement(factSession)
    response.forEach(response => {
        addFactPara(response.data.text, factSession)
    });
}

function addFactPara(fact, outerElement) {
    const newP = document.createElement("p")
    newP.innerText = fact
    outerElement.appendChild(newP);
}

function clearElement(element){
    element.innerText = "";
}

multiForm.addEventListener("submit", event => {
    event.preventDefault()
    const inputs = document.getElementsByName("numberArray")
    factNoPromises = []
    for(let i=0; i<inputs.length; i++) {
        let input = inputs[i]
        factNoPromises.push(axios.get(`http://numbersapi.com/${input.value}?json`))
    }
    const fourfactSession = document.getElementById("facts-session");
    Promise.all(factNoPromises)
                            .then(response => showMultiFormFacts(response))
                            .catch(err => console.log(err))



})

fourFactForm.addEventListener("submit", event => {
    event.preventDefault();
    const fourfactSession = document.getElementById("fourfact-session");
    clearElement(fourfactSession);
    const number = document.getElementById("fournumberFact").value
    const promise = axios.get(`http://numbersapi.com/${number}?json`)
    promise
    .then(response => {
        addFactPara(response.data.text, fourfactSession);
        return axios.get(`http://numbersapi.com/${number}?json`)
    })
    .then(response => {
        addFactPara(response.data.text, fourfactSession);
        return axios.get(`http://numbersapi.com/${number}?json`)
    })
    .then(response => {
        addFactPara(response.data.text, fourfactSession);
        return axios.get(`http://numbersapi.com/${number}?json`)
    })
    .then(response => {
        addFactPara(response.data.text, fourfactSession);
        return axios.get(`http://numbersapi.com/${number}?json`)
    })
    .catch(error => console.log(error))

})

