/**
 * Inserts a string of HTML into the DOM.
 * @param {string} htmlString - The HTML to insert.
 * @returns {HTMLElement} The newly inserted DOM element.
 */
const mountDOM = (htmlString = "") => {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  document.body.appendChild(div);

  return div;
};

const cleanupDOM = () => {
  document.body.innerHTML = "";
};

export { cleanupDOM, mountDOM };
