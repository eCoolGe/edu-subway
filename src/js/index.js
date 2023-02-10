import '../css/style.css';

import data from '../assets/data.json'
export const storage = data
export const menu = data.menu

export let cart = []

import {pageContentRender} from "./pageContentRender";
import {modalContentClose} from "./modalContentRender";

document.getElementById('pizza').addEventListener('click', (e) => pageContentRender(e.target))
document.getElementById('shaurma').addEventListener('click', (e) => pageContentRender(e.target))
document.getElementById('sandwiches').addEventListener('click', (e) => pageContentRender(e.target))
document.getElementById('burgers').addEventListener('click', (e) => pageContentRender(e.target))
document.getElementById('chicken').addEventListener('click', (e) => pageContentRender(e.target))
document.getElementById('salads').addEventListener('click', (e) => pageContentRender(e.target))
document.getElementById('drinks').addEventListener('click', (e) => pageContentRender(e.target))

document.getElementsByClassName('hystmodal__close')[0].addEventListener('click', () => modalContentClose())

setTimeout(() => pageContentRender(document.getElementById("sandwiches")), 200)
