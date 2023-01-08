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

function generate_unique_id() {
    const timestamp = Date.now();
    const random_number = Math.random();
    const hexadecimal_string = random_number.toString(16);

    return `id-${timestamp}-${hexadecimal_string}`;
}

function message_divider (is_ai, value, unique_id) {
    return (
        `
        <div class="wrapper ${is_ai && "ai"}">
            <div class="chat">
                <div className="profile">
                    <img 
                        src="${is_ai ? bot : user}"
                        alt="${is_ai ? 'bot' : 'user'}"
                    >
                </div>
                <div class="message" id=${unique_id}>${value}</div>
            </div>
        </div>
        `
    )
}
