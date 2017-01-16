$(document).ready( () => {
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
        input.val('');
    });
});