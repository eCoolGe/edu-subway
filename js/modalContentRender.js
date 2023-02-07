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

        let activeLi = document.getElementsByClassName('active')[0]
        ul.children[ulChildren.indexOf(activeLi)].classList.remove('active')
        ul.children[ulChildren.indexOf(activeLi) + pageInterval].classList.add('active')
        modalButtonRender()

        getJSON(JSON_PATH).then(data => {
            let productsList = document.querySelector(".hystmodal__product-list")

            productsList.innerHTML = ""

            console.log(data.sizes)

            for (let i = 0; i < data.sizes.length; i++) {
                productsList.innerHTML += data.sizes[i].name
            }
        })
    }

    let ul = document.querySelector(".hystmodal__stages")
    let btns = document.querySelector(".hystmodal__stages-buttons").children
    let ulChildren = Array.prototype.slice.call(ul.children)
    let item = target.parentElement.parentElement
    let price = item.getElementsByClassName('item__price')[0].getElementsByTagName('span')[0].textContent
    console.log(price)

    modalButtonRender()
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

