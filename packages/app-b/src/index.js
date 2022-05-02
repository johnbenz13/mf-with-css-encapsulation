async function run() {
    const { Container } = await import('./components/Container');
    document.body.appendChild(Container());
}

run();