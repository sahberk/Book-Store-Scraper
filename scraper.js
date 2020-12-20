const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  var i=0,j;
  var id=1;

  const myObjects= [];

  for(i=1;i<4;i++){

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

    const myBook = await page.evaluate(()=>
        Array.from(document.querySelectorAll("div.cover> a ")).map((book)=>book.href)
    );

    const website="kitapyurdu";

    for(j=0;j<20;j++){
      const myName=names[j];
      const myPrice=prices[j];
      const myImg=imgSrc[j];
      const bookPage=myBook[j];
      const myObj = {
        myName,
        myPrice,
        myImg,
        bookPage,
        website    
    };
      myObjects.push(myObj);
    }
  
    id++;
    }
//////////////////////////////////////////// dr a gectim //////////////////

    id=1;

    for(i=1;i<4;i++){

      await page.goto(`https://www.dr.com.tr/CokSatanlar/Kitap#/page=${id}/sort=groups.group.displayorder,asc/categoryid=0/clog=4020/parentId=0/price=-1,-1`);
     
  
      const names= await page.evaluate(()=>
          Array.from(document.querySelectorAll("div.content > a.item-name ")).map((photo)=>photo.title)
      );
  
      const prices= await page.evaluate(()=>
          Array.from(document.querySelectorAll("div.content > span.price ")).map((photo)=>photo.innerText.split(" ")[0])
      );
  
      const imgSrc= await page.evaluate(()=>
          Array.from(document.querySelectorAll("figure > img ")).map((photo)=>photo.src)
      );
  
      const myBook = await page.evaluate(()=>
          Array.from(document.querySelectorAll("div.content > a.item-name ")).map((photo)=>photo.href)
      ); 
  
      const website="dr";
  
      for(j=0;j<42;j++){
        const myName=names[j];
        const myPrice=prices[j];
        const myImg=imgSrc[j];
        const bookPage=myBook[j];
        const myObj = {
          myName,
          myPrice,
          myImg,
          bookPage,
          website  
      };
        myObjects.push(myObj);
      }
    
      id++;
      }
    
      /////////////////////////////////////idefixe gectim//////////////////////

      id=1;

      for(i=1;i<4;i++){

        await page.goto(`https://www.idefix.com/CokSatanlar/Kitap#/page=${id}/sort=groups.group.displayorder,asc/categoryid=0/clog=3569/parentId=0/price=-1,-1`);
       
    
        const names= await page.evaluate(()=>
            Array.from(document.querySelectorAll("div.image-area > img ")).map((name)=>name.alt)
        );
    
        const prices= await page.evaluate(()=>
            Array.from(document.querySelectorAll("div.box-line-4 > span.price ")).map((price)=>price.innerText.split(" ")[0]) 
        );
    
        const imgSrc= await page.evaluate(()=>
            Array.from(document.querySelectorAll("div.image-area > img ")).map((photo)=>photo.src)
        );
    
        const myBook = await page.evaluate(()=>
            Array.from(document.querySelectorAll("div.cart-product-box-view > a ")).map((book)=>book.href)
        ); 
    
        const website="idefix";
    
        for(j=0;j<36;j++){
          const myName=names[j];
          const myPrice=prices[j];
          const myImg=imgSrc[j];
          const bookPage=myBook[j];
          const myObj = {
            myName,
            myPrice,
            myImg,
            bookPage,
            website 
        };
          myObjects.push(myObj);
        }
      
        id++;
        }

    console.log(myObjects);

    console.log(myObjects.length);  // adet sayısı kontrolu
    

  await browser.close();
})();