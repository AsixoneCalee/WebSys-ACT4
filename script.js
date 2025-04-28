function searchContacts() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.getElementById('loading');

    resultsDiv.innerHTML = '';
    loadingDiv.classList.remove('d-none');

    fetch('https://asixonecalee.github.io/LibraryBookFinderWebSys/book.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadingDiv.classList.add('d-none');

            if (!searchTerm) {
                resultsDiv.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-info-circle"></i>
                        <h5>Please enter a book title to search</h5>
                    </div>
                `;
                return;
            }

            const books = Array.isArray(data) ? data : [data];

            const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(searchTerm)
            );

            displayResults(filteredBooks);
        })
        .catch(error => {
            loadingDiv.classList.add('d-none');
            resultsDiv.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-exclamation-triangle text-danger"></i>
                    <h5>Error loading books</h5>
                    <p class="text-muted">${error.message}</p>
                </div>
            `;
            console.error('Error fetching data:', error);
        });
}


function displayResults(books) {
    const resultsDiv = document.getElementById('results');

    if (books.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <i class="fas fa-book-dead"></i>
                <h5>No books found</h5>
                <p class="text-muted">Try a different search term</p>
            </div>
        `;
        return;
    }

    let html = `
        <table class="table table-hover">
            <thead class="table-primary">
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    books.forEach(book => {
        html += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>
                    ${book.available 
                        ? '<span class="text-success fw-bold">Available</span>' 
                        : '<span class="text-danger fw-bold">Checked Out</span>'
                    }
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    resultsDiv.innerHTML = html;
}

