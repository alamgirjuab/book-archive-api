/*-----------------------------------------------
 | Delay loding notification show/hide function |
 ----------------------------------------------*/
const displayLoding = lodingData => {
    document.getElementById('loding').style.display = lodingData;
}

/*------------------------------------------------------
 | Total search result notification show/hide function |
 -----------------------------------------------------*/
const totalSearchFound = search => {
    document.getElementById('total-result-found').style.display = search;
}

/*------------------------------------------------------
 | Total search result notification show/hide function |
 -----------------------------------------------------*/
const searchEmpty = empty => {
    document.getElementById('empty').style.display = empty;
}

const loadData = () => {
    const searchText = document.getElementById('search-input');
    const search = searchText.value;
    searchText.value = '';

    /*---------------------
     | Check empty string |
     --------------------*/
    if (search === '') {
        totalSearchFound('none');
        searchEmpty('block');
    }
    else {
        searchEmpty('none');
        displayLoding('block');
        totalSearchFound('none');
        /*---------------
         | fetching url |
         --------------*/
        const url = `http://openlibrary.org/search.json?q=${search}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data));
    }

}

/*---------------------------------------
 | Display search result in the website |
 --------------------------------------*/
const displayData = (books) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    /*-------------------------------------------
     | Showing only 20 results by slice funcion |
     ------------------------------------------*/
    const show20 = books.docs.slice(0, 20);
    if (!show20) {
        alert('worng input')
    }
    show20?.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book title: ${book.title}</h5>
                    <h5 class="card-title">Book authors: ${book.author_name}</h5>
                    <h5 class="card-title">First Publish Year: ${book.first_publish_year}</h5>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    })

    /*-----------------------------------------
     | Total numbers of search result display |
     ----------------------------------------*/
    displayLoding('none');
    totalSearchFound('block');
    const totalSearchNumber = document.getElementById('total-search-number');
    totalSearchNumber.innerText = books.numFound;
}

/*------------------------------------
 | Search button click event handler |
 -----------------------------------*/
document.getElementById('button').addEventListener('click', function () {
    loadData();
})