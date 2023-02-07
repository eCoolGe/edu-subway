const counterIncrement = (target) => {
    const counter = getCounterElement(target)
    counter.innerHTML = counter.value++;
}

const counterDecrement = (target) => {
    const counter = getCounterElement(target)
    if (counter.value > 1) {
        counter.innerHTML = counter.value--;
    }
}

const counterChange = (target) => {
    const counter = getCounterElement(target)
    counter.value = counter.value.replace(/[^\d.]/g, '');

    if (counter.value < 1) {
        counter.value = '1';
    }
}

const getCounterElement = (target) => {
    return target.parentElement.getElementsByTagName('input')[0];
}