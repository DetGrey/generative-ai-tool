const HUGGINGFACE_TOKEN = "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";

// ---------------------------------------------------------------------------------------- GENERATE QUERY
function generateQuery(filtersObject) {
    const length = document.querySelector('#length');
    let query = `Create a list of ${length.value} gift options `;
    for (const filterKey in filtersObject) {
        if (filterKey.length > 0) {
            query += filtersObject[filterKey];
        }
    }
    query += ' Only find modern suggestions and please be creative. Please DO NOT mention the same thing twice nor mention very similar options. DO NOT mention: cuff links, cufflinks, tie clip, golf club, luggage.'
    return query;
}

// ---------------------------------------------------------------------------------------- FETCH SELECTED FILTERS
function fetchFilters() {
    const gender = document.querySelector('#gender');
    const age = document.querySelector('#age');
    const relationship = document.querySelector('#relationship');
    const suggestions = document.querySelector('#user-suggestions');
    const selectOptions = document.querySelectorAll('input[name="extra-options"]:checked');

    let options = [];
    if (selectOptions.length !== 0) {
        selectOptions.forEach(option => {
            options.push(option.value);
        })
    }
    else {
        options = '';
    }

    return {
        gender: gender.value !== 'undefined' ? 'for someone who is ' + gender.value + '. ' : '',
        age: age.value.length > 0 ? 'Their age is ' + age.value + '. ' : '',
        options: options.length > 0 ? 'The gift suggestions should be in one of the following categories: ' + options + '. ' : '',
        relationship: relationship.value !== 'undefined' ? 'The relation to you is: ' + relationship.value + '. ' : '',
        suggestions: suggestions.value.length > 0 ? 'Suggestion categories could be ' + suggestions.value + '. ' : '',
    }
}

// ---------------------------------------------------------------------------------------- GET GENERATED TEXT
async function getGeneratedText(query) {
    // We can call this function 8 times before we respond
    let counter = 0;
    let prevGeneratedText = "";
    let generatedText = await fetchText(query);
    while (generatedText !== prevGeneratedText && counter < 8) {
        prevGeneratedText = generatedText;
        generatedText = await fetchText(generatedText);
        counter++;
    }

    return generatedText;
}
// ---------------------------------------------------------------------------------------- FETCH TEXT
function fetchText(query) {
    return fetch(
        "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
        {
            headers: {
                Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({"inputs": query}),
        }
    )
        .then(response => response.json())
        .then(data => {
            return data[0].generated_text;
        })
}

// ---------------------------------------------------------------------------------------- STYLE AND RENDER GENERATED TEXT
function styleAndRenderGeneratedText(text) {
    const items = text.split('\n').slice(1);
    for (let item of items) {
        const a = document.createElement('a');
        a.classList.add('gift-options');
        a.href = `https://www.google.com/search?q=${item.split('. ')[1]}`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer'; // https://stackoverflow.com/questions/17711146/how-to-open-link-in-a-new-tab-in-html
        a.innerText = item.toString();
        giftOptions.appendChild(a);

        const hr = document.createElement('hr');
        giftOptions.appendChild(hr);
    }
}