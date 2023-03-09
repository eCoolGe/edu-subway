import {cart, storage} from "./index";
import {counterChange, counterDecrement, counterIncrement} from "./counter"
import {cartAdd} from "./cart";
import {modalOpenOrCartRemove} from "./modalContentRender";

export async function pageContentRender(target) {
    const pageName = target.id
    const navChildren = target.parentElement.children

    for (let i = 0; i < navChildren.length; i++) {
        navChildren[i].classList.remove("navbar_selected")
    }
    target.classList.add("navbar_selected")

    const productsList = document.querySelector(".product-list")

    productsList.innerHTML = ""
    for (let i = 0; i < storage.menu.length; i++) {
        const product = storage.menu[i]

        if (product.category === pageName) {
            const marketImage = storage.markets[product.market]?.image
            const marketImageHTML = marketImage ? `<img class="item__shop-logo" src=${require(`../assets${marketImage}`)} />` : ``

            const inCart = cart.some(item => item.itemName === product.name)
            const btnActive = inCart ? `active` : ``
            const btnText = inCart ? `УБРАТЬ` : `В КОРЗИНУ`
            const countIndex = cart.findIndex(item => item.itemName === product.name)
            const inputValue = inCart ? cart[countIndex].itemCount : '1'

            productsList.innerHTML +=
                `
                    <article class="item">
                    ${marketImageHTML}                   
                        <div class="item__outer-circle">
                            <div class="item__inner-circle">
                                <img src=${require(`../assets${product.image}`)} alt=""> 
                            </div>
                        </div>
                        <div class="item__name">
                            <p>${product.name}</p>
                        </div>
                        <div class="item__desc">
                            <p>${product.description}</p>
                        </div>
                        <p class="item__price">Цена: <span>${product.price}</span> ₽</p>
                        <div class="item__counter-block noselect">
                            <p>КОЛИЧЕСТВО</p>
                            <div class="counter-block__counter">
                                <span class="counter__minus">—</span>
                                <label>
                                    <input class="counter__input" id="counterInput${i}" type="text" value="${inputValue}"/>
                                </label>
                                <span class="counter__plus">+</span>
                            </div>
                            <button class="item__button ${btnActive}">${btnText}</button>
                        </div>
                    </article>
                `;
        }
    }

    document.querySelectorAll(".item__button").forEach(elem => {
        if (pageName === "sandwiches")
            elem.addEventListener('click', (e) => modalOpenOrCartRemove(e.target))
        else
            elem.addEventListener('click', (e) => cartAdd(e.target))
    })
    document.querySelectorAll(".counter__minus").forEach(elem => elem
        .addEventListener('click', (e) => counterDecrement(e.target)))
    document.querySelectorAll(".counter__input").forEach(elem => elem
        .addEventListener('input', (e) => counterChange(e.target)))
    document.querySelectorAll(".counter__plus").forEach(elem => elem
        .addEventListener('click', (e) => counterIncrement(e.target)))
}