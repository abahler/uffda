$(document).ready( () => {
    let socket = io();  // Create a Manager object
    let input = $('input');
    let messages = $('#messages');

    let addMessage = (message) => {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', (event) => {
        if (event.keyCode != 13) {
            return;
        }

        let message = input.val();
        addMessage(message);
        socket.emit('message', message);    // First arg is a name for our message. We'll keep it simple.
        input.val('');
    });
});