console.log("in js file");

var productsRequest = new XMLHttpRequest();
productsRequest.addEventListener('load', productFxn);
productsRequest.addEventListener('error', errorFxn);
productsRequest.open('GET','products.json');
productsRequest.send();  // run the request

var categoriesRequest = new XMLHttpRequest();
categoriesRequest.addEventListener('load', categoriesFxn);
categoriesRequest.addEventListener('error', errorFxn);
categoriesRequest.open('GET','categories.json');
categoriesRequest.send();  // run the request



////////////////////
//  FUNCTIONS ()  //
////////////////////


function productFxn() {
	console.log("this", this.responseText);
	var data = JSON.parse(this.responseText);
	domString(data.products);
}

function categoriesFxn() {
	console.log("this", this.responseText);
	var data = JSON.parse(this.responseText);
	processCategories(data.categories);
}

function errorFxn() {
	console.log("Broken code!")
}

function writeToDom(node, divId) {
	document.getElementById(divId).appendChild(node);

}

function processCategories(arrayOfCategories) {
	var departmentsArray 	= [];
	var seasonsArray 		= [];
	var discountsArray 		= [];

	for (var i = 0; i < arrayOfCategories.length; i++) {
		departmentsArray[i] = arrayOfCategories[i].name;
		seasonsArray[i]		= arrayOfCategories[i].season_discount;
		discountsArray[i]	= arrayOfCategories[i].discount;
	}

	assignDepartments(departmentsArray);
	assignSeasons(seasonsArray);
	assignDiscounts(discountsArray);
}

function domString(arrayOfStuff) {
	for (var i = 0; i < arrayOfStuff.length; i++) {
		var sectionNode = '';
		var nameNode = '';
		var imgNode = '';

		sectionNode = document.createElement('section');
		sectionNode.setAttribute('class', 'item');

		nameNode = document.createElement('h2');
		nameNode.setAttribute('class', 'productName');
		nameNode.innerHTML = `${arrayOfStuff[i].name}`;

		priceNode = document.createElement('p');
		priceNode.setAttribute('class', 'itemPrice');
		priceNode.innerHTML = arrayOfStuff[i].price;

		catIdNode = document.createElement('p');
		catIdNode.setAttribute('class', 'catId');
//		imgNode.setAttribute('src', `${arrayOfStuff[i].url}`)
		catIdNode.innerHTML = arrayOfStuff[i].category_id;

		sectionNode.appendChild(nameNode);
		sectionNode.appendChild(priceNode);
		sectionNode.appendChild(catIdNode);

		writeToDom(sectionNode,'container');
	}
}

function assignDepartments(departmentsArray){
	var catIdArray = document.getElementsByClassName('catId');

	for (var i = 0; i < catIdArray.length; i++) {
		var deptIndex = parseInt(catIdArray[i].innerHTML) - 1;
		catIdArray[i].innerHTML = String(departmentsArray[deptIndex]);
	}
	addDeptToDom(catIdArray);
}

function addDeptToDom(thingsToWriteToDom) {
	var parentSections = document.getElementsByClassName('item');
	for (var i = 0; i < parentSections.legnth; i++) {
		parentSection.removeChild(parentSection.childNodes[2]);
		parentSection.appendChild(thingsToWriteToDom[i]);
	}
}


function assignSeasons(seasonsArray){


}

function assignDiscounts(discountsArray){


}


 //      "id": 1,
 //      "name": "Mens socks",
 //      "price": 6.99,
 //      "category_id": 1


	// "id": 1,
	// "name": "Apparel",
	// "season_discount": "Winter",
	// "discount": 0.10