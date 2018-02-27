var allContent = $('body');
var locationArr = [];

var pageURL = window.location.href; 
allContent.prepend( '<div id="overlay"></div>' );
var overlay = $('#overlay');

// Its 30 degrees outside, hide under a tree and read a book. 

// get weather data
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

// get aprox location based on ip address
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
            $('#overlay').append(`<div id="location" class="over-text">beautiful ${loc.city}, ${loc.region_code}.</div>`);
            getWeather(function(data) {
                $('#overlay').prepend(`<div id="weather" class="over-text">Hey! It's ${data.main.temp} degrees in</div>`);
                getBook(parseBook);
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
  'list': "combined-print-and-e-book-fiction"
});
var rndBook = getRndInteger(0, 14);

function getBook(bookCB) {
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
        var nytBook = bookCB(result)
        $('#overlay').append(`<div id="book_info" class="over-text">Why don't you stop browsing ${extractRootDomain(pageURL)} and read ${toTitleCase(nytBook.title)} by ${nytBook.author}, it's number ${rndBook +1} on the New York Times Bestseller list. Just a thought.</div>`);

        console.log('NYTbook', nytBook);
    }).fail(function(err) {
        throw err;
    });
}
function parseBook(book) {
    var nytBook = {};
    nytBook.title = book.results[rndBook].book_details[0].title;
    nytBook.author = book.results[rndBook].book_details[0].author;
    return nytBook;
}

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

// helper functions
function extractHostname(url) {
    var hostname;
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;
    if (arrLen > 1) {
        domain = splitArr[arrLen - 2];
    }
    return domain;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


