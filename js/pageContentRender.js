const pageContentRender = (target) => {
    let pageName = target.id
    let navChildren = target.parentElement.children

    for (let i = 0; i < navChildren.length; i++) {
        navChildren[i].classList.remove("navbar_selected")
    }
    target.classList.add("navbar_selected")

    let productsList = document.querySelector(".product-list")

    productsList.innerHTML = ""

    for (let i = 0; i < storage.menu.length; i++) {
        let product = storage.menu[i]

        if (product.category === pageName) {
            let marketImage = storage.markets[product.market]?.image
            let inCart = cart.some(item => item.itemName === product.name)

            productsList.innerHTML +=
                `
                    <article class="item">
                    ${marketImage ? `<img class="item__shop-logo" src="${marketImage}" alt="">` : ``}                   
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
                                    <input 
                                    oninput="counterChange(this)" 
                                    type="text" 
                                    value="${inCart ? cart[cart.findIndex(item => item.itemName === product.name)].itemCount : '1'}"/>
                                </label>
                                <span onclick="counterIncrement(this)" class="counter__plus">+</span>
                            </div>
                            
                            <button 
                                ${inCart
                                    ? `class="active"`
                                    : ``
                                }
                                onclick="${pageName === "sandwiches"
                                            ? "modalContentOpen(this)"
                                            : "cartAdd(this)"
                                        }"
                            >
                            ${inCart
                                ? `УБРАТЬ`
                                : `В КОРЗИНУ`
                            }
                            </button>
                        </div>
                    </article>
                `;
        }
    }
}