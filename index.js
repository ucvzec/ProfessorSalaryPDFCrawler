const crawler = require('crawler-request');

const rl = require("readline");
const cli = rl.createInterface({
	input:process.stdin,
	output:process.stdout,
});


const testPdfUrl = "https://www.k-state.edu/pa/faculty/salary/salfringe/table2.pdf";
const faculitySalaryPdfUrl = "https://nebraska.edu/docs/budget/2018_2019_budget_by_dept_vol_1.pdf";

console.log("Starting crawler");

console.time("Crawler Parse Time");

let data;
crawler(faculitySalaryPdfUrl).then((response)=>{
	console.log("Finished Crawling, now processing.");
	data = response.text.split("\n");
	data=data.filter((line)=>{
		return /^[A-Z]{1}[a-z]+, [A-Z]{1}[a-z]+/.test(line);
	});
	data=data.map((prof)=>{
		return [prof.split(" ").slice(0,2).join(" ")].concat(prof.split(" ").pop());
	});
	/*
	for(let x=0;x!=2000&&x<data.length;++x){
		console.log(data[x]);
	}
	*/
	//Lowe, Joshua M0001214409516702 1.000 59,623
	console.log(`There are ${data.length} lines of data.`);
	console.timeEnd("Crawler Parse Time");
});

function filterArrayForProf(profArray,filterString){
	return profArray.filter((prof)=>{
		return String(prof).toLowerCase().includes(filterString.trim().toLowerCase());
	});
}
cli.on('line',(input)=>{
	let returnResults = filterArrayForProf(data,input);//.filter((rr)=>{
	//	return rr.split(" ").length>2;
	//});
	/*
	returnResults.forEach((prof)=>{
		console.log(prof);
	});
	*/
	/*
	returnResults=returnResults.reduce((accumulation,value)=>{
		let searchResult = accumulation.find((dataEntry)=>{
			return dataEntry.toLowerCase().includes(value[0].split(" ")[0].toLowerCase());
		});
		if(typeof searchResult !=='undefined'){
			accumulation[accumulation.indexOf(searchResult)][1] += Number(value[1]);
		}else{
			accumulation.push(value);
		}
		return accumulation;
	});
	*/
	returnResults.forEach((prof)=>{
		console.log(prof);
	});
});