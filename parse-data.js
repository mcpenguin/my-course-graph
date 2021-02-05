import { parseCsvData } from "./parseCsvData.js";

// stringParse(string): takes in a single "line" string, parses it; 
// ie includes \n characters every ~50 characters for brevity 
function stringParse(string) {
    let remainder = string;
    let result = "";
    let count = 0; // count: number of chars on the line

    while (true) {
        if (remainder === "") return result;

        if (count > 50 && remainder.charAt(0) === " ") {
            result += "\n";
            remainder = remainder.substr(1);
            count = 0;
        }

        result += remainder.charAt(0);
        remainder = remainder.substr(1);
        count++;
    }
}

// generateCourseData: takes in parameters, generates node for course
// that can be used in make-graph.js
function generateCourseNode(courseCode, courseName, courseDesc, courseLevel) {
    const courseDescription = courseCode + " (" + courseName + ")\n"
        + "--------------------------------" + "\n"
        + stringParse(courseDesc);
    var courseNode = {
        id: courseCode,
        label: courseCode,
        title: courseDescription,
        shape: 'diamond',
        size: 20,
        color: '#abd9b7',
        level: courseLevel,
        nodes: {
            font: {
                multi: 'html',
            },
        }
    }

    let updateCourseNode = function (courseNode, properties) {
        return { ...courseNode, ...properties };
    }

    let courseSubject = courseCode.split(" ")[0];
    let colorShapeProperties = {};
    // console.log(courseSubject);
    if (courseSubject === "MATH") {
        colorShapeProperties = {
            color: 'green',
            shape: 'diamond',
            size: 15,
        };
    }
    else if (courseSubject === "STAT") {
        colorShapeProperties = {
            color: '#d5db16',
            shape: 'hexagon',
            size: 15,
        }
    }
    else if (courseSubject === "CS") {
        colorShapeProperties = {
            color: 'orange',
            shape: 'star',
            size: 15,
        };
    }
    else if (courseSubject === "HS") {
        colorShapeProperties = {
            color: 'blue',
            shape: 'dot',
            size: 8,
            fixed: true,
        }
    }
    else if (courseSubject === "SPCOM" || courseSubject === "ENGL") {
        colorShapeProperties = {
            color: 'purple',
            shape: 'triangle',
            size: 12,
        }
    }
    else {
        colorShapeProperties = {
            color: 'red',
            shape: 'square',
            size: 12,
        };
    }

    courseNode = updateCourseNode(courseNode, colorShapeProperties);

    return courseNode;
}

// generateCourseEdge: generates course edge from every
// element of courseCodePrereq to courseCode
function generateCourseEdge(courseCode, courseCodePrereq) {
    const courseEdge = {
        id: courseCodePrereq + " -> " + courseCode,
        title: courseCodePrereq + " -> " + courseCode,
        from: courseCodePrereq,
        to: courseCode,
        arrows: 'to',
        color: '#bdbdbd',
    }
    return courseEdge;
}

// parseClassData: returns parsed class data (for nodes)
function parseClassData(classData) {
    var c; 
    var parsedClassData = []; // for node data

    for (c in classData) {
        let course = classData[c];
        // console.log(course.courseCode);
        parsedClassData.push(generateCourseNode(
            course.courseCode,
            course.courseName,
            course.courseDescription,
            course.courseLevel,
        ));
    }
    return parsedClassData;
}

// parseClassPrereqData: returns parsed class prereq data (for edges)
function parseClassPrereqData(classData) {
    var c;
    var parsedClassPrereqData = []; // for edge data

    for (c in classData) {
        let course = classData[c];
        for (var i = 0; i < course.coursePrereq.length; i++) {
            parsedClassPrereqData.push(generateCourseEdge(
                course.courseCode,
                course.coursePrereq[i],
            ))
        }
    }
    return parsedClassPrereqData;
}

// exports parse class data functions
export { parseClassData, parseClassPrereqData };