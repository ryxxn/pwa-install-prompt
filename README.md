# Easily Add a PWA Installation Popup with Just One Script!

`pwa-install-prompt` is a script that provides a user-friendly modal for installing Progressive Web Apps (PWAs). When the URL contains the hash `#wepp-install-modal`, the installation modal appears. For iOS users, installation instructions are shown instead of the installation button.


## Installation
To use the script, simply add the following `<script>` tag to your HTML file:

```javascript
<script async id="weppstore-install-script" src="https://cdn.jsdelivr.net/gh/ryxxn/pwa-install-prompt@main/index.js"></script>
```

- For Korean
```javascript
<script async id="weppstore-install-script" src="https://cdn.jsdelivr.net/gh/ryxxn/pwa-install-prompt@main/ko/index.js"></script>
```


## Usage
1. When the URL contains the hash #wepp-install-modal, the installation modal will automatically be displayed.
2. For iOS users, instead of an install button, the modal will show instructions on how to add the app to the home screen.
3. If the install button is clicked, the PWA install prompt will appear, allowing the user to install or dismiss it.


## Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PWA Install Prompt</title>
    <script async id="weppstore-install-script" src="https://cdn.jsdelivr.net/gh/ryxxn/pwa-install-prompt@main/index.js"></script>
</head>
<body>
    <h1>Welcome to My PWA</h1>
</body>
</html>
```


## Features
- PWA Install Modal: Provides a modal for installing the PWA, detecting the `beforeinstallprompt` event, and allowing users to proceed with the installation.
- iOS Support: For iOS users, the modal displays instructions on how to manually add the app to the home screen instead of showing an install button.
- Hash Detection: The modal is displayed only when the URL contains the hash `#wepp-install-modal`.


## iOS PWA Installation Instructions
On iOS devices, where automatic PWA installation is not supported, the modal displays instructions to guide users on how to add the app to the home screen using Safari's "Add to Home Screen" feature.
