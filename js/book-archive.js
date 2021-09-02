const displayLoding = lodingData => {
    document.getElementById('loding').style.display = lodingData;
    // displayLoding.style.display = 'block';
}

const totalSearchFound = search => {
    document.getElementById('total-result-found').style.display = search;
}

const searchEmpty = empty => {
    document.getElementById('empty').style.display = empty;
}

const loadData = () => {
    const searchText = document.getElementById('search-input');
    const search = searchText.value;
    // console.log(search);
    searchText.value = '';
    // Check empty string
    if (search === '') {
        searchEmpty('block');
    }
    else {
        //Show loding...
        searchEmpty('none');
        displayLoding('block');
        totalSearchFound('none');

        //fetching url
        const url = `http://openlibrary.org/search.json?q=${search}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data));
    }

}

const displayData = (books) => {
    // console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const show20 = books.docs.slice(0, 20);
    console.log(show20);
    if (!show20) {
        alert('worng input')
    }
    show20?.forEach(book => {
        // console.log(book.title);
        // console.log(book.author_name);
        // console.log(book.first_publish_year);
        // console.log(book.cover_i);
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
    // totalSearchFound('d-block');
    displayLoding('none');
    totalSearchFound('block');
    const totalSearchNumber = document.getElementById('total-search-number');
    totalSearchNumber.innerText = books.numFound;
}

document.getElementById('button').addEventListener('click', function () {
    loadData();
})











/*
    const totalSearchResult = document.getElementById('total-search-result');
    totalSearchResult.innerText = books.numFound;
    console.log('Total', books.numFound, 'data found.');
    const displayTotal = document.getElementById('total-result-found');
    if (displayTotal.style.display === 'd-none') {
        displayTotal.style.display = 'd-block';
    } else {
        displayTotal.style.display = 'd-none';
    }
    const t = document.createTextNode(`Total ${books.numFound} Books Found`);
    totalResultFound.style.display = 'block';
    totalResultFound.appendChild(t); */