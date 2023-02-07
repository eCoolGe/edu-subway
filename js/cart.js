const cartAdd = (target) => {
    let item = target.parentElement.parentElement
    let itemName = item.getElementsByClassName('item__name')[0].children[0].textContent
    let itemCount;
    // let itemPrice = item.getElementsByClassName('item__price')[0].getElementsByTagName('span')[0].textContent
    let itemPrice = menu[menu.findIndex(item => item.name === itemName)].price
    let priceHolder = document.querySelector('#cartPrice')
    let cartItems = document.querySelector(".cart__body__items")

    if (!cart.some(item => item.itemName === itemName)) {
        itemCount = item.getElementsByClassName('counter-block__counter')[0].getElementsByTagName('input')[0].value

        cart.push({'itemName': itemName, 'itemCount': itemCount})
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
        itemCount = cart[cart.findIndex(item => item.itemName === itemName)].itemCount

        cart.splice(cart.findIndex(item => item.itemName === itemName), 1)
        target.classList.remove('active')
        target.innerHTML = "В КОРЗИНУ"

        let cartChildren = cartItems.children
        for (let i = 0; i < cartChildren.length; i++) {
            if (cartChildren[i].children[0].textContent === itemName) cartChildren[i].remove()
        }

        priceHolder.innerHTML = (parseInt(priceHolder.textContent) - (parseInt(itemCount) * parseInt(itemPrice))).toString()
    }
}