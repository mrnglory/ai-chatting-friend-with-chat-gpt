import bot from "./assets/bot.svg"
import user from "./assets/user.svg"


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


const submit_handler = async (e) => {
    e.preventDefault();

    const data = new FormData(form);


    // user's chat message
    chat_container.innerHTML += message_divider(false, data.get("prompt"));

    form.reset();


    // bot's chat message
    const unique_id = generate_unique_id();
    chat_container.innerHTML += message_divider(true, " ", unique_id);

    chat_container.scrollTop = chat_container.scrollHeight;

    const message_div = document.getElementById(unique_id);

    message_loader(message_div);
}


form.addEventListener("submit", submit_handler);
form.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        submit_handler(e);
    }
})
