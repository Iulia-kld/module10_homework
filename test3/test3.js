//Задание 3.
//Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
//Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
//При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
//Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:


const messageInput = document.querySelector('.basic-input');
const sendBtn = document.getElementById('chatBtn');
const geolocationBtn = document.getElementById('glBtn');
const dialogContainer = document.querySelector('.dialog-wrapper');

const wsUrl = "wss://echo-ws-service.herokuapp.com";
let websocket;

window.onload = function() {
    websocket = new WebSocket(wsUrl);

    websocket.onerror = function(evt) {
        printMessage('Произошла ошибка ' +evt.data, "error");
    };

    websocket.onmessage = function(evt) {
        if (evt.data.indexOf('gl-ref') != - 1) {
            return;
        }
        printMessage(evt.data, 'server');
    };
};

sendBtn.addEventListener('click', () => {
    let message = messageInput.value;
    printMessage(message, "client");
    messageInput.value = "";

    websocket.send(message);
});

messageInput.addEventListener('keyup', () => {
    if (Event.key=='Enter') {
        let message = messageInput.value;

        printMessage(message, "client");
        messageInput.value = "";

        websocket.send(message);
    }
});

geolocationBtn.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            let mapHref = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
            let mapText = "Гео-локация";
            let message = `<a class="gl-ref" href="${mapHref}">${mapText}</a>`;

            printMessage(message, "client");

            websocket.send(message);
        });
    } else {
        printMessage("Местоположение недоступно", "error");     
    };
});

window.onbeforeunload = function() {
    websocket.close();
};

function printMessage(message, type) {
    dialogContainer.innerHTML+=`<div class="${type} message">${message}</div>`;
};