# SeasonalSales
# NSS Assignment for 8/29/17

1. Build a web page that lists all of the products, the name of the department it's in, and the price. 
2. Additionally, put a `<select>` element at the top of the page that contains all possible values of the season_discount key in the categories file. 
3. As soon as you select one of the seasons, all prices on the page should immediately be discounted by the corresponding percentage.

##

# Code files

index.html - minimal template structure: DIV points for insertion of seasonal drop down menu and items for sale.
seasonal-sales.js - reads in two json files, prints contents to the screen, adjusts the sale price depending on the season selected.
products.json - JSON file containing items for sale with category id keyed to the categroies.json file
categories.json - JSON file containing department and seasonal discounts to be applied
main.css - css styling