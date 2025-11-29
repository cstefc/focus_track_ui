

# Focus Track UI

![status](https://img.shields.io/badge/status-WIP-yellow)
![typescript](https://img.shields.io/badge/typescript?logo=typescript)
![react](https://img.shields.io/badge/react-19.2.0-blue?logo=react)
![vite](https://img.shields.io/badge/vite-7.1.9-purple?logo=vite)
![firebase](https://img.shields.io/badge/firebase-auth-orange?logo=firebase)
![bootstrap](https://img.shields.io/badge/bootstrap-5.3-purple?logo=bootstrap)
![tests](https://img.shields.io/badge/tests-vitest-lightgrey)

Focus Track is a React application currently under development. This project demonstrates my skills in React and TypeScript, with a focus on building a modular, feature-driven frontend. The final product will allow users to track personal projects and tasks, including a dedicated sport tracking feature. The backend API, which supports this application, can be found on my GitHub [here](https://github.com/cstefc/focus_track_api) and will be updated as new features are added to the frontend.

## Tech Stack

- **Backend**: [Custom backend API (WIP)](https://github.com/cstefc/focus_track_api)
- **Language**: TypeScript
- **Authentication**: Firebase Authentication
- **Front-end**: React 19 + TypeScript (WIP)
- **Bundler / Build Tool**: Vite 7.1.9
- **UI / Styling**: React Bootstrap 2.10.10, Bootstrap 5.3.8, Emotion 11
- **Routing**: React Router DOM 7.9.4
- **i18n / Localization**: react-i18next 16
- **Testing**: Vitest + jsdom
## Features (Work in Progress)

- **Environment Variables**: Sensitive information, such as API keys and credentials, is managed securely using `.env` files.
- **Routing**: Navigation throughout the application is handled via a top navigation bar.
- **Authentication**: Users are authenticated using Firebase Authentication.
- **Authorization**: Authenticated users can access restricted pages based on their login status.
- **OAuth Authentication** – Secure communication between front-end and back-end.
- **Project Management** – Ability to create and manage projects.
- **Plans & Steps** – Add detailed plans with steps inside projects.

## Roadmap

The project follows a **feature-driven development approach**, starting from the front-end and then integrating with the back-end. Planned features include:
- **Logging Feature** – Track progress and updates within projects.
- **Events** – Add and manage events related to goals and projects.
- **Dashboard** – Add a dashboard showing statistics 

> ⚠️ Note: These features are under development and will be gradually implemented.

## Usage / Examples

### Running the Application

> You need to create a Firebase project and enable Authentication.  
> Use the following resources to set up your Firebase project and obtain the configuration:

- Firebase Console (create project / get config): [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Get Firebase Web App Configuration: [https://firebase.google.com/docs/web/setup#config-object](https://firebase.google.com/docs/web/setup#config-object)
- Firebase Authentication Setup Guide: [https://firebase.google.com/docs/auth/web/start](https://firebase.google.com/docs/auth/web/start)

Required environment variables for your `.env` file:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN  
VITE_FIREBASE_PROJECT_ID  
VITE_FIREBASE_STORAGE_BUCKET  
VITE_FIREBASE_MESSAGING_SENDER_ID  
VITE_FIREBASE_APP_ID  
```


> ⚠️ Keep this file private and do not commit it to version control.

---

1. Clone the repository:
   `git clone https://github.com/cstefc/focus_track_ui.git`
   `cd focus_track`

2. Install dependencies:
   `npm install`

3. Start the development server:
   `npm run dev`

4. Open the application in your browser at [http://localhost:5173](http://localhost:5173)

---

### Authentication

- Sign in with Firebase Authentication.
- Once logged in, restricted pages become accessible.
- Logging out will return the user to public pages.

---

### Navigation

- Use the top navigation bar to switch between available pages.
- Routing is handled through React Router DOM.

---

### Example Workflow

1. Open the app and sign in via Firebase Authentication.
2. Navigate to a restricted page (e.g., projects) to see personalized content.
3. Interact with the UI elements.
