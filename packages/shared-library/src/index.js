export const Button = function() {
    const btn = document.createElement('button');
    btn.innerHTML = 'Button from shared library';

    return btn;
}