const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA

// This event is fired when the browser is ready to prompt the user to install the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the immediate prompt display
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
});

// This event is fired when the user clicks on the install button of the PWA
butInstall.addEventListener('click', async () => {
    if (!deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Check if the user accepted the prompt
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        
        // Clear the saved prompt since it can't be used again
        deferredPrompt = null;
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App successfully installed');
});
