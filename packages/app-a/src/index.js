async function run() {
  await import("appB/Container").then((result) => {
    console.log("Imported from AppB", result);
  });

  const { Container } = await import("./components/Container");
  document.body.appendChild(await Container());
}

run();
