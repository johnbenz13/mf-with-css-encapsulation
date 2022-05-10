import { style, classes } from './Button.st.css';

export const Button = function({className} = {}) {
    console.log('Button Component Classes', classes);

    const btn = document.createElement('button');
    btn.innerHTML = 'Button from shared library';
    btn.setAttribute('class', style(classes.root, classes['colored-button'], className));

    return btn;
}