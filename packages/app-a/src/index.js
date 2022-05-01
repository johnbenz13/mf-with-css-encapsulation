function component() {
    const element = document.createElement('div');
    element.textContent = 'Hello webpack';

    return element;
}

document.body.appendChild(component());