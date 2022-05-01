function component() {
    const element = document.createElement('div');
    element.textContent = 'Hello webpack C';

    return element;
}

document.body.appendChild(component());