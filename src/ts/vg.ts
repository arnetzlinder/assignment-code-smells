/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum SortBy {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class illegalSortSelectedException extends Error {}

export function sortProductsBy (sort: SortBy, products: Product[]): Product[] {
  if (sort === SortBy.PRICE_ASCENDING) {
    return products.sort((a,b) => { return a.price - b.price });
  } else if (sort === SortBy.PRICE_DECENDING) {
    return products.sort((a,b) => { return b.price - a.price });
  } else if (sort === SortBy.NAME_ALPHABETIC) {
    return products.sort((a,b) => { 
      if (a.name > b.name)
        return 1;
      if (a.name < b.name)
        return -1;
      return 0;
    });
  } else if (sort === SortBy.NAME_ALPHABETIC_REVERSE) {
    return products.sort((a,b) => { 
      if (a.name < b.name)
        return 1;
      if (a.name > b.name)
        return -1;
      return 0;
    });
  }
  // Om sort defineras fel kommer en tom lista att returneras. Det undviker vi med att istället skicka tillbaka ett fel. 
  throw new illegalSortSelectedException();
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
  class Cart {
    addToCart(i: number) {}
  }
  export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
  export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

  function createHtml() {

    updateCart();

    for (let i = 0; i < productList.length; i++) {
      let dogproduct: HTMLDivElement = document.createElement("div");

      let renderDogImage = createDogImage(i);
      dogproduct.appendChild(renderDogImage);

      createName(i, dogproduct);

      createPrice(i, dogproduct);
  
      createInfo(i, dogproduct);

      sortBy(i, dogproduct);
    }
  }

  function createDogImage(i: number) {
    let dogImageContainer: HTMLDivElement = document.createElement("div");
    dogImageContainer.className = "dogimgcontainer";

    let dogImage: HTMLImageElement = document.createElement("img");

    dogImage.src = productList[i].picture;
    dogImage.alt = productList[i].pictureAlt;

    dogImage.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
    });

    dogImageContainer.appendChild(dogImage);

    dogImageContainer.appendChild(dogImage);
    let cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImageContainer.appendChild(cartSymbolContainer);

    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    cartSymbol.addEventListener("click", () => {
    let cart = new Cart();
    cart.addToCart(i);
    });

    productList[i].productSpec = false;

    dogImage.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listText = JSON.stringify(productList);
      localStorage.setItem("savedList", listText);
      });

      return dogImageContainer;
    }

  setLocalStorage();


  function createName(i: number, dogproduct: HTMLDivElement) {
    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogproduct.appendChild(name);
  }

  function createPrice(i: number, dogproduct: HTMLElement) {
    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogproduct.appendChild(price);
  }

  function createInfo(i: number, dogproduct: HTMLElement) {
    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogproduct.appendChild(info);
  }

  function setLocalStorage() {
    let listastext = JSON.stringify(productList);
    localStorage.setItem("savedList", listastext);
    sessionStorage.clear();
  }

  function updateCart() {
    let quantity = 0;
    for (let i = 0; i < cartList.length; i++) {
      quantity += cartList[i].quantity;
    }
  
    let floatingCart = document.getElementById("floatingcartnumber") as HTMLElement;
    floatingCart.innerHTML = "" + quantity;
  }
  
  function sortBy(i: number, dogproduct: HTMLDivElement) {
    if (productList[i].category === "dogcollars") {
      let cat1: HTMLElement = document.getElementById("dogcollars") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat1.appendChild(dogproduct);
    }
    if (productList[i].category === "dogfood") {
      let cat2: HTMLElement = document.getElementById(
        "dogfood"
      ) as HTMLElement;
      dogproduct.className = "dogproduct";
      cat2.appendChild(dogproduct);
    }
    if (productList[i].category == "dogtoys") {
      let cat3: HTMLElement = document.getElementById("dogtoys") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat3.appendChild(dogproduct);
    }
    if (productList[i].category === "poopbags") {
      let cat4: HTMLElement = document.getElementById("poopbags") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat4.appendChild(dogproduct);
    }
    if (productList[i].category === "dogvitamines") {
      let cat5: HTMLElement = document.getElementById("dogvitamines") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat5.appendChild(dogproduct);
    }
  }
  
/*
  3. Refaktorera funktionen getfromstorage
  */
// export class CartProduct {
//   constructor(
//     public name: string,
//     public image: string,
//     public price: number,
//     public amount: number
//   ) {}
// }

// function getfromstorage() {
//   let container = document.getElementById("checkout-table");

//   let fromstorage: string = localStorage.getItem("cartArray") || "";
//   let astext: CartProduct[] = JSON.parse(fromstorage);

//   let productcontainer = document.getElementById(
//     "product-ckeckout-container"
//   ) as HTMLDivElement;

//   let amountcontainer = document.getElementById(
//     "amount-checkout-container2"
//   ) as HTMLDivElement;
//   let amounttext: HTMLTableCellElement = document.createElement("th");
//   amountcontainer.appendChild(amounttext);
//   amounttext.innerHTML = "amount:";

//   let titlecontainer = document.getElementById(
//     "title-container"
//   ) as HTMLTableRowElement;
//   titlecontainer.innerHTML = "<strong>products:</strong>";

//   let productquantity = document.getElementById(
//     "product-quantity"
//   ) as HTMLTableRowElement;
//   let qttext: HTMLTableCellElement = document.createElement("th");
//   productquantity.appendChild(qttext);
//   qttext.innerHTML = "change quantity:";

//   let checkkouttotal2 = document.getElementById(
//     "title-total"
//   ) as HTMLTableCellElement;
//   let totaltext: HTMLTableCellElement = document.createElement("th");
//   checkkouttotal2.appendChild(totaltext);
//   totaltext.innerHTML = "total:";

//   for (let i: number = 0; i < astext.length; i++) {
//     let productt: HTMLTableCellElement = document.createElement("th");
//     titlecontainer.appendChild(productt);
//     productt.innerHTML = astext[i].name;
//     productt.className = "hej";

//     let amountt: HTMLTableCellElement = document.createElement("th");
//     amountcontainer.appendChild(amountt);
//     amountt.innerHTML = "x" + astext[i].amount;
//     amountt.className = "hej";

//     let amountqt: HTMLTableCellElement = document.createElement("th");
//     productquantity.appendChild(amountqt);
//     let amountplusbtn: HTMLButtonElement = document.createElement("button");
//     amountqt.appendChild(amountplusbtn);
//     amountqt.className = "hej";

//     let icon: HTMLSpanElement = document.createElement("i");
//     amountplusbtn.appendChild(icon);

//     icon.className = "fas fa-minus";
//     amountplusbtn.className = "plusbtn";

//     let icon2: HTMLSpanElement = document.createElement("i");
//     icon2.className = "fas fa-plus";

//     let amountminusbtn: HTMLButtonElement = document.createElement("button");
//     amountqt.appendChild(amountminusbtn);
//     amountminusbtn.appendChild(icon2);
//     amountminusbtn.className = "minusbtn";
//   }

//   let addition: number = 0;

//   for (let i = 0; i < astext.length; i++) {
//     addition += astext[i].price *= astext[i].amount;
//   }

//   let totalprice2: HTMLTableCellElement = document.createElement("th");
//   checkkouttotal2.appendChild(totalprice2);
//   totalprice2.innerHTML = addition + "$";
//   totalprice2.id = "totalincenter";
// }
