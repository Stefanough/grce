console.log("hi there");

var allContent = $('body');

// Its 30 degrees outside, hide under a tree and read a book. 
// message based on location and weather.

// get NYT bestseller data.
var url = "https://api.nytimes.com/svc/books/v3/lists.json";
url += '?' + $.param({
  'api-key': "3dccc0f97d5c415d99abbbcdc19838bc",
  'list': "combined-print-and-e-book-fiction",
  'rank': 1
});

function getBook(callBack) {
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
        var nytBook = callBack(result)
        $('#overlay').append(`<div id="book_info">Hi you are in  READ ${nytBook.title} by ${nytBook.author} </div>`);
        console.log('NYTbook', nytBook);
    }).fail(function(err) {
        throw err;
    });
}
function parseBook(book) {
    var nytBook = {};
    nytBook.title = book.results[0].book_details[0].title;
    nytBook.author = book.results[0].book_details[0].author;
    return nytBook;
}
getBook(parseBook);

allContent.prepend( '<div id="overlay"></div>' );

// get public ip address
function getIP() {
    $.ajax({
        url: 'https://api.ipify.org?format=json'
    }).done(function(result) {
        console.log('getIP:', result);
        getGeo(result.ip);
    }).fail(function(err) {
        throw err;
    });
}
getIP();

// get location data using HTML5 Geolocation
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else { 
//         // x.innerHTML = "Geolocation is not supported by this browser.";
//         console.log("Geolocation is not supported by this browser.");
//     }
// }
// 
// function showPosition(position) {
//     console.log(position);
//     // x.innerHTML = "Latitude: " + position.coords.latitude + 
//     // "<br>Longitude: " + position.coords.longitude;
// }
// getLocation();

// get location based on ip address
function getGeo(ip) {
    $.ajax({
        method: 'GET',
        url: 'https://ipapi.co/' + ip + '/json/',
        success: function(geo) {
            console.log('geo', geo);
            return geo
        },
        error: function(err) {
        }
    });
}


// get weather data
function getWeather(ip) {
    $.ajax({
        method: 'GET',
        url: 'api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b45681db9de694684410db4541ff8d79',
        success: function(weather) {
            console.log('weather');
        },
        error: function(err) {
        }
    });
}

getWeather();



