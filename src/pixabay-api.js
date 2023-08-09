import axios from "axios";

const API_KEY = '38593639-9abd168d1ca629b7057566479';
const BASE_URL = "https://pixabay.com";

export const getCollection = async (userSearch, page) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/`, {
            params: {
                key: `${API_KEY}`,
                q: `${userSearch}`,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 40,
                page: `${page}`                  
            }         
        })
                        
        const fullData = response.data;
        
        return fullData;   
    }
    catch (error) {
        alert("error");
    }    
};

