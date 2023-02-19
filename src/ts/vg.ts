import { CartProduct } from "./models/CartProduct";

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
    switch (productList[i].category) {
      case "dogcollars":
        let cat1: HTMLElement = document.getElementById("dogcollars") as HTMLElement;
        dogproduct.className = "dogproduct";
        cat1.appendChild(dogproduct);
        break;
      case "dogfood":
        let cat2: HTMLElement = document.getElementById("dogfood") as HTMLElement;
        dogproduct.className = "dogproduct";
        cat2.appendChild(dogproduct);
        break;
      case "dogtoys":
        let cat3: HTMLElement = document.getElementById("dogtoys") as HTMLElement;
        dogproduct.className = "dogproduct";
        cat3.appendChild(dogproduct);
        break;
      case "poopbags":
        let cat4: HTMLElement = document.getElementById("poopbags") as HTMLElement;
        dogproduct.className = "dogproduct";
        cat4.appendChild(dogproduct);
        break;
      case "dogvitamines":
        let cat5: HTMLElement = document.getElementById("dogvitamines") as HTMLElement;
        dogproduct.className = "dogproduct";
        cat5.appendChild(dogproduct);
        break;
      default:
    }
  }
  
/*
  3. Refaktorera funktionen getfromstorage
  */

  let fromstorage: string = localStorage.getItem("saveCartArray") || "";
  let cartProducts: CartProduct[] = JSON.parse(fromstorage);

  function createHTMLTable() {
    let { titleContainer, amountContainer, productQuantity, checkoutTotal } = renderTable ();

    for (let i: number = 0; i < cartProducts.length; i++) {
      let amountQuantity: HTMLTableCellElement = renderTableHead(i);
  
      renderButtons(amountQuantity);
    }
  
    let addition = cartProducts.reduce((accumulate, current) =>{
      return accumulate + (current.price * current.amount);
    }, 0);
  
    let totalprice: HTMLTableCellElement = document.createElement("th");
    checkoutTotal.appendChild(totalprice);
    totalprice.innerHTML = addition + "$";
    totalprice.id = "total__price";
  
    function renderButtons(amountQuantity: HTMLTableCellElement) {
      let amountPlusBtn: HTMLButtonElement = document.createElement("button");
      amountQuantity.appendChild(amountPlusBtn);
      amountQuantity.className = "amount__quantity";
  
      let iconPlus: HTMLSpanElement = document.createElement("i");
      amountPlusBtn.appendChild(iconPlus);
  
      iconPlus.className = "fas fa-plus";
      amountPlusBtn.className = "plusbtn";
  
      let iconMinus: HTMLSpanElement = document.createElement("i");
      iconMinus.className = "fas fa-minus";
  
      let amountminusbtn: HTMLButtonElement = document.createElement("button");
      amountQuantity.appendChild(amountminusbtn);
      amountminusbtn.appendChild(iconMinus);
      amountminusbtn.className = "minusbtn";
    }

    function renderTableHead(i: number) {
      let tableProduct: HTMLTableCellElement = document.createElement("th");
      titleContainer.appendChild(tableProduct);
      tableProduct.innerHTML = cartProducts[i].name;
      tableProduct.className = "table__product";
  
      let tableAmount: HTMLTableCellElement = document.createElement("th");
      amountContainer.appendChild(tableAmount);
      tableAmount.innerHTML = "x" + cartProducts[i].amount;
      tableAmount.className = "table__amount";
  
      let amountQuantity: HTMLTableCellElement = document.createElement("th");
      productQuantity.appendChild(amountQuantity);
      return amountQuantity;
    }

    function renderTable() {
    let amountContainer = document.getElementById("amount-checkout-container") as HTMLDivElement;
  
    let amountText: HTMLTableCellElement = document.createElement("th");
    amountContainer.appendChild(amountText);
    amountText.innerHTML = "amount:";
  
    let titleContainer = document.getElementById("title-container") as HTMLTableRowElement;
    titleContainer.innerHTML = `<strong>products:</strong>`;
  
    let productQuantity = document.getElementById("product-quantity") as HTMLTableRowElement;
  
    let qttext: HTMLTableCellElement = document.createElement("th");
    productQuantity.appendChild(qttext);
    qttext.innerHTML = "change quantity:";
  
    let checkoutTotal = document.getElementById("title-total") as HTMLTableCellElement;
  
    let totaltext: HTMLTableCellElement = document.createElement("th");
    checkoutTotal.appendChild(totaltext);
    totaltext.innerHTML = "total:";
    return { titleContainer, amountContainer, productQuantity, checkoutTotal };
    }
  }