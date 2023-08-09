import { getCollection } from './pixabay-api.js';
import './loading.css';

const gallery = document.querySelector('.gallery');

const searchForm = document.querySelector(".search-form");// форма

const searchQuery = document.querySelector("input")

const loadMoreBtn = document.querySelector(".load-more");

loadMoreBtn.classList.add("loading");

let page = 1;

const handleSearch = (event) => {
    
    event.preventDefault();
    
    let userSearch = searchQuery.value.trim();
       
    if (!userSearch) {
        return ;
    } 
        
    getCollection(userSearch, page).then(fullData => {
        event.preventDefault();
        console.log("2222")
        console.log(fullData)
        console.log(fullData.total)
        
        if (fullData.total === 0) {
            alert("Sorry, there are no images matching your search query. Please try again.");
            return;
        }

        
        const collection = fullData.hits;

        let total = fullData.totalHits;
                    
        let limit = fullData.hits.length;

        let totalPage = total / limit;
        console.log("11111111111111")
        console.log (totalPage)

        loadMoreBtn.classList.remove("loading");   
                
        if (totalPage === Infinity) {
             loadMoreBtn.classList.add("loading");
            alert("We're sorry, but you've reached the end of search results.");
            
        }        
        
        markup(collection);
        page += 1;
          
        
        
    });
    
};

searchForm.addEventListener('submit', cleaningMarkup);
searchForm.addEventListener('submit', handleSearch);

function cleaningMarkup() {
    loadMoreBtn.classList.add("loading");
    return gallery.innerHTML = "";   
}

// --------------РОЗМІТКА--------------------------

const markup = (collection) => {  
    
    const markup = collection.map((element) => {
                 
    return (
        `<div class="photo-card">
            <img src="${element.webformatURL}" alt="${element.tags}" width="360" height="300" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes ${element.likes}</b>
                </p>
                <p class="info-item">
                    <b>Views ${element.views}</b>
                </p>
                <p class="info-item">
                    <b>Comments ${element.comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads ${element.downloads}</b>
                </p>
            </div>
        </div>`
    )     
})
gallery.insertAdjacentHTML("beforeend", markup);
};

// -------------ЗАВАНТАЖИТИ ЩЕ--------------------

function loadMore(event) {
    handleSearch(event);
}
loadMoreBtn.addEventListener('click', loadMore);


