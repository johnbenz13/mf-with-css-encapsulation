async function run() {
    const { Container } = await import('./components/Container');
    const container = Container();
    document.body.appendChild(container);
}

run();