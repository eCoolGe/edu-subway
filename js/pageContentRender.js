let cart = [];

const pageContentRender = (target) => {

    let pageName = target.id // or event.target
    let childrensParentNav = target.parentElement.children

    for(let i = 0; i < childrensParentNav.length; i++) {
        childrensParentNav[i].classList.remove("navbar_selected")
    }
    target.classList.add("navbar_selected")

    fetch("../assets/data.json")
        .then(response => response.json())
        .then(data => {
            document.querySelector(".product-list").innerHTML = ""
            for (let i = 0; i < data.menu.length; i++) {
                if (data.menu[i].category === pageName) {
                    let marketImage;
                    switch (data.menu[i].market) {
                        case "subway":
                            marketImage = data.markets.subway.image
                            break;
                        case "sfc":
                            marketImage = data.markets.sfc.image
                            break;
                        case "doner":
                            marketImage = data.markets.doner.image
                            break;

                    }
                    document.querySelector(".product-list").innerHTML +=
                        `
                        <article class="item">
                        ${marketImage ? `<img class="item__shop-logo" src="${marketImage}" alt="">` : ``}                   
                            <div class="item__outer-circle">
                                <div class="item__inner-circle">
                                    <img src="${data.menu[i].image}" alt="">
                                </div>
                            </div>
                            <div class="item__name">
                                <p>${data.menu[i].name}</p>
                            </div>
                            <div class="item__desc">
                                <p>${data.menu[i].description}</p>
                            </div>
                            <p class="item__price">Цена: ${data.menu[i].price} ₽</p>
                            <div class="item__counter-block noselect">
                                <p>КОЛИЧЕСТВО</p>
                                <div class="counter-block__counter">
                                    <span onclick="counterDecrement(this)" class="counter__minus">—</span>
                                    <label>
                                        <input oninput="counterChange(this)" type="text" value="1"/>
                                    </label>
                                    <span onclick="counterIncrement(this)" class="counter__plus">+</span>
                                </div>
                                
                                <button 
                                ${cart.includes(data.menu[i].name) 
                                    ? `class="active"` 
                                    : ``
                                }
                                onclick="cartAdd(this)"
                                >
                                ${cart.includes(data.menu[i].name) 
                                    ? `УБРАТЬ` 
                                    : `В КОРЗИНУ`
                                }
                                </button>
                            </div>
                        </article>
                    `;
                }
            }
        })
}

const cartAdd = (target) => {
    let itemName = target.parentElement.parentElement.getElementsByClassName('item__name')[0].children[0].textContent

    if (!cart.includes(itemName)) {
        cart.push(itemName)
        target.classList.add('active')
        target.innerHTML = "УБРАТЬ"
    } else {
        const index = cart.indexOf(itemName);
        if (index > -1) {
            cart.splice(index, 1);
        }
        target.classList.remove('active')
        target.innerHTML = "В КОРЗИНУ"
    }
}

const counterIncrement = (target) => {
    let counter = target.parentElement.getElementsByTagName('input')[0]
    counter.innerHTML =  counter.value++
}

const counterDecrement = (target) => {
    let counter = target.parentElement.getElementsByTagName('input')[0]
    if (counter.value > 1) {
        counter.innerHTML = counter.value--
    }
}

const counterChange = (target) => {
    let counter = target.parentElement.getElementsByTagName('input')[0]
    counter.value = counter.value.replace(/[^\d.]/g, '');

    if (counter.value < 1) {
        counter.value = '1'
    }
}

