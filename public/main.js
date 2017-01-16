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
    
    socket.on('message', addMessage);   // When the server sends us a message with the name 'message', 
                                        // we add the attached data to the proper div via addMessage
});
