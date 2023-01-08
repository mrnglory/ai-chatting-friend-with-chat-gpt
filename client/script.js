import bot from "./assets/bot.svg"
import user from ".assets/user.svg"


const form = document.querySelector("form");
const chat_container = document.querySelector("#chat-container");

let load_interval;


function message_loader(element) {
    element.textContent = "";

    load_interval = setInterval(() => {
        element.textContent += ".";

        if (element.textContent === "....") {
            element.textContent = "";
        }
    }, 300)
}

function type_text(element, text) {
    let index = 0;

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.chartAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20)
}

