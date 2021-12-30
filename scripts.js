var checkBtn = document.getElementById("check-btn"),
    checkFlag = false,
    err = document.getElementById("err");
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
function getStatus(url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            checkBtn.classList.remove('loading');
            checkBtn.innerText = 'CHECK NOW';
            if (request.status == 200) {
                if (request.response == 'Frequent requests, please try again later') {
                    err.innerText = 'Sorry, please use VPN to login.';
                    err.style.display = 'block';
                } else {
                    window.location.replace("https://h5.thehyperverse.net");
                }
            } else {
                err.innerText = 'Try again.';
                err.style.display = 'block';
            }
        }
    };
    request.open("GET", url, true);
    request.send();
}
docReady(function () {
    checkBtn.addEventListener('click', function () {
        err.style.display = 'none';
        checkBtn.classList.add('loading');
        checkBtn.innerText = 'PLEASE WAIT...';
        getStatus('https://api.thehyperverse.net/api/getSwitchByName?switchType=login&uname=bikash');
    });
});