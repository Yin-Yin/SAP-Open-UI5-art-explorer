/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});*/

/*
* steps:
* - loop over all the painting styles
* - if the style has featured images, do this for the featured images
* - while number of paintings in paintings array < number of paintings of all
* - save the information an a file
* */
const request = require('request');
const writeFile = require('write'); // https://www.npmjs.com/package/write
const paintingsModel = require('./paintingsModel.json');
const paintingsModelCrawled = require('./paintingsModelCrawled.json');
console.log("Hi");
const paintingsDataOutput = {};
// console.log("paintingsModel", paintingsModel);

var AllPaintingsCount = 0;
console.log("AllPaintingsCount", AllPaintingsCount);


getAllPaintingsOfStyle("byzantine")
    .then(
    writeFileToHardDisk('newPaintings.json', JSON.stringify(paintingsDataOutput))
)
/*
for (let i = 0; i < paintingsModel.paintingStyles.length; i++) {
    let paintingStyle = paintingsModel.paintingStyles[i];
    if (paintingStyle.divider) {
        console.log("divider");
    } else {
        console.log("paintingStyle.name:", paintingStyle.name);
        getAllPaintingsOfStyle(paintingStyle.name);
    }
}
*/

function getAllPaintingsOfStyle(style) {
    console.log("style", style);
    var paintingStyleModel = this.paintingsDataOutput[style] =  {paintings: []};
    // paintingStyleModel =  paintingsModelCrawled["byzantine"]; // the name of the style should be the property of all the img data, how to achieve this
    // paintingStyleModel = {paintings: []};
    console.log("paintingStyleModel",paintingStyleModel);
    console.log("paintingStyleModel.paintings",paintingStyleModel.paintings);
    console.log("paintingStyleModel.paintings",paintingStyleModel.paintings.length);
    // paintingsModelCrawled["byzantine"].paintings = [];
    console.log("paintingsModelCrawled", paintingsModelCrawled);
    let PageNumber = 1;
    getPaintingDataForStyle(style, false, PageNumber);
    console.log("paintingStyleModel.paintings.length",paintingStyleModel.paintings.length);
    // await
    // https://stackoverflow.com/questions/39110762/while-loops-using-await-async
    // increase page size every time we get the data back
    while (paintingStyleModel.paintings.length < this.AllPaintingsCount) {
        getPaintingDataForStyle(style, false, PageNumber);
        PageNumber += 1;
    }
}

function getPaintingDataForStyle(paintingStyle, featured, pageNUmber) {
    return new Promise(function (resolve, reject) {
        let featuredString = "";
        if (featured) {
            featuredString = "select=featured&";
        }
        console.log("AllPaintingsCount", this.AllPaintingsCount);
        let pageString = '';
        if (pageNUmber) {
            let pageString = "&page=" + pageNUmber;
        }
        let url = "https://cors.io/?https://www.wikiart.org/en/paintings-by-style/" + paintingStyle + "?" + featuredString + "json=2" + pageString; // use https://cors.io/ to circumvent No 'Access-Control-Allow-Origin' header is present on the requested resource problem

        requestData(url).then(resolve());
    })
}

function requestData(url) {
    return request.get(url, {json: true}, function (err, res, body) {
        if (!err && res.statusCode === 200) {


            funcTwo(body, function (err, output) {
                this.AllPaintingsCount = output.AllPaintingsCount;
                console.log("output.AllPaintingsCount", output.AllPaintingsCount);
                console.log("AllPaintingsCount", this.AllPaintingsCount);

                //console.log(err, output);
                //console.log("call successfull. Output: ", output);
                //this.paintingsModelCrawled = output;

                console.log("paintingStyleModel",paintingStyleModel);
                console.log("paintingStyleModel.paintings",paintingStyleModel.paintings);
                paintingStyleModel.paintings.push(output.Paintings);

                return output

            });
        }
    }).on('response', function (response) {
        doSomethingWithResponse(response);
        console.log(response.statusCode); // 200
        console.log(response.headers['content-type']) // 'image/png'
    });
}

function doSomethingWithResponse(response,) {
    console.log("doSomethingWithResponse", response.body);
}

function writeFileToHardDisk(fileName, fileContent) {
    writeFile(fileName, fileContent).then(function () {
        console.log("successfully written file")
    });

}

function funcTwo(input, callback) {
    // process input
    // console.log("func two input", input);
    callback(null, input);
}
