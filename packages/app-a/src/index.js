import { Button } from '@johnbenz13/shared-library';

function component() {
    const element = document.createElement('div');
    element.textContent = 'Application A \n';
    element.appendChild(Button());

    return element;
}

document.body.appendChild(component());