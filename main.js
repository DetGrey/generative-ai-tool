/*
* Backend:
* ollama run mistral
* */
/*
const button = document.querySelector('button');
const input = document.querySelector('input');
const pTag = document.querySelector('p');
button.addEventListener("click", () => {
    fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "mistral",
            prompt: `The following is a list of dishes you can make with the following ingredients: ${input.value}`,
            stream: false
        })
    })
        .then(response => response.json())
        .then(data => {
            pTag.innerText = data.response;
            console.log(data.response);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});*/

const button = document.querySelector('button');
const input = document.querySelector('input');
const pTag = document.querySelector('p');
button.addEventListener("click", () => {

    getGeneratedText(generateQuery(fetchFilters()))
        .then(generatedText => {
            pTag.innerText = generatedText;
        });
});

function generateQuery(filtersObject) {
    let query = `Create a list of 10 gift options for `;
    for (const filterKey in filtersObject) {
        if (filterKey.length > 0) {
            query += filtersObject[filterKey];
        }
    }
    console.log(query)
    return query;
}

function fetchFilters() {
    const gender = document.querySelector('input[name="gender"]:checked');

    const age = document.querySelector('#age');

    let options = [];
    const selectOptions = document.querySelectorAll('input[name="extra-options"]:checked');
    if (selectOptions.length !== 0) {
        selectOptions.forEach(option => {
            options.push(option.value);
        })
    }
    else {
        options = '';
    }

    const relationship = document.querySelector('#relationship');

    const suggestions = document.querySelector('#user-suggestions');

    return {
        gender: gender.value !== 'undefined' ? 'someone who is male' + gender.value + '. ' : '',
        age: age.value.length > 0 ? 'Their age is ' + age.value + '. ' : '',
        options: options.length > 0 ? 'The gift suggestions should be in one of the following categories: ' + options + '. ' : '',
        relationship: relationship.value !== 'undefined' ? 'The relation to you is: ' + relationship.value + '. ' : '',
        suggestions: suggestions.value.length > 0 ? 'Suggestion categories could be ' + suggestions.value + '. ' : '',
    }
}

