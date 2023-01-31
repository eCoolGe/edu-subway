const counterIncrement = (target) => {
    let counter = target.parentElement.getElementsByTagName('input')[0];
    counter.innerHTML = counter.value++;
}

const counterDecrement = (target) => {
    let counter = target.parentElement.getElementsByTagName('input')[0];
    if (counter.value > 1) {
        counter.innerHTML = counter.value--;
    }
}

const counterChange = (target) => {
    let counter = target.parentElement.getElementsByTagName('input')[0];
    counter.value = counter.value.replace(/[^\d.]/g, '');

    if (counter.value < 1) {
        counter.value = '1';
    }
}