const JSON_PATH = "../assets/data.json";
let storage, menu;
let cart = [];

const getJSON = async (url) => {
    let response = await fetch(url)

    if (response.ok) {
        return await response.json()
    } else {
        alert("[Error]  URL: " + url + " | HTTP: " + response.status)
        return response.status
    }
}

getJSON(JSON_PATH).then(data => {
    storage = data
    menu = data.menu
    pageContentRender(document.getElementById("sandwiches"))
})
