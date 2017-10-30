function errorNotify(title, message, position) {

    iziToast.show({
        position:  position? position : 'topRight',
        title: title,
        message: message,
        color: '#E14A45',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
        progressBarColor: '#fff',
    });
}

function successNotify(title, message, position) {

    iziToast.show({
        position: position ? position : 'topRight',
        title: title,
        message: message,
        color: '#00A369',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
        progressBarColor: '#fff',
    });
}

function warningNotify(title, message, position) {

    iziToast.show({
        position: position? position : 'topRight',
        title: title,
        message: message,
        color: '#FFCC5F',
        titleColor: '#383938',
        messageColor: '#383938',
        iconColor: '#383938',
        progressBarColor: '#383938',
    });
}

function infoNotify(title, message, position) {

    iziToast.show({
        position:  position? position : 'topRight',
        title: title,
        message: message,
        color: '#488FEE',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
        progressBarColor: '#fff',
    });
}
