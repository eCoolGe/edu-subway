import {cart, menu, storage} from "./index";
import {counterDecrement} from "./counter";
let overlayChecker = false;

export const modalContentOpen = (target) => {
    const modal = document.querySelector(".hystmodal__wrap")
    modal.innerHTML =
        `
        <div class="hystmodal__window" role="dialog" aria-modal="true">
                <div class="hystmodal__header">
                    <span>Выберите размер сендвича</span>
                    <button class="hystmodal__close"></button>
                </div>
                <div class="hystmodal__middle">
                    <ul class="hystmodal__stages">
                        <li id="size" class="active">Размер</li>
                        <li id="bread">Хлеб</li>
                        <li id="vegetable">Овощи</li>
                        <li id="sauce">Соусы</li>
                        <li id="filling">Начинка</li>
                        <li id="finally">Готово!</li>
                    </ul>
                    <div class="hystmodal__stages-buttons">
                        <button class="noselect">< НАЗАД</button>
                        <button class="noselect">ВПЕРЕД ></button>
                    </div>
                    <div class="hystmodal__product-list"></div>
                </div>
                <div class="hystmodal__footer">
                    Итого: <span id="compositePrice">0</span> ₽
                </div>
            </div>
            <div class="hystmodal__plug noselect">●</div>
        `
    document.getElementsByClassName('hystmodal__close')[0].addEventListener('click', () => modalContentClose())

    document.addEventListener('mousedown', function (e) {
        /**
         * Проверяем было ли нажатие над .hystmodal__wrap,
         * и отмечаем это в свойстве this._overlayChecker
         */
        if (!e.target.classList.contains('hystmodal__wrap')) return;
        overlayChecker = true;
    }.bind(this));

    document.addEventListener('mouseup', function (e) {
        /**
         * Проверяем было ли отпускание мыши над .hystmodal__wrap,
         * и если нажатие тоже было на нём, то закрываем окно
         * и обнуляем this._overlayChecker в любом случае
         */
        if (overlayChecker && e.target.classList.contains('hystmodal__wrap')) {
            e.preventDefault();
            modalContentClose()
            return;
        }
        overlayChecker = false;
    }.bind(this));

    const modalButtonRender = () => {
        if (ul.firstElementChild.classList.contains('active')) {
            btns[0].classList.add('hidden')
            btns[1].classList.remove('hidden')
        } else if (ul.lastElementChild.classList.contains('active')) {
            btns[1].classList.add('hidden')
            btns[0].classList.remove('hidden')
        } else {
            btns[0].classList.remove('hidden')
            btns[1].classList.remove('hidden')
        }
    }

    const item = target.parentElement.parentElement
    const itemName = item.getElementsByClassName('item__name')[0].children[0].textContent
    const itemPriceIndex = menu.findIndex(item => item.name === itemName)
    const itemPrice = menu[itemPriceIndex].price
    const compositePrice = document.querySelector("#compositePrice")
    let cartComponents = menu[itemPriceIndex].components
    compositePrice.innerHTML = itemPrice
    let finallyPrice;

    const modalContentRender = (pageInterval) => {
        const itemSelected = (target, limiter = 1) => {
            while (!target.classList.contains("hystmodal__item"))
                target = target.parentElement
            let selected = target.parentElement.querySelectorAll(".hystmodal_selected")

            if (limiter === 1) {
                selected.forEach(elem => elem.classList.remove("hystmodal_selected"))
                target.classList.add("hystmodal_selected")
                cartComponents[activeLi.id] = target.id

            } else {
                if (selected.length < limiter && !target.classList.contains("hystmodal_selected")) {
                    target.classList.add("hystmodal_selected")
                    cartComponents[activeLi.id].push(target.id)
                } else {
                    target.classList.remove("hystmodal_selected")
                    let targetIndex = cartComponents[activeLi.id].findIndex(item => item === target.id)
                    cartComponents[activeLi.id].splice(targetIndex, 1)
                }
            }
            finallyPrice = itemPrice
            for (let elem in cartComponents) {
                if(!Array.isArray(cartComponents[elem]))
                    finallyPrice += storage[`${elem}s`][cartComponents[elem]].price
                else if (cartComponents[elem].length > 0) {
                    cartComponents[elem].forEach(element => finallyPrice += storage[`${elem}s`][element].price)
                }

            }
            compositePrice.innerHTML = finallyPrice
        }

        const productsList = document.querySelector(".hystmodal__product-list")
        const header = document.querySelector(".hystmodal__header span")
        let activeLi = document.getElementsByClassName('active')[0]
        ul.children[ulChildren.indexOf(activeLi)].classList.remove('active')
        ul.children[ulChildren.indexOf(activeLi) + pageInterval].classList.add('active')
        modalButtonRender()

        activeLi = document.getElementsByClassName('active')[0]
        let itemsData = storage[`${activeLi.id}s`]

        productsList.innerHTML = ""
        console.log(cartComponents)

        if (activeLi.id !== "finally") {
            for (let item in itemsData) {
                let itemClassSelected;
                if (!Array.isArray(cartComponents[activeLi.id]))
                    itemClassSelected = item === cartComponents[activeLi.id] ? `hystmodal_selected` : ""
                else
                    itemClassSelected = cartComponents[activeLi.id].includes(item) ? `hystmodal_selected` : ""

                const productListPrice = activeLi.id === "size" ? itemPrice + itemsData[item].price : itemsData[item].price

                productsList.innerHTML +=
                    `
                    <article id="${item}" class="hystmodal__item ${itemClassSelected}">
                        <div class="hystmodal__item__outer-circle">
                            <div class="hystmodal__item__inner-circle">
                                <img src=${require(`../assets${itemsData[item].image}`)} alt="">
                            </div>
                        </div>
                        <div class="hystmodal__item__name">
                            <p>${itemsData[item].name}</p>
                        </div>
                        <p class="hystmodal__item__price">Цена: <span>${productListPrice}</span> ₽</p>
                    </article>
                `
            }

            let limit = 1;
            switch (activeLi.id) {
                case "size":
                    header.innerHTML = "Выберите размер сендвича"
                    break;
                case "bread":
                    header.innerHTML = "Хлеб для сендвича на выбор"
                    break;
                case "vegetable":
                    limit = 99
                    header.innerHTML = "Дополнительные овощи бесплатно"
                    break;
                case "sauce":
                    header.innerHTML = "Выберите 3 бесплатных соуса по вкусу"
                    limit = 3
                    break;
                case "filling":
                    limit = 99
                    header.innerHTML = "Добавьте начинку по вкусу"
                    break;
                case "finally":
                    header.innerHTML = "Проверьте и добавьте в корзину"
                    break;
            }

            document.querySelectorAll(".hystmodal__item").forEach(elem => elem
                .addEventListener('click', ({target}) => itemSelected(target, limit)))
        }
    }
    const ul = document.querySelector(".hystmodal__stages")
    const btns = document.querySelector(".hystmodal__stages-buttons").children
    const ulChildren = Array.prototype.slice.call(ul.children)

    modalButtonRender()
    modalContentRender(0)
    btns[0].addEventListener('click', () => modalContentRender(-1))
    btns[1].addEventListener('click', () => modalContentRender(1))

    document.getElementsByClassName("hystmodal")[0].classList.add("hystmodal--active")
    document.getElementsByClassName("hystmodal__shadow")[0].classList.add("hystmodal__shadow--show")
    document.querySelector("body").classList.add("modal-open")
}


export const modalContentClose = () => {
    document.getElementsByClassName("hystmodal")[0].classList.remove("hystmodal--active")
    document.getElementsByClassName("hystmodal__shadow")[0].classList.remove("hystmodal__shadow--show")
    document.querySelector("body").classList.remove("modal-open")
}