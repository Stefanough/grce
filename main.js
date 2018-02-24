console.log("hi there");

var allContent = $('body');
var overlayArr = [];
var locationArr = [];

// Its 30 degrees outside, hide under a tree and read a book. 
// message based on location and weather.

// get weather data
function getLat() {
    return locationArr[0];
}

function getWeather(callback) {
    $.ajax({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${locationArr[0]}&lon=${locationArr[1]}&units=imperial&appid=b45681db9de694684410db4541ff8d79`,
        success: function(weather) {
            callback(weather);
        },
        error: function(err) {
        }
    });
}

// get location based on ip address
function getGeo(ip, callback) {
    $.ajax({
        method: 'GET',
        url: 'https://ipapi.co/' + ip + '/json/',
        success: function(geo) {
            callback(geo);
        },
        error: function(err) {
        }
    });
}

function returnGeo() {
    getIP(function(data) {
        getGeo(data.ip, function(loc) {
        locationArr[0] = loc.latitude;
        locationArr[1] = loc.longitude;
        overlayArr[1] = `<div id="location">beautiful ${loc.city}, ${loc.region_code}</div>`;
        getWeather(function(data) {
            overlayArr[0] = `<div id="weather">Hey! It's ${data.main.temp} in</div>`;
            console.log('weather:', data);
        });
        console.log(loc);
        });
    });
}

returnGeo();

// get NYT bestseller data.
var url = "https://api.nytimes.com/svc/books/v3/lists.json";
url += '?' + $.param({
  'api-key': "3dccc0f97d5c415d99abbbcdc19838bc",
  'list': "combined-print-and-e-book-fiction",
  'rank': 1
});

function getBook(bookCB) {
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
        var nytBook = bookCB(result)
        overlayArr[2] = `<div id="book_info">read ${nytBook.title} by ${nytBook.author} </div>`;
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

// get public ip address
function getIP(callback) {
    $.ajax({
        method: 'GET',
        url: 'https://api.ipify.org?format=json',
        success: function(ip) {
            callback(ip);
        },
        error: function(err) {
        }
    });
}
getIP(function(data) {
    console.log('ipaddress:', data);
});


allContent.prepend( '<div id="overlay"></div>' );


// Build a string with data

console.log(overlayArr);
console.log(locationArr);
