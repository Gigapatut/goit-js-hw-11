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
        
    getCollection(userSearch, page)

    .then(fullData => {
        event.preventDefault();

        const totalHits = fullData.totalHits;
        console.log(totalHits)

        alert(`Hooray! We found ${totalHits} images.`)
                
        if (fullData.total === 0) {
            alert("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        
        const collection = fullData.hits;

        let total = fullData.totalHits;
                    
        let limit = fullData.hits.length;

        let totalPage = total / limit;
        
        loadMoreBtn.classList.remove("loading");   
                
        if (totalPage === Infinity) {
             loadMoreBtn.classList.add("loading");
            alert("We're sorry, but you've reached the end of search results.");
            
        }        
        
        markup(collection);
        page += 1;         
    })
    .catch(error => {
        alert("error");
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
    
    const markup = collection.map((element) => 
                 
    
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
    ).join("");       

gallery.insertAdjacentHTML("beforeend", markup);
};

// -------------ЗАВАНТАЖИТИ ЩЕ--------------------

loadMoreBtn.addEventListener('click', handleSearch);


