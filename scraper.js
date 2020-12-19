const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url="https://www.kitapyurdu.com/index.php?route=product/category/&filter_category_all=true&category_id=1&sort=purchased_365&order=DESC&filter_in_stock=1";
  
  var i=0;
  var id=1;
  for(i=1;i<2;i++){

    await page.goto(`https://www.kitapyurdu.com/index.php?route=product/category&filter_category_all=true&path=1&filter_in_stock=1&sort=purchased_365&order=DESC&page=${id}`);
   

    const names= await page.evaluate(()=>
        Array.from(document.querySelectorAll("div.cover> a >img ")).map((photo)=>photo.alt)
    );

    const prices= await page.evaluate(()=>
    Array.from(document.querySelectorAll("div.price-new> span.value ")).map((price)=>price.innerText.trim()) 
    );

    const imgSrc= await page.evaluate(()=>
    Array.from(document.querySelectorAll("div.cover> a >img ")).map((photo)=>photo.src)
    );

  /* const infos= await page.evaluate(()=>
      Array.from(document.querySelectorAll("div.product-list "))
      .map(compact => ({
        name: compact.querySelector("div.cover> a >img ").alt,
        imgSrc: compact.querySelector("div.cover> a >img ").src
      }))
    )*/

      console.log(names);
      console.log(prices);
      //console.log(imgSrc);
      id++;
    }
    

  await browser.close();
})();