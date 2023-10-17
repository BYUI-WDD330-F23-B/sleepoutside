import { getLocalStorage } from "./utils.mjs";

export function renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
    const htmlItems = cartItemTemplate(cartItems);
    document
      .querySelector(".product-list")
      .insertAdjacentHTML("beforeend", htmlItems);
  }

  export function cartItemTemplate(item) {
    const newItem = `<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
        src='${item.Image}'
        alt='${item.Name}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: 1</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
  }