function component() {
    const element = document.createElement('div');
    element.textContent = 'Hello webpack B';

    return element;
}

document.body.appendChild(component());