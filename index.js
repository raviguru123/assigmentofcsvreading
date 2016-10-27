var fs=require('fs'),
rootPath=__dirname+"/files",
parse=require("csv-parse"),
https=require("https"),
//url="https://s3.amazonaws.com/ed-college-choice-public/Most+Recent+Cohorts+(Scorecard+Elements).csv",
url=process.argv.slice(2)[0],
property=[],
csvjson=[];
//console.log("url=",url);

function init(url){
	require('node.io').scrape(function() {
		this.get(url, function(err, data) {
			var lines = data.split('\n');
			for (var line, i = 0, l = lines.length; i < l; i++) {
				line = this.parseValues(lines[i]);
				propertyArray(line,i);
			}
			print();
		});
	});
}

init(url)

function propertyArray(array,count){
	if(count==0){
		property=JSON.parse(JSON.stringify(array));
	}
	else{
		var obj=new Object();
		property.forEach(function(key,index){
			obj[key]=array[index];

		});
		csvjson.push(obj);
	}
}



function print(){
	csvjson.forEach(function(obj){
		console.log(obj);
	})
	//console.log("csv data",csvjson[0]);
}