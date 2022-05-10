import { Button } from '@johnbenz13/shared-library';
import { style, classes } from './Container.st.css';

export const Container = function () {

    // import('appB/Container')
    // .then(result => {
    //     console.log('Imported from AppB', result);
    // });

    console.log('AppA Container Classes', classes);

    const element = document.createElement('div');
    element.textContent = 'Application A \n';
    // const myButton = Button({className: style(classes['orange-colored-button'])});
    const myButton = Button();
    element.appendChild(myButton);
    element.setAttribute('class', style(classes.root));

    return element;
}