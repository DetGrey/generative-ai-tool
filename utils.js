const HUGGINGFACE_TOKEN = "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";

async function getGeneratedText(query) {
    // We can call this function 8 times before we respond
    let counter = 0;
    let prevGeneratedText = "";
    let generatedText = await fetchText(query);
    while (generatedText !== prevGeneratedText && counter < 8) {
        prevGeneratedText = generatedText;
        generatedText = await fetchText(generatedText);
        console.log(generatedText)
        counter++;
    }
    return generatedText;
}

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