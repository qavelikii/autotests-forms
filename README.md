# Autotest for Registration, Login, and Password Recovery Forms

## Introduction

This repository contains an automated test script using Puppeteer for the following functionalities of the Boostclick website:

- Registration form
- Login form
- Password recovery form

These scripts will help ensure the functionality of the critical forms on the website. The tests are written in JavaScript and are executed with Node.js.

## Prerequisites

To run the autotests, ensure the following software is installed on your machine:

1. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
2. **npm** (comes with Node.js): Make sure npm is available to install dependencies.
3. **Git**: Used to clone the repository.

## Getting Started

Follow the steps below to set up and run the tests:

### 1. Clone the Repository

First, clone this repository to your local machine:

```sh
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Navigate to the project folder and install the required dependencies using npm:

```sh
npm install puppeteer
```

This command will install Puppeteer, a Node library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

### 3. Create the Configuration File

Ensure that the script configuration is set up properly for different environments. You can create an environment file if required or configure the following parameters directly in the script:

- **URL** of the website to be tested.
- **User credentials** for registration, login, or password recovery tests.

### 4. Running the Test Scripts

The repository includes three main test files:

- **signupTest.js**: This script tests the registration form.
- **loginTest.js**: This script tests the login form.
- **passwordRecoveryTest.js**: This script tests the password recovery form.

To execute the registration form test:

```sh
node signupTest.js
```

To run the login test:

```sh
node loginTest.js
```

To execute the password recovery test:

```sh
node passwordRecoveryTest.js
```

### 5. Test Scripts Details

The following steps are performed in the `signupTest.js` script for registration:

1. **Launch Browser**: The browser is launched in non-headless mode to see the actions in real time.
2. **Navigate to Signup Page**: The browser navigates to the Boostclick signup page.
3. **Fill Registration Form**: The script finds the input fields for email and passwords and fills in the details.
4. **Accept Terms and Conditions**: The script selects the checkboxes for agreeing to terms.
5. **Submit the Form**: Finally, it clicks the "Register" button to complete the process.

The scripts for login and password recovery have similar structures but are tailored to test the relevant forms.

### 6. Customizing Tests

To customize tests, update the values inside the script for:

- **Input fields**: Adjust the data (e.g., email, password) used during form testing.
- **Selectors**: Modify the DOM selectors if the website structure changes.

### 7. Debugging

- **Common Issues**: If the script doesn't run as expected, ensure all dependencies are installed and check that the website's structure hasn't changed.
- **Adding Delays**: Sometimes adding `await page.waitForTimeout(1000);` helps to stabilize the tests if elements load slowly.

## Notes

- The test scripts are written for demonstration purposes. Please do not use real credentials.
- Ensure to use test data instead of live data for the registration or login forms.

## Contributing

Feel free to submit a pull request if you'd like to improve or add new features to these scripts.

## License

Dmitrii Velikii

This project is licensed under the MIT License. See the LICENSE file for details.

