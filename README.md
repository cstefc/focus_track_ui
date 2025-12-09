# Focus Track UI

![status](https://img.shields.io/badge/status-WIP-yellow)
![typescript](https://img.shields.io/badge/typescript-blue?logo=typescript&logoColor=white)
![react](https://img.shields.io/badge/react-blue?logo=react&logoColor=white)
![vite](https://img.shields.io/badge/vite-purple?logo=vite&logoColor=white)
![firebase](https://img.shields.io/badge/firebase-orange?logo=firebase&logoColor=white)
![mui](https://img.shields.io/badge/MUI‑Material‑UI-007FFF?logo=mui&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-enabled-brightgreen)
![vitest](https://img.shields.io/badge/tests‑with‑Vitest-lightgrey?logo=vitest&logoColor=black)

Focus Track is a React application currently under development. This project demonstrates my skills in React and TypeScript, with a focus on building a modular, feature-driven frontend. The final product will allow users to track personal projects and tasks, including a dedicated sport tracking feature. The backend API, which supports this application, can be found on my GitHub [here](https://github.com/cstefc/focus_track_api) and will be updated as new features are added to the frontend.

## Tech Stack

- **Backend**: [Custom backend API (WIP)](https://github.com/cstefc/focus_track_api)
- **Language**: TypeScript
- **Framework**: React
- **UI / Styling**: Material UI
- **Bundler / Build Tool**: Vite
- **Routing**: React Router DOM
- **Authentication**: Firebase Authentication
- **i18n / Localization**: react-i18next
- **Testing**: Vitest
- **Branch protection and status rules**

## Features
- **Environment Variables**: Sensitive information, such as API keys and credentials, is managed securely using `.env` files.
- **Routing**: Navigation throughout the application is handled via a top navigation bar.
- **Authentication**: Users are authenticated using Firebase Authentication.
- **Authorization**: Authenticated users can access restricted pages based on their login status.
- **OAuth Authentication** – Secure communication between front-end and back-end.
  
- **Project Management** – Ability to create and manage projects.
- **Goals & Steps** – Add detailed plans with steps inside projects.

## Roadmap

The project follows a **feature-driven development approach**, starting from the front-end and then integrating with the back-end. Planned features include:
- **Events** – Add and manage events related to goals and projects; better planning and an imporved UX to finish tasks.
- **Logging Feature** – Track progress and updates within projects.
- **Dashboard** – Add a dashboard showing statistics 

## Usage / Examples

### Running the Application

> You need to create a Firebase project and enable Authentication.  
> Use the following resources to set up your Firebase project and obtain the configuration:

- Firebase Console (create project / get config): [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Get Firebase Web App Configuration: [https://firebase.google.com/docs/web/setup#config-object](https://firebase.google.com/docs/web/setup#config-object)
- Firebase Authentication Setup Guide: [https://firebase.google.com/docs/auth/web/start](https://firebase.google.com/docs/auth/web/start)

Required environment variables (define in a `.env`-file or in terminal):

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN  
VITE_FIREBASE_PROJECT_ID  
VITE_FIREBASE_STORAGE_BUCKET  
VITE_FIREBASE_MESSAGING_SENDER_ID  
VITE_FIREBASE_APP_ID
VITE_API_URL
VITE_DEV
```

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
