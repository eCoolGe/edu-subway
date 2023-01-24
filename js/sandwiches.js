fetch("../assets/data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data.menu);
        for (let i = 0; i < data.menu.length; i++) {
            if (data.menu[i].category === "sandwiches") {
                document.querySelector(".product-list").innerHTML +=
                    `
                        <article class="item">
                            <img class="item__shop-logo" src="${data.markets.subway.image}" alt="">
                            <div class="item__outer-circle">
                                <div class="item__inner-circle">
                                    <img src="${data.menu[i].image}" alt="">
                                </div>
                            </div>
                            <p class="item__name">${data.menu[i].name}</p>
                            <div class="item__desc">
                                <p>${data.menu[i].description}</p>
                            </div>
                            <p class="item__price">Цена: ${data.menu[i].price} ₽</p>
                            <div class="item__counter-block">
                                <p>КОЛИЧЕСТВО</p>
                                <div class="counter-block__counter">
                                    <span class="counter__minus">—</span>
                                    <label>
                                        <input type="text" value="1"/>
                                    </label>
                                    <span class="counter__plus">+</span>
                                </div>
                                <button>В КОРЗИНУ</button>
                            </div>
                        </article>
                    `;
            }
        }
    })
