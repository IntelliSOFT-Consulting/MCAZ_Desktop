# MCAZ Desktop

This project is based on Electron.

For a quick start run

```bash
# Clone this repository
git clone https://github.com/IntelliSOFT-Consulting/MCAZ_Desktop
# Change directory to the application directory
  cd MCAZ_Desktop
# Install dependencies
  npm install
# Build the js files
  npm run build
#On a separate tab run the app
  npm start
```

This will run the application.

To build and run the application

```bash
# Clone this repository
  git clone https://github.com/IntelliSOFT-Consulting/MCAZ_Desktop
# Change directory to the application directory
  cd MCAZ_Desktop
# Install dependencies
  npm install
# Build the js files
  npm run build
#Build packages
  #Windows
  npm run package-win
  #Mac
  npm run package-mac
  #Linux
  npm run package-linux
#Create Installer (*Windows) 
  npm run create-installer-win
```

The packages can be found in the release-builds folder, the installer app for windows can be found in the installer folder.

Dependencies used by the app

  * Electron
  * React
  * Redux
  * Redux persist
  * Bootstrap
  * React Datepicker

Fo development

  * webpack
  * babel
