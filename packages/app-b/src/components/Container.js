import { Button } from '@johnbenz13/shared-library';
import styles from './Container.css';

export const Container = function component() {
    const element = document.createElement('div');
    element.textContent = 'Application B \n';
    const myButton = Button();
    element.appendChild(myButton);
    element.setAttribute('class', styles.container);

    return element;
}