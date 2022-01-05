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
                    err.innerText = 'Not working, please use VPN to login.';
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
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //pwa prompt
        let deferredPrompt;
        var installPrompt = document.querySelector('.install');
        var buttonInstall = document.getElementById('install-add');
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI notify the user they can install the PWA
            installPrompt.style.display = 'block';
        });
        buttonInstall.addEventListener('click', (e) => {
            // Hide the app provided install promotion
            installPrompt.remove();
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
            });
        });
        window.addEventListener('appinstalled', (evt) => {
            gtag('event', 'appInstall');
            setTimeout(function () {
                alert("The Hyper Community app has been installed successfully. Now you can access it via homescreen and also runs offline.");
            }, 7000);
        });
    }
});