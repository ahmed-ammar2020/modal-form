"use strict";
let htmlForm = `<form name="message-form"><p class="message-paragraph">Enter your message here...</p><div class="message-container"><input type="text" name="message" /></div> <button type="submit">OK</button> <button type="button" name="cancel-btn">Cancel</button></form>`;
const layer = document.querySelector(".layer");
const showBtn = document.querySelector(".show-form");

function showPrompt(html, callback) {
  layer.insertAdjacentHTML("afterbegin", html);
  layer.classList.remove("hide");
  document.body.style.overflow = "hidden";
  // from here the form is in the DOM, so you can access elements
  const form = document.forms["message-form"];
  const input = form.elements.message;
  const cancelBtn = form.elements["cancel-btn"];
  input.focus();
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (input.value == "") return;
    callback(input.value);
    input.value = "";
    layer.classList.add("hide");
    form.remove();
    document.body.style.overflow = "";
  });
  cancelBtn.addEventListener("click", function (event) {
    callback(null);
    input.value = "";
    layer.classList.add("hide");
    form.remove();
    document.body.style.overflow = "";
  });
  document.addEventListener("keydown", function (event) {
    if (event.code !== "Escape") return;
    callback(null);
    input.value = "";
    layer.classList.add("hide");
    form.remove();
    document.body.style.overflow = "";
  });
}

showBtn.addEventListener("click", function () {
  showPrompt(htmlForm, (value) => alert(value));
});
