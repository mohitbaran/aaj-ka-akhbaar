export const categories = [
    {
      code: "",
      pic: "https://cdn.pixabay.com/photo/2018/10/26/09/24/news-3774160_1280.png",
      name: "general",
    },
    {
      code: "",
      pic: "https://img.icons8.com/fluent/96/000000/hard-working.png",
      name: "business",
    },
    {
      code: "",
      pic: "https://iconarchive.com/download/i99782/designbolts/free-multimedia/Film.ico",
      name: "entertainment",
    },
    {
      pic: "https://img.icons8.com/fluent/96/000000/stethoscope.png",
      name: "health",
    },
    {
      pic: "https://img.icons8.com/fluent/96/000000/microscope.png",
      name: "science",
    },
    {
      pic: "https://img.icons8.com/fluent/96/000000/trophy.png",
      name: "sports",
    },
    {
      pic: "https://img.icons8.com/fluent/96/000000/artificial-intelligence.png",
      name: "technology",
    },
  ];
  
  export const country = [
    {
      code: "in",
      name: "India",
    },
    {
      code: "us",
      name: "USA",
    },
    {
      code: "au",
      name: "Australia",
    },
    {
      code: "ru",
      name: "Russia",
    },
    {
      code: "fr",
      name: "France",
    },
    {
      code: "gb",
      name: "United Kingdom",
    },
  ];
  
  export const sources = [
    {
      id: "bbc-news",
      name: "BBC News",
      pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png",
    },
    {
      id: "cnn",
      name: "CNN",
      pic: "https://bankimooncentre.org/wp-content/uploads/2020/06/cnn-logo-square.png",
    },
    {
      id: "fox-news",
      name: "Fox News",
      pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/768px-Fox_News_Channel_logo.svg.png",
    },
    {
      id: "google-news",
      name: "Google News",
      pic: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_News_icon.png",
    },
  ];
                                                                                                                                                                                                                                                                   
  // export const BASE_URL = "https://newsapi.org/v2/";
  
  // export const getNewsAPI = (category, country = "in") => {
  //   const CATEGORIES = ["business", "entertainment", "general", "health", "science", "sports", "technology"]
  //   const COUNTRIES_LANGUAGES = {"in": "en", "us": "en", "au": "en", "ru": "ru", "fr": "fr", "gb": "en"}
  //   return `${BASE_URL}/top-headlines?q=${CATEGORIES[0]}/&country=${COUNTRIES_LANGUAGES[0]}&apiKey=e6c17087c4f2464d985a0e054bdc7a0a`;
  // };


export const BASE_URL = "https://saurav.tech/NewsAPI/";

export const getNewsAPI = (category, country = "in") => {
  return `${BASE_URL}/top-headlines/category/${category}/${country}.json`;
};
  
  export const getSourceAPI = (source) => {
    return `${BASE_URL}/everything/${source}.json`;
  };