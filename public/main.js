// Included in index.html, which loads jquery
$(document).ready( () => {
    let socket = io();  // Create a Manager object
    let input = $('input');
    let messages = $('#messages');
    let usersOnline = $('#usersOnline');

    let addMessage = (message) => {
        messages.append('<div>' + message + '</div>');
    };
    
    let showUserCount = (u) => {
        console.log('The showUserCount function is being called!');
        console.log('u: ', u);          // Are we even getting anything?
        // users.forEach( (v, i) => {
        //     usersOnline.append('<li>' + v + '</li>');    
        // });
        
    };

    input.on('keydown', (event) => {
        if (event.keyCode != 13) {
            return; // Returns undefined, as opposed to `return false`
        }

        let message = input.val();
        addMessage(message);
        socket.emit('message', message);    // First arg is a name for our message. We'll keep it simple.
        input.val('');
    });
    
    socket.on('message', addMessage);   // When the server sends us a message with the name 'message', 
                                        // we add the attached data to the proper div via addMessage
    
    socket.on('updateNumUsers', showUserCount);
});
