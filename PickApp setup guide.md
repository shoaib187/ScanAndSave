**How to Set Up and Run Your React Native App (Beginner-Friendly Guide)**

This guide will help you set up your computer to run a React Native CLI app and open it in VS Code. You do not need prior programming knowledge to follow these steps.

**Step 1: Install Node.js**
-----------------------

React Native requires Node.js to run.

1. Go to [Node.js official website](https://nodejs.org/).
2. Download the **LTS (Long-Term Support)** version for your operating system (Windows/macOS/Linux).
3. Run the installer and follow the instructions.
4. After installation, verify Node.js is installed:

   * Open **Command Prompt** (Windows) or **Terminal** (macOS/Linux)
   * node -vYou should see a version number, like v20.x.x.

**Step 2: Install Watchman (macOS only)**
-------------------------------------

Watchman is recommended for macOS to help with file watching.

1. Open **Terminal**.
2. brew install watchman_(Install Homebrew first if not already installed:_ [_https://brew.sh/_](https://brew.sh/)_)_

**Step 3: Install Java Development Kit (JDK)**
------------------------------------------

React Native requires JDK to build Android apps.

1. Download **JDK 11** or later from [Adoptium](https://adoptium.net/).
2. Install it following the instructions.
3. java -versionYou should see the version number.

**Step 4: Install Android Studio**
------------------------------

Android Studio is needed to run the app on an Android emulator or device.

1. Download [Android Studio](https://developer.android.com/studio).
2. Install it using default options.
3. During installation, ensure **Android SDK**, **Android SDK Platform**, and **Android Virtual Device** are selected.

### Configure Environment Variables (Windows):

* Open **System Properties → Advanced → Environment Variables**.
* ANDROID\_HOME = C:\\Users\\\\AppData\\Local\\Android\\SdkPATH = %ANDROID\_HOME%\\platform-tools;%ANDROID\_HOME%\\emulator;%PATH%
* Replace with your Windows username.

**Step 5: Install React Native CLI**
--------------------------------

1. Open **Terminal/Command Prompt**.
2. npm install -g react-native-cli
3. react-native -v

**Step 6: Install VS Code**
-----------------------

VS Code is the code editor to view and edit your React Native app.

1. Download VS Code from [here](https://code.visualstudio.com/).
2. Install it using default options.
3. Open VS Code and install the **“React Native Tools” extension** from the Extensions Marketplace.

**Step 7: Open Your React Native App in VS Code**
---------------------------------------------

1. Place the source code folder somewhere easy to access (e.g., C:\\ReactNativeApp).
2. Open VS Code → File → Open Folder → Select your app folder.

**Step 8: Install Dependencies**
----------------------------

1. Open **Terminal in VS Code** (Ctrl + ~).
2. npm installThis installs all required libraries for the app.

**Step 9: Run the App on Android**
------------------------------

### Option 1: Using an Emulator

1. Open **Android Studio → AVD Manager → Create Virtual Device**.
2. Start the emulator.
3. npx react-native run-android
4. Wait for the app to build. Your app should appear in the emulator.

### Option 2: Using a Physical Android Device

1. Enable **Developer Mode → USB Debugging** on your device.
2. Connect via USB.
3. npx react-native run-android

**Step 10: Run the App on iOS (macOS only)**
----------------------------------------

1. Install **Xcode** from the App Store.
2. Open the app folder in Terminal.
3. npx react-native run-ios
4. The app will open in the iOS simulator.

**Step 11: Common Issues & Troubleshooting**
----------------------------------------

* **Node version error** → Install LTS version of Node.js.
* **Emulator not starting** → Ensure Android Studio and AVD are correctly set up.
* npx react-native startin a separate terminal before running the app again.

**Step 12: Editing the App**
------------------------

* Open files in VS Code.
* Make changes in the App.js file.
* Save and see changes reload automatically in the app.

### ✅ Congratulations!

You now have a working React Native development environment and can run your app on Android and iOS devices.
