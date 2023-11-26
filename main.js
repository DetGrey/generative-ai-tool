// ---------------------------------------------------------------------------------------- TOGGLE FILTERS
const searchToolbar = document.querySelector('#search-toolbar');
const filtersButton = document.querySelector('#toggle-filters-button');
filtersButton.addEventListener('click', () => {
    searchToolbar.firstElementChild.classList.toggle('hidden');
})

// ---------------------------------------------------------------------------------------- TOGGLE LOADING
const loading = document.querySelector('#loading');
const description = document.querySelector('#description')
function toggleHidden() {
    loading.classList.toggle('hidden');
}

// ---------------------------------------------------------------------------------------- SEARCH
const button = document.querySelector('#search');
const giftOptions = document.querySelector('#gift-options');
button.addEventListener("click", () => {
    description.classList.add('hidden');
    giftOptions.innerText = '';
    toggleHidden();
    searchToolbar.firstElementChild.classList.add('hidden');

    getGeneratedText(generateQuery(fetchFilters()))
        .then(generatedText => {
            description.classList.remove('hidden');
            toggleHidden();
            styleAndRenderGeneratedText(generatedText);
        });
});


