import { Button } from "@johnbenz13/shared-library";
import { classes } from "./Container.st.css";

export const Container = function component() {
  const element = document.createElement("div");
  element.textContent = "Application B \n";
  const myButton = Button();
  element.appendChild(myButton);
  element.setAttribute("class", classes.root);

  return element;
};
