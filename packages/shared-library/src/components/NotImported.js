export const NotImported = function() {

    const div = document.createElement('div');
    div.innerHTML = 'Button from shared library';

    return div;
}