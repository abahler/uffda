// Included in index.html, which loads jquery
$(document).ready( () => {
    let socket = io();  // Create a Manager object
    let input = $('input');
    let messages = $('#messages');
    let userList = $('#userList');
    let userCount = $('#userCount');

    let addMessage = (message) => {
        messages.append('<div>' + message + '</div>');
    };
    
    let showUserCount = (u) => {
        userCount.html(u);
    };
    
    let showUserList = (list) => {
        let listHTML = '';
        list.forEach( (v, i) => {
            listHTML += '<li>' + v + '</li>';
        });
        userList.html(listHTML);
    };

    input.on('keydown', (event) => {
        if (event.keyCode != 13) {
            return; // Returns undefined, as opposed to `return false`
        }

        let message = input.val();
        // Let users set nickname with string formatted like so "My name is: Alex"
        // Don't print that special 'setter' message, but show any others
        if (message.indexOf('My nickname is: ') === 0) {
            console.log('we have got a nickname setter!');
            let result = message.match(/\s(\w+)$/);
            let nickname = result[1];
            socket.emit('newNickname', nickname);
        } else {
            addMessage(message);
            socket.emit('message', message);    // First arg is a name for our message. We'll keep it simple.
        }
        input.val('');  // Clear input field, no matter what type of message was entered.
    });
    
    socket.on('message', addMessage);   // When the server sends us a message with the name 'message', 
                                        // we add the attached data to the proper div via addMessage
    
    socket.on('updateNumUsers', showUserCount);
    
    socket.on('updateUserList', showUserList);
});
