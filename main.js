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
        $('#overlay').append(`<div id="book_info"> READ ${nytBook.title} by ${nytBook.author} </div>`);
        console.log(nytBook);
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

// get location data using HTML5 Geolocation or ip (as backup)
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        // x.innerHTML = "Geolocation is not supported by this browser.";
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log(position);
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
}

getLocation();

// get public ip address
function getIP() {
    $.ajax({
        url: 'https://api.ipify.org?format=json'
    }).done(function(result) {
        var ipAddress = result;
        console.log(ipAddress);
    }).fail(function(err) {
        throw err;
    });
}

// function getIP() {
//     $.ajax({
//         method: 'GET',
//         url: 'https://api.ipify.org?format=json',
//         success: function(result) {
//             console.log(result)
//         },
//         error: function(err) {
//         }
//     };
// }

getIP();


// var url = "https://www.goodreads.com/search.xml?key=l6bXCG59xiBNE5xRmtIhzA&q=Ender%27s+Game"
//
// // api request to goodreads gets xml response
// function getData(parxml) {
//     var tmp = null;
//     $.get("https://query.yahooapis.com/v1/public/yql",
//         {
//             q: "select * from xml where url=\""+url+"\"",
//             format: "xml"
//         },
//         function(xml){
//             // contains XML with the following structure:
//             // <query>
//             //   <results>
//             //     <GoodreadsResponse>
//             //        ...
//             parxml(xml, bookArr);
//         }
//     );
// }
// 
// 
// var bookArr = [];
// // parse goodreads xml response
// function parxml(xml, arr) {
//     var $xml = $(xml);
//     var $book = $xml.find("best_book");
//     var bookArr; 
//     $book.each(function() {
//        var title = $(this).find('title').text(),
//        author = $(this).find('author').text();
//  
//        //console.log(`${title} by ${author}`);
//        arr.push({title: title, author: author});
//     });
// }
// 
// getData(parxml);
// console.log(bookArr);
