// Import Products and Categories data from json files
// Send to functions to write data to the DOM
var productsRequest = new XMLHttpRequest();
productsRequest.addEventListener('load', makeProductsArray);
productsRequest.addEventListener('error', errorFxn);
productsRequest.open('GET','products.json');
productsRequest.send();  // run the request


var categoriesRequest = new XMLHttpRequest();
categoriesRequest.addEventListener('load', makeCategoriesArray);
categoriesRequest.addEventListener('error', errorFxn);
categoriesRequest.open('GET','categories.json');
categoriesRequest.send();  // run the request

var productsArray = [];
var categoriesArray = [];


////////////////////
//  FUNCTIONS ()  //
////////////////////


function makeProductsArray() {
	var data = JSON.parse(this.responseText);
	productsArray = data.products;
	createProductsDomString(productsArray);
	console.log(1);
}

function makeCategoriesArray() {
	var data = JSON.parse(this.responseText);
	categoriesArray = data.categories;
	processCategories(categoriesArray);
	console.log(2);
}

function writeToDom(node, divId) {
	document.getElementById(divId).appendChild(node);

}

function createProductsDomString(arrayOfStuff) {
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
		catIdNode.innerHTML = arrayOfStuff[i].category_id;

		sectionNode.appendChild(nameNode);
		sectionNode.appendChild(priceNode);
		sectionNode.appendChild(catIdNode);

		writeToDom(sectionNode,'container');
	}
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
	createSeasonsDropDown(seasonsArray, discountsArray);
	addListenersToDropDown(discountsArray);
}

function assignDepartments(departmentsArray){
	var catIdArray = document.getElementsByClassName('catId');

	for (var i = 0; i < catIdArray.length; i++) {
		var deptIndex = parseInt(catIdArray[i].innerHTML) - 1;
		catIdArray[i].innerHTML = departmentsArray[deptIndex];
		catIdArray[i].classList.add(departmentsArray[deptIndex]);
	}
}

function createSeasonsDropDown(seasons) {
	var selectElement  = document.createElement('select');
	selectElement.setAttribute('id', 'season');
	for (var i = -1; i < seasons.length; i++) {
		if (i < 0) {
			optionNode = document.createElement('option');
			optionNode.setAttribute('value', 'blank');
			optionNode.innerHTML = '';
			selectElement.appendChild(optionNode);
		}
		else {
			optionNode = document.createElement('option');
			optionNode.setAttribute('value', `${seasons[i]}`);
			optionNode.innerHTML = `${seasons[i]}`;
			selectElement.appendChild(optionNode);
		}
	}
	writeToDom(selectElement, 'season-selection');
} 

function addListenersToDropDown(discounts) {
	var dropDownSelect = document.getElementById("season");
	dropDownSelect.addEventListener('change', function(e) { applySeasonalDiscount(e.target.value)});
}

function applySeasonalDiscount(season) {
	switch(season) {
    case 'Winter':
    	resetToOriginalPrices();
        var discountedItems = document.getElementsByClassName('Apparel');
        calculateDiscount(0.1, discountedItems);
        break;
    case 'Autumn':
      	resetToOriginalPrices();
    	var discountedItems = document.getElementsByClassName('Furniture');
        calculateDiscount(0.25, discountedItems);
        break;
    case 'Spring':
        resetToOriginalPrices();
    	var discountedItems = document.getElementsByClassName('Household');
        calculateDiscount(0.15, discountedItems);
        break;
    default:
        resetToOriginalPrices(0, discountedItems);    
	}
}

function calculateDiscount (discountPercentage, productsToDiscount) {
	for (var i = 0; i < productsToDiscount.length; i++ ) {
		var price = parseInt(productsToDiscount[i].previousSibling.innerText);
		price *= (1 - discountPercentage);
		productsToDiscount[i].previousSibling.innerText = price.toFixed(2);
		productsToDiscount[i].previousSibling.classList.add('sale');
	}
}

function resetToOriginalPrices() { console.log("in resetToOriginalPrices");
	var allItems = document.getElementsByClassName('item');
	for (var i = 0; i < allItems.length; i++) {
		allItems[i].lastChild.previousSibling.innerText = productsArray[i].price;
		allItems[i].lastChild.previousSibling.classList.remove('sale');
	}
}

function errorFxn() {
	console.log("Broken code!")
}