/*
make-graph.js: initialises graph for website
*/

import { parseClassData, parseClassPrereqData } from './parse-data.js';
import { parseCsvData } from './parseCsvData.js';

// initialiseNetwork: void function that initialises network
// based off of class data
function initialiseNetwork(classData) {
    // create nodes
    var nodeList = parseClassData(classData);
    console.log(nodeList);
    var nodes = new vis.DataSet(nodeList);

    // create edges
    var edgeList = parseClassPrereqData(classData);
    console.log(edgeList);
    var edges = new vis.DataSet(edgeList);

    // create the network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges,
    };

    // provide options (characteristics) of canvas
    var options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'LR',
                nodeSpacing: 350,
                levelSeparation: 350,
            }
        },
        nodes: {
            font: {
                multi: 'html',
            },
        }
    }


    // initialise network
    var network = new vis.Network(container, data, options);
}


Papa.parse("class-data.csv", {
    comments: "//",
    delimiter: ";; ",
    download: true,
    complete: function (results) {
        initialiseNetwork(parseCsvData(results.data));
    }
});