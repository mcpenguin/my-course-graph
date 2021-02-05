// imported PapaParse in index.html

// "data" is an array of arrays containing the header / class data

// parseCsvData(data): parses csv data into json object
function parseCsvData(data) {
    let parsedData = {};
    for (var i = 1; i < data.length; i++) {
        let cc = data[i][0];                                        // courseCode
        let cn = data[i][1];                                        // courseName
        let cd = data[i][2];                                        // courseDesc
        let cp = (cc === "HS") ? [] : data[i][3].split(", ");       // coursePrereq
        let cl = data[i][4]                                         // courseLevel
        parsedData[cc] = {
            courseCode: cc,
            courseName: cn,
            courseDescription: cd,
            coursePrereq: cp,
            courseLevel: cl,
        }
    }
    console.log(parsedData);
    return parsedData;
}

export { parseCsvData };