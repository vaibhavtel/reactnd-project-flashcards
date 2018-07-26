## Instructions
* brew install yarn
* Install latest version of node(9.5.0), npm(5.6.0) and yarn(1.5.1)
* Set up Expo XDE by following the instructions [here](https://docs.expo.io/versions/latest/introduction/installation.html)
* Install dependencies
 ```bash
    yarn
```
* [Up and running Instructions](https://docs.expo.io/versions/latest/guides/up-and-running.html)

## Debugging Javascript
* Change your host type in XDE to LAN or localhost. Also ensure that Development Mode is checked.
![alt text](https://docs.expo.io/static/0af875d134c9a8835b71baaa0e1791bc-8f082.png)
* Open the app and press `cmd + d` to open developer menu then tap on Debug JS Remotely. This should open up a Chrome tab with the URL http://localhost:19001/debugger-ui.
* Enable Hot Reloading and Live Reloading by tapping on `Enable Hot Reloading` in developer menu.
