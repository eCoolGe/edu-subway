import '../css/style.css';

import data from '../assets/data.json'
export const storage = data
export const menu = data.menu

export let cart = []

import {pageContentRender} from "./pageContentRender";

const navbar = document.querySelector(".navbar")
Array.from(navbar.children)
    .forEach(elem => elem.addEventListener('click', ({target}) => pageContentRender(target)))

setTimeout(() => pageContentRender(document.getElementById("sandwiches")), 200)
