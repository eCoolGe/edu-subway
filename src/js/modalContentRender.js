const modalContentOpen = (target) => {
    document.addEventListener('mousedown', function (e) {
        /**
         * Проверяем было ли нажатие над .hystmodal__wrap,
         * и отмечаем это в свойстве this._overlayChecker
         */
        if (!e.target.classList.contains('hystmodal__wrap')) return;
        this._overlayChecker = true;
    }.bind(this));

    document.addEventListener('mouseup', function (e) {
        /**
         * Проверяем было ли отпускание мыши над .hystmodal__wrap,
         * и если нажатие тоже было на нём, то закрываем окно
         * и обнуляем this._overlayChecker в любом случае
         */
        if (this._overlayChecker && e.target.classList.contains('hystmodal__wrap')) {
            e.preventDefault();
            modalContentClose()
            return;
        }
        this._overlayChecker = false;
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

    const modalContentRender = (pageInterval) => {
        const productsList = document.querySelector(".hystmodal__product-list")
        const header = document.querySelector(".hystmodal__header span")
        let activeLi = document.getElementsByClassName('active')[0]
        ul.children[ulChildren.indexOf(activeLi)].classList.remove('active')
        ul.children[ulChildren.indexOf(activeLi) + pageInterval].classList.add('active')
        modalButtonRender()

        activeLi = document.getElementsByClassName('active')[0]
        let itemsData = storage[activeLi.id]

        switch (activeLi.id) {
            case "sizes":
                header.innerHTML = "Выберите размер сендвича"
                break;
            case "breads":
                header.innerHTML = "Хлеб для сендвича на выбор"
                break;
            case "vegetables":
                header.innerHTML = "Дополнительные овощи бесплатно"
                break;
            case "sauces":
                header.innerHTML = "Выберите 3 бесплатных соуса по вкусу"
                break;
            case "fillings":
                header.innerHTML = "Добавьте начинку по вкусу"
                break;
            case "finally":
                header.innerHTML = "Проверьте и добавьте в корзину"
                break;

        }

        productsList.innerHTML = ""

        console.log(itemsData)

        if (activeLi.id !== "finally") {
            for (let item in itemsData) {
                productsList.innerHTML +=
                    `
                    <article class="hystmodal__item">
                        <div class="hystmodal__item__outer-circle">
                            <div class="hystmodal__item__inner-circle">
                                <img src="${itemsData[item].image}" alt="">
                            </div>
                        </div>
                        <div class="hystmodal__item__name">
                            <p>${itemsData[item].name}</p>
                        </div>
                        <p class="hystmodal__item__price">Цена: <span>${itemsData[item].price}</span> ₽</p>
                    </article>
                `
            }
        }
    }


    const ul = document.querySelector(".hystmodal__stages")
    const btns = document.querySelector(".hystmodal__stages-buttons").children
    const ulChildren = Array.prototype.slice.call(ul.children)
    const item = target.parentElement.parentElement
    const price = item.getElementsByClassName('item__price')[0].getElementsByTagName('span')[0].textContent
    console.log(price)


    modalButtonRender()
    modalContentRender(0)
    btns[0].addEventListener('click', () => modalContentRender(-1))
    btns[1].addEventListener('click', () => modalContentRender(1))


    document.getElementsByClassName("hystmodal")[0].classList.add("hystmodal--active")
    document.getElementsByClassName("hystmodal__shadow")[0].classList.add("hystmodal__shadow--show")
    document.querySelector("body").classList.add("modal-open")
}

const modalContentClose = () => {
    document.getElementsByClassName("hystmodal")[0].classList.remove("hystmodal--active")
    document.getElementsByClassName("hystmodal__shadow")[0].classList.remove("hystmodal__shadow--show")
    document.querySelector("body").classList.remove("modal-open")
}

