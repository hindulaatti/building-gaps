// Migration code for making table data from liquipedia better
// I don't know if this works anymore i made changes after I used this


var units = []
var buildings = []

for(i=0; i<liquipediadata.length; i++){
    for(j=0; j<liquipediadata[i].length; j++){
        if(liquipediadata[i][j].hasOwnProperty("Ground Unit")){
            let unit = liquipediadata[i][j]
            let newunit = {}
            
            newunit.name = unit["Ground Unit"]

            let size = unit["Size"].split("x")

            newunit.x = size[0]
            newunit.y = size[1]
            
            units.push(newunit)

        } else if(liquipediadata[i][j].hasOwnProperty("Building")) {

            let building = liquipediadata[i][j]
            let newbuilding = {}
            
            newbuilding.name = building["Building"]

            newbuilding.top = building["top"]
            newbuilding.right = building["->"]
            newbuilding.left = building["<-"]
            newbuilding.bot = building["bot"]

            buildings.push(newbuilding)
        } else if (liquipediadata[i][j].hasOwnProperty("Add-on")){
            let building = liquipediadata[i][j]
            let newbuilding = {}
            
            newbuilding.name = building["Add-on"]

            newbuilding.top = building["top"]
            newbuilding.right = building["->"]
            newbuilding.left = building["<-"]
            newbuilding.bot = building["bot"]

            buildings.push(newbuilding)
        }
    }
}

var sizes = {units: units, buildings: buildings}

// to get rid of colon (or others) in the list
for (var asd of Object.keys(sizes)) {
    for (var key of Object.keys(p[asd])) {
        for (var sdf of Object.keys(p[asd][key])) {
            sizes[asd][key][sdf] = p[asd][key][sdf].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        }
    }
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
download(JSON.stringify(sizes), 'json.txt', 'text/plain');