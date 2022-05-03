import { style, classes } from './Button.st.css';

export const Button = function({className} = {}) {
    const btn = document.createElement('button');
    btn.innerHTML = 'Button from shared library';
    btn.setAttribute('class', style(classes.root, className));

    return btn;
}