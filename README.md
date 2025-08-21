# BugSmash - A Firebase Studio Project

This is a Next.js application built with Firebase Studio. It's a bug tracking system that uses Firebase Firestore for its database.

## Technologies Used

This project is built with the following technologies:
- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/en) (which includes npm)
*   [Visual Studio Code](https://code.visualstudio.com/)
*   [Firebase CLI](https://firebase.google.com/docs/cli) (for deploying Firestore rules)

## Getting Started Locally with VS Code

Follow these instructions to get the project running on your local machine for development and testing.

### 1. Open the Project
- Launch Visual Studio Code.
- Go to `File > Open Folder...` and select the root directory of the project.

### 2. Open the Integrated Terminal
- Open the built-in terminal in VS Code by navigating to `Terminal > New Terminal` from the top menu, or use the shortcut `Ctrl+\`` (backtick).

### 3. Install Dependencies
- In the terminal you just opened, run the following command. This will download and install all the necessary packages for the project.
  ```bash
  npm install
  ```

### 4. Configure Firebase Security Rules
- This project requires Firestore security rules to be deployed to allow database access.
- In your terminal, run the following command to deploy the rules included in the project:
  ```bash
  firebase deploy --only firestore:rules
  ```
- **Note:** You may need to log in to Firebase first by running `firebase login`.

### 5. Run the Application
- The application requires two processes to be running simultaneously in separate terminals.

- **Start the Web Server:**
  - In your first terminal, run the following command to start the Next.js development server:
    ```bash
    npm run dev
    ```
  - The application will now be running and accessible at `http://localhost:9002`.

- **Start the AI Service:**
  - Open a second terminal in VS Code (click the `+` icon in the terminal panel).
  - In this new terminal, run the following command to start the Genkit service, which handles any AI-powered features:
    ```bash
    npm run genkit:watch
    ```

You can now view the application in your browser and start making changes to the code. The web server and AI service will automatically update as you save your files.
