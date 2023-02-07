const JSON_PATH = "../assets/data.json";

const getJSON = async (url) => {
    let response = await fetch(url)

    if (response.ok) {
        return await response.json()
    } else {
        alert("[Error]  URL: " + url + " | HTTP: " + response.status)
        return response.status
    }
}
