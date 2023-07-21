document.getElementById('divChatName').innerHTML = friendName;
        document.getElementById('imgChat').src = friendPhoto;

        document.getElementById('messages').innerHTML = '';

        document.getElementById('txtMessage').value = '';
        document.getElementById('txtMessage').focus();

function ChooseImage() {
    document.getElementById('imageFile').click();
}

function SendImage(event) {
    var file = event.files[0];

    if (!file.type.match("image.*")) {
        alert("Please select image only.");
    }
    else {
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            var chatMessage = {
                userId: currentUserKey,
                msg: reader.result,
                msgType: 'image',
                dateTime: new Date().toLocaleString()
            };

            firebase.database().ref('chatMessages').child(chatKey).push(chatMessage, function (error) {
                if (error) alert(error);
                else {

                    document.getElementById('txtMessage').value = '';
                    document.getElementById('txtMessage').focus();
                }
            });
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}