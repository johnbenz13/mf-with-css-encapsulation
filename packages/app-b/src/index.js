import { Button } from '@johnbenz13/shared-library';
import styles from './index.css';

function component() {
    const element = document.createElement('div');
    element.textContent = 'Application B \n';
    const myButton = Button();
    myButton.setAttribute('class', styles.myButton);
    element.appendChild(myButton);
    element.setAttribute('class', styles.container);

    return element;
}

document.body.appendChild(component());