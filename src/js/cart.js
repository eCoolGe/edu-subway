import {cart, menu} from "./index";

export const cartAdd = (target, itemCount = 0, itemPrice = 0) => {
    const item = target.parentElement.parentElement
    const itemName = item.getElementsByClassName('item__name')[0].children[0].textContent
    const itemPriceIndex = menu.findIndex(item => item.name === itemName)
    if (itemPrice === 0)
        itemPrice = menu[itemPriceIndex].price
    const priceHolder = document.querySelector('#cartPrice')
    const cartItems = document.querySelector(".cart__body__items")
    const counterInputElement = item.getElementsByClassName('counter-block__counter')[0].getElementsByTagName('input')[0]

    if (!cart.some(item => item.itemName === itemName)) {
        if (itemCount === 0)
            itemCount = counterInputElement.value
        else
            counterInputElement.value = itemCount

        cart.push({'itemName': itemName, 'itemCount': itemCount, 'itemPrice': itemPrice})
        target.classList.add('active')
        target.innerHTML = "УБРАТЬ"

        cartItems.innerHTML +=
            `
                <div class="cart__body__item">
                    <span>${itemName}</span>
                    <span>${itemCount}</span>
                </div>
            `
        priceHolder.innerHTML = (parseInt(priceHolder.textContent) + (parseInt(itemCount) * parseInt(itemPrice))).toString()

    } else {
        const itemNameIndex = cart.findIndex(item => item.itemName === itemName)
        itemCount = cart[itemNameIndex].itemCount
        itemPrice = cart[itemNameIndex].itemPrice

        cart.splice(itemNameIndex, 1)
        target.classList.remove('active')
        target.innerHTML = "В КОРЗИНУ"

        const cartChildren = cartItems.children
        for (let i = 0; i < cartChildren.length; i++) {
            if (cartChildren[i].children[0].textContent === itemName) cartChildren[i].remove()
        }

        priceHolder.innerHTML = (parseInt(priceHolder.textContent) - (parseInt(itemCount) * parseInt(itemPrice))).toString()
    }
}