import { Button } from '@johnbenz13/shared-library';
import styles from './Container.css';

export const Container = function () {

    import('appB/Container')
    .then(result => {
        console.log('Imported from AppB', result);
    });

    console.log('styles are', styles);
    const element = document.createElement('div');
    element.textContent = 'Application A \n';
    const myButton = Button();
    myButton.setAttribute('class', styles.myButton);
    element.appendChild(myButton);
    element.setAttribute('class', styles.container);

    return element;
}