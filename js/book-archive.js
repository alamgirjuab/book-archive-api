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

/*-----------------------------------------------
 | Empty search notification show/hide function |
 ----------------------------------------------*/
const searchEmpty = empty => {
    document.getElementById('empty').style.display = empty;
}

/*------------------------------------------------
 | No Data Found notification show/hide function |
 -----------------------------------------------*/
const noDataFound = noData => {
    document.getElementById('no-result-found').style.display = noData;
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
        noDataFound('none');
        searchEmpty('block');
    }
    else {
        searchEmpty('none');
        totalSearchFound('none');
        noDataFound('none');
        displayLoding('block');
        /*---------------
         | fetching url |
         --------------*/
        const url = `https://openlibrary.org/search.json?q=${search}`
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
                    <p class="card-title"><span class="fw-bold">Book title:</span> ${book.title}</p>
                    <p class="card-title"><span class="fw-bold">Book authors:</span> ${book.author_name}</p>
                    <p class="card-title"><span class="fw-bold">Publisher:</span> ${book.publisher}</p>
                    <p class="card-title"><span class="fw-bold">First Publish Year:</span> ${book.first_publish_year}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    })

    /*-----------------------------------------
     | Total numbers of search result display |
     ----------------------------------------*/
    displayLoding('none');
    if (books.numFound === 0) {
        noDataFound('block');
    }
    else {
        const totalSearchNumber = document.getElementById('total-search-number');
        totalSearchNumber.innerText = books.numFound;
        totalSearchFound('block');
    }

}

/*------------------------------------
 | Search button click event handler |
 -----------------------------------*/
document.getElementById('button').addEventListener('click', function () {
    loadData();
})