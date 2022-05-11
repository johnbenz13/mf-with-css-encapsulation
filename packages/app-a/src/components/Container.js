import { Button } from "@johnbenz13/shared-library";
import { style, classes } from "./Container.st.css";

export const Container = async function () {
  const element = document.createElement("div");
  element.textContent = "Application A \n";
  const myButton = Button();
  element.appendChild(myButton);
  element.setAttribute("class", style(classes.root));

  return element;
};
