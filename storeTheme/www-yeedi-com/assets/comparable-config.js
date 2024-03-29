var comparableConfig = {
  enabled: false,
  compareFields: {
    price: true,
    vendor: false,
    productType: false,
    addToCart: true,
    options: []
  },
  stickyButton: {
    useIcon: true,
    position: 'right-bottom',
    iconSvg: `<?xml version="1.0" encoding="iso-8859-1"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 442.852 442.852" style="enable-background:new 0 0 442.852 442.852;" xml:space="preserve">
<path d="M429.958,288.314l-49.446-137.153c12.872-4.326,22.148-16.482,22.148-30.811c0-17.955-14.551-32.505-32.505-32.505
  c-0.92,0-1.828,0.048-2.728,0.123c-46.602,2.728-91.716,4.142-136.726,4.304l-9.273-40.846l-9.274,40.841
  c-45.033-0.186-90.156-1.62-136.75-4.301c-0.893-0.074-1.793-0.121-2.705-0.121c-17.955,0-32.505,14.551-32.505,32.505
  c0,14.329,9.274,26.485,22.147,30.811L12.895,288.314H0c0,18.292,33.026,33.119,73.766,33.119c40.739,0,73.759-14.827,73.759-33.119
  h-12.888L84.939,150.462c11.881-4.836,20.264-16.493,20.264-30.112c0-5.62-1.427-10.905-3.937-15.516
  c31.085,16.548,67.626,25.801,104.831,27.776l1.867,163.831c-4.194,3.025-7.328,7.422-8.746,12.537
  c-4.264,5.055-6.839,11.582-6.839,18.712c0,8.001,3.237,15.246,8.473,20.499c-1.579,3.122-2.475,6.649-2.475,10.387
  c0,0.551,0.026,1.096,0.064,1.637c-28.88,4.186-51.77,16.057-60.336,31.213h166.639c-8.565-15.156-31.456-27.027-60.336-31.213
  c0.038-0.542,0.064-1.086,0.064-1.637c0-3.738-0.896-7.265-2.475-10.387c5.235-5.252,8.473-12.497,8.473-20.499
  c0-7.13-2.575-13.657-6.839-18.712c-1.417-5.115-4.551-9.512-8.744-12.536l1.865-163.846c37.228-2.012,73.785-11.303,104.868-27.827
  c-2.532,4.627-3.974,9.936-3.974,15.582c0,13.619,8.382,25.276,20.264,30.112l-49.697,137.852h-12.889
  c0,18.292,33.021,33.119,73.76,33.119c40.738,0,73.766-14.827,73.766-33.119H429.958z M68.766,288.314H23.524l45.242-125.49V288.314
  z M124.008,288.314H78.766v-125.49L124.008,288.314z M374.086,162.824l45.242,125.49h-45.242V162.824z M364.086,162.824v125.49
  h-45.241L364.086,162.824z"/>
</svg>
`,
  },
  enablePages: {
    enableOnAllCollections: true,
    enableOnProductPages: true,
    exceptCollections: [],
  },
  styles: {"tableMobileFixFirstColumn":false,"tableBestValueHighlightColor":"#ffffdf","tableAddToCartBackgroundColor":null},
}

var comparableCustomFieldsByProduct = [{"productId":6026387882141,"fields":[{"name":"Cleaning Power","defaultValue":"Powerful Cleaning","withPriority":false,"variants":[]},{"name":"Extra Cleaning System","defaultValue":"N/A","withPriority":false,"variants":[]},{"name":"Navigation ","defaultValue":"N/A","withPriority":false,"variants":[]},{"name":"App Intergration ","defaultValue":"No","withPriority":false,"variants":[]},{"name":"Smart Speaker Intergration","defaultValue":"No","withPriority":false,"variants":[]},{"name":"Customize Clean","defaultValue":"No","withPriority":false,"variants":[]},{"name":"Control","defaultValue":"Remote","withPriority":false,"variants":[]},{"name":"Anti-Drop \u0026 Anti-Collision Sensors","defaultValue":"Yes","withPriority":false,"variants":[]}]},{"productId":6026387914909,"fields":[{"name":"Cleaning Power","defaultValue":"Powerful Cleaning +","withPriority":false,"variants":[]},{"name":"Extra Cleaning System","defaultValue":"Mopping System","withPriority":false,"variants":[]},{"name":"Navigation ","defaultValue":"yeedi Visual","withPriority":false,"variants":[]},{"name":"App Intergration ","defaultValue":"No","withPriority":false,"variants":[]},{"name":"Customize Clean","defaultValue":"No","withPriority":false,"variants":[]},{"name":"Anti-Drop \u0026 Anti-Collision Sensors","defaultValue":"Yes","withPriority":false,"variants":[]},{"name":"Smart Speaker Intergration","defaultValue":"No","withPriority":false,"variants":[]},{"name":"Control","defaultValue":"Remote","withPriority":false,"variants":[]},{"name":"Area Cleaning","defaultValue":"No","withPriority":false,"variants":[]}]},{"productId":6026388275357,"fields":[{"name":"Extra Cleaning System","defaultValue":"N/A","withPriority":false,"variants":[]},{"name":"Navigation ","defaultValue":"N/A","withPriority":false,"variants":[]},{"name":"Cleaning Power","defaultValue":"Powerful Cleaning","withPriority":false,"variants":[]},{"name":"App Intergration ","defaultValue":"Yes","withPriority":false,"variants":[]},{"name":"Smart Speaker Intergration","defaultValue":"Yes","withPriority":false,"variants":[]},{"name":"Anti-Drop \u0026 Anti-Collision Sensors","defaultValue":"Yes","withPriority":false,"variants":[]},{"name":"Control","defaultValue":"App/ Voice","withPriority":false,"variants":[]},{"name":"Customize Clean","defaultValue":"Yes","withPriority":false,"variants":[]},{"name":"Area Cleaning","defaultValue":"No","withPriority":false,"variants":[{"id":37777829691549,"value":"Yes"},{"id":37777829658781,"value":"No"}]}]}]

var comparableOptions = [{"name":"Cleaning Power","values":["Powerful Cleaning","Powerful Cleaning +"],"withPriority":false},{"name":"Extra Cleaning System","values":["N/A","Mopping System"],"withPriority":false},{"name":"Anti-Drop \u0026 Anti-Collision Sensors","values":["Yes"],"withPriority":false},{"name":"Navigation ","values":["N/A","yeedi Visual"],"withPriority":false},{"name":"App Intergration ","values":["Yes","No ","No"],"withPriority":false},{"name":"Smart Speaker Intergration","values":["No","Yes"],"withPriority":false},{"name":"Control","values":["Remote","App/ Voice"],"withPriority":false},{"name":"Customize Clean","values":["No","Yes"],"withPriority":false},{"name":"Area Cleaning","values":["Yes","No"],"withPriority":false}]

var comparableGroups = [{"name":"yeedi","options":["Cleaning Power","Extra Cleaning System","Anti-Drop \u0026 Anti-Collision Sensors","Navigation ","App Intergration ","Smart Speaker Intergration","Control","Customize Clean","Area Cleaning"]}]

var comparableLocales = {"collection_compare_btn":"Compare Vacuums","bar_compare_btn":"Compare","bar_close_btn":"Close","bar_add_to_compare_btn":"Add to compare","page_add_to_cart":"Add to cart","page_go_to_checkout":"Go to checkout","page_sold_out":"Sold out","page_show_only_differences":"Show only differences","page_show_all_features":"Show all features"}
