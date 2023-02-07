const JSON_PATH = "../src/assets/data.json";
let storage, menu;
let cart = [];

const getJSON = async (url) => {
    const response = await fetch(url)

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
