import {menu, storage} from "./index";
import {counterChange, counterDecrement, counterIncrement} from "./counter";
import {cartAdd} from "./cart";

export const modalOpenOrCartRemove = (target) => {
    if (!target.classList.contains("active"))
        modalOpen(target)
    else
        cartAdd(target)
}

const modalOpen = (target) => {
    let overlayChecker = false;

    const modalElement = document.querySelector(".hystmodal__wrap")
    const modalContentDictionary = [
        {id: "size", headerText: "Выберите размер сендвича", selectLimit: 1},
        {id: "bread", headerText: "Хлеб для сендвича на выбор", selectLimit: 1},
        {id: "vegetable", headerText: "Дополнительные овощи бесплатно", selectLimit: 99},
        {id: "sauce", headerText: "Выберите 3 бесплатных соуса по вкусу", selectLimit: 3},
        {id: "filling", headerText: "Добавьте начинку по вкусу", selectLimit: 99},
        {id: "finally", headerText: "Проверьте и добавьте в корзину", selectLimit: 0}
    ]
    const itemElement = target.parentElement.parentElement
    const itemName = itemElement.getElementsByClassName('item__name')[0].children[0].textContent
    const counterInputElement = itemElement.getElementsByClassName('counter-block__counter')[0].getElementsByTagName('input')[0]
    const itemMenuIndex = menu.findIndex(item => item.name === itemName)
    const itemPrice = menu[itemMenuIndex].price
    const itemImage = menu[itemMenuIndex].image

    const cartComponents = structuredClone(menu[itemMenuIndex].components)

    document.addEventListener('mousedown', function (e) {
        if (!e.target.classList.contains('hystmodal__wrap')) return;
        overlayChecker = true;
    }.bind(this));

    document.addEventListener('mouseup', function (e) {
        if (overlayChecker && e.target.classList.contains('hystmodal__wrap')) {
            e.preventDefault();
            modalClose()
            return;
        }
        overlayChecker = false;
    }.bind(this));

    const modalContent = (pageId = 0) => {
        const itemSelected = (targetItemElement, selectLimit) => {
            while (!targetItemElement.classList.contains("hystmodal__item"))
                targetItemElement = targetItemElement.parentElement

            if (selectLimit === 1) {
                cartComponents[pageTextId] = targetItemElement.id

            } else {
                const itemCartIndex = cartComponents[pageTextId].findIndex(elem => elem === targetItemElement.id)

                if (cartComponents[pageTextId].length < selectLimit && itemCartIndex === -1)
                    cartComponents[pageTextId].push(targetItemElement.id)
                else if (itemCartIndex !== -1)
                    cartComponents[pageTextId].splice(itemCartIndex, 1)
            }
            modalContent(pageId)
        }

        const calculateCartPrice = (startPrice) => {
            let calculatedPrice = startPrice
            for (let component in cartComponents) {
                const itemValue = cartComponents[component]
                const storageValues = storage[`${component}s`]

                if (!Array.isArray(itemValue))
                    calculatedPrice += storageValues[itemValue].price
                else {
                    itemValue.forEach(elem => calculatedPrice += storageValues[elem].price)
                }
            }
            return calculatedPrice
        }

        const cartIdToText = () => {
            const obj = {}
            for (let component in cartComponents) {
                const itemValue = cartComponents[component]
                const storageValues = storage[`${component}s`]
                console.log(component)

                if (!Array.isArray(itemValue))
                    obj[component] = storageValues[itemValue].name
                else {
                    obj[component] = []
                    itemValue.forEach(elem => obj[component].push(storageValues[elem].name))
                    if (obj[component].length === 0)
                        obj[component] = ["Нет"]
                }
            }
            return obj
        }

        const headerText = modalContentDictionary[pageId]["headerText"]
        const backButtonVisible = pageId === 0 ? "hidden" : ""
        const nextButtonVisible = pageId === modalContentDictionary.length - 1 ? "hidden" : ""
        const pageTextId = modalContentDictionary[pageId]["id"]

        if (pageId !== modalContentDictionary.length - 1) {
            modalElement.innerHTML =
                `
                    <div class="hystmodal__window" role="dialog" aria-modal="true">
                        <div class="hystmodal__header">
                            <span>${headerText}</span>
                            <button id="modalClose" class="hystmodal__close"></button>
                        </div>
                        <div class="hystmodal__middle">
                            <ul class="hystmodal__stages">
                                <li id="size">Размер</li>
                                <li id="bread">Хлеб</li>
                                <li id="vegetable">Овощи</li>
                                <li id="sauce">Соусы</li>
                                <li id="filling">Начинка</li>
                                <li id="finally">Готово!</li>
                            </ul>
                            <div class="hystmodal__stages-buttons">
                                <button id="backButton" class="noselect ${backButtonVisible}">< НАЗАД</button>
                                <button id="nextButton" class="noselect ${nextButtonVisible}">ВПЕРЕД ></button>
                            </div>
                            <div class="hystmodal__product-list"></div>
                        </div>
                        <div class="hystmodal__footer">
                            Итого: <span id="finallyPrice">0</span> ₽
                        </div>
                    </div>
                    <div class="hystmodal__plug noselect">●</div>
                `

            const productsListElement = document.querySelector(".hystmodal__product-list")
            const itemsData = storage[`${pageTextId}s`]

            for (let item in itemsData) {
                const sizePrice = pageId === 0 ? itemsData[item].price + itemPrice : itemsData[item].price

                let itemClassSelected = "";
                if (!Array.isArray(cartComponents[pageTextId]) && item === cartComponents[pageTextId] ||
                    Array.isArray(cartComponents[pageTextId]) && cartComponents[pageTextId].includes(item)) {
                    itemClassSelected = `hystmodal_selected`

                }

                productsListElement.innerHTML +=
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
                            <p class="hystmodal__item__price">Цена: <span>${sizePrice}</span> ₽</p>
                        </article>
                    `
            }
        } else {
            const cartTextComponents = cartIdToText()


            

            modalElement.innerHTML =
                `
                    <div class="hystmodal__window" role="dialog" aria-modal="true">
                        <div class="hystmodal__header">
                            <span>${headerText}</span>
                            <button id="modalClose" class="hystmodal__close"></button>
                        </div>
                        <div class="hystmodal__middle">
                            <ul class="hystmodal__stages">
                                <li id="size">Размер</li>
                                <li id="bread">Хлеб</li>
                                <li id="vegetable">Овощи</li>
                                <li id="sauce">Соусы</li>
                                <li id="filling">Начинка</li>
                                <li id="finally">Готово!</li>
                            </ul>
                            <div class="hystmodal__stages-buttons">
                                <button id="backButton" class="noselect ${backButtonVisible}">< НАЗАД</button>
                                <button id="nextButton" class="noselect ${nextButtonVisible}">ВПЕРЕД ></button>
                            </div>
                            <div class="hystmodal__product-list"></div>
                            
                            <div class="hystmodal__finally">
                                <div class="hystmodal__finally__image">
                                    <div class="hystmodal__item__outer-circle">
                                            <div class="hystmodal__item__inner-circle">
                                                <img src=${require(`../assets${itemImage}`)} alt="">
                                            </div>
                                    </div>
                                </div>
                                <div class="hystmodal__finally__text">
                                    <p class="hystmodal__finally__text__upper">Ваш сендвич готов!</p>
                                        <div>
                                            <p>Размер: ${cartTextComponents['size']}</p>
                                            <p>Хлеб: ${cartTextComponents['bread']}</p>
                                            <p>Овощи: ${cartTextComponents['vegetable']}</p>
                                            <p>Соусы: ${cartTextComponents['sauce']}</p>
                                            <p>Начинка: ${cartTextComponents['filling']}</p>
                                        </div>
                                    <p>${itemName}</p>
                                </div>
                            </div>
                        </div>
                        <div class="hystmodal__footer">
                            <div class="item__counter-block noselect">
                                <p>КОЛИЧЕСТВО</p>
                                <div class="counter-block__counter">
                                    <span id="modalCounterMinus" class="counter__minus">—</span>
                                    <label>
                                        <input class="counter__input" id="modalCounterInput" type="text" value="${counterInputElement.value}"/>
                                    </label>
                                    <span id="modalCounterPlus" class="counter__plus">+</span>
                                </div>
                            </div>
                        
                        
                            Итого: <span id="finallyPrice">0</span> ₽
                            
                            <button id="modalCartButton" class="item__button">В КОРЗИНУ</button>
                        </div>
                    </div>
                    <div class="hystmodal__plug noselect">●</div>
                `

            const counterInputModalElement = document.getElementById("modalCounterInput");

            document.getElementById("modalCounterMinus")
                .addEventListener('click', (e) => counterDecrement(e.target))
            document.getElementById("modalCounterInput")
                .addEventListener('input', (e) => counterChange(e.target))
            document.getElementById("modalCounterPlus")
                .addEventListener('click', (e) => counterIncrement(e.target))
            document.getElementById("modalCartButton")
                .addEventListener('click', (e) =>
                {
                    const itemCount = counterInputModalElement.value;
                    cartAdd(target, itemCount, calculateCartPrice(itemPrice))
                    modalClose()
                })
        }

        const finallyPriceElement = document.querySelector("#finallyPrice")
        finallyPriceElement.innerHTML = calculateCartPrice(itemPrice)

        document.querySelectorAll(".hystmodal__item").forEach(elem => elem
            .addEventListener('click', ({target}) =>
                itemSelected(target, modalContentDictionary[pageId]["selectLimit"])))
        document.getElementsByClassName("hystmodal__stages")[0].children[pageId].classList.add("active")
        document.getElementById("modalClose").addEventListener('click', () => modalClose())
        document.getElementById("backButton").addEventListener('click', () => modalContent(pageId - 1))
        document.getElementById("nextButton").addEventListener('click', () => modalContent(pageId + 1))
    }

    modalContent()

    document.getElementsByClassName("hystmodal")[0].classList.add("hystmodal--active")
    document.getElementsByClassName("hystmodal__shadow")[0].classList.add("hystmodal__shadow--show")
    document.querySelector("body").classList.add("modal-open")

    const modalClose = () => {
        document.getElementsByClassName("hystmodal")[0].classList.remove("hystmodal--active")
        document.getElementsByClassName("hystmodal__shadow")[0].classList.remove("hystmodal__shadow--show")
        document.querySelector("body").classList.remove("modal-open")
        modalElement.innerHTML = ""
    }
}


