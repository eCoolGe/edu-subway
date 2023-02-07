const pageContentRender = (target) => {
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
            const marketImageHTML = marketImage ? `<img class="item__shop-logo" src="${marketImage}" alt="">` : ``
            const inCart = cart.some(item => item.itemName === product.name)
            const btnClasses = inCart ? `class="active"` : ``
            const btnOnClick = pageName === "sandwiches" ? "modalContentOpen(this)" : "cartAdd(this)"
            const btnText = inCart ? `УБРАТЬ` : `В КОРЗИНУ`
            const countIndex = cart.findIndex(item => item.itemName === product.name)
            const inputValue = inCart ? cart[countIndex].itemCount : '1'

            productsList.innerHTML +=
                `
                    <article class="item">
                    ${marketImageHTML}                   
                        <div class="item__outer-circle">
                            <div class="item__inner-circle">
                                <img src="${product.image}" alt="">
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
                                <span onclick="counterDecrement(this)" class="counter__minus">—</span>
                                <label>
                                    <input oninput="counterChange(this)" type="text" value="${inputValue}"/>
                                </label>
                                <span onclick="counterIncrement(this)" class="counter__plus">+</span>
                            </div>
                            <button ${btnClasses} onclick="${btnOnClick}">${btnText}</button>
                        </div>
                    </article>
                `;
        }
    }
}