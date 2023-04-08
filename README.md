# Salary Management System UI

Salary Management System UI is a project aim to practice building a user interface for an internal company that wants to log their employee's OT time, and leave days and calculate their salary.

[![salary-management-ui-ci](https://github.com/khoahd7621/salary-management-ui/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/khoahd7621/salary-management-ui/actions/workflows/docker-publish.yml)
[![salary-management-develop-ci](https://github.com/khoahd7621/salary-management-ui/actions/workflows/develop-ci.yml/badge.svg)](https://github.com/khoahd7621/salary-management-ui/actions/workflows/develop-ci.yml/badge.svg)

## Tentative technologies and frameworks

- Next.js 13
- ReactJS 18
- TypeScript
- Ant Design 5
- Github Actions
- SonarCloud
- Docker
- Vercel
- Send email with Nodemailer
- Upload images to Firebase Cloud Storage

## Getting started with Docker Compose

1. Get the latest source code
1. Add the following records to your host file:
   `127.0.0.1 salary-management`
1. Open terminal of your choice, go to 'salary-management-ui' directory and run `docker-compose up`
1. Open your favorite browser and go to 'http://salary-management'. Account login: admin / 123456.

## Getting Started with Development

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 16 or later)

### Installing

1. Clone the repo by running below command using your CLI

```bash
git clone https://github.com/khoahd7621/salary-management-ui
```

2. Change directory to salary-management-ui

3. Install dependencies by running below command using your CLI

```bash
npm install
```

4. Create `.env.local` in the `root` folder of the project and add these following stuffs

```.env.local
API_HOST_URL={URL host your backend APIs}
HOST_URL={URL host your frontend application}

// ENV config for firebase
NEXT_PUBLIC_FIREBASE_API_KEY={Your firebase API key}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN={Your firebase auth domain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID={Your firebase project id}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET={Your firebase storage bucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID={Your firebase messaging sender id}
NEXT_PUBLIC_FIREBASE_APP_ID={Your firebase app id}
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID={Your firebase measurement}

// ENV config email account for send mail
SMTP_USER={Your email}
SMTP_PASSWORD={Your password}
```

### Running the app

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser, login the admin account and start exploring features.

### Authors

Secret Billionaire

### Contributing

- Give us a star
- Reporting a bug
- Participate discussions
- Propose new features
- Submit pull requests. If you new to GitHub, consider to [learn how to contribute to a project through forking](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)

By contributing, you agree that your contributions will be licensed under [MIT License](https://github.com/khoahd7621/salary-management-ui/blob/main/License).

Active contributors might be asked to join the core team

### References
- [Upload files to Firebase Cloud Storage Firebase V9 React](https://blog.logrocket.com/firebase-cloud-storage-firebase-v9-react/)
- [Use gmail with Nodemailer](https://miracleio.me/snippets/use-gmail-with-nodemailer/)

### License

This project is licensed under the [MIT License](https://github.com/khoahd7621/salary-management-ui/blob/main/License).
