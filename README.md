# OpenShip

A tiny personal code sandbox: write HTML, CSS and JavaScript in your browser, watch it come alive instantly, save it and share it with a clean link.

## What this is

OpenShip lets you:
- Create an account and log in safely
- Open a built-in code editor and write HTML, CSS and JavaScript together
- See your page update live in a preview panel as you type
- Save your page update live in a preview panel as you type
- Save your work to your account and come back to it anytime
- Give a saved snippet a custom name(a "slug") so you can share it as friendly link, like `yoursite.com/my-project`
- Browse, view, edit or delete everything you've saved from one list
- Update your profile photo and see basic account info
- Reset your password if you forget it, using a one-time code sent to your email

Think of it like a small, personal CodePen - write code, preview it instantly, save it, share it.

## Features

- Sign up, log in and logout securely
- "Forgot password" flow: a 6-digit one-time code is emailed to you, it expires after a set time and can only be used once
- Profile page with avatar upload (JPG, PNG or WEBP, up to 5MB)
- Live sandbox editor - code on one side, live preview on the other
- Save and update snippets tied to your account
- Custom shareable links (slugs) for any snippet you save
- A private link to open any of your own saved snippets by ID
- A snippets list page to view, edit or delete your saved work
- A stylised "deploy console" animation on the login/register screen (this is just visual flair - it doesn't reflect real deployment activity)

## Technical highlights

- **Backend:** Go, using the Gin web framework
- **Database:** TiDB (MySQL-compatible), connected over TLS
- **Auth:** JSON Web Tokens stored in an HTTP-only cookie; passwords are hashed before being stored
- **Password reset:** a one-time code is generated on the server, hashed before storage, emailed via SMTP and expires after a configuration number of minutes
- **File uploads:** avatars are checked for file type (.jpg/ .jpeg/ ./png/ .webp) and size (MAX 5MB), then stored on the server and served as static files
**Snippets:** stored as raw code (max 1MB), with an optional unique slug - duplicated slugs are rejected
- **Frontend** React (vite), Tailwind CSS, Redux Toolkit with redux-persist for session state, React Router for navigation, Axios for API requests
- **Live preview:** render inside a sandboxed `<iframe sandbox="allow-scripts">

## Running Locally

Follow these steps to run the project on your local machine.

## Backend Setup

First, move into the backend folder:

create a .env file

```bash
cd server
go run main.go
```

#### Backend Environment 
APP_PORT=8080
APP_ENV-development

CORS_ORIGIN=http://localhost:5173

DB_HOST=host
DB_PORT=4000
DB_USER=root
DB_PASSWORD=password
DB_NAME=open_ship

JWT_SECRET=your-secret-key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password
SMTP_FROM=your-from-email

OTP_EXPRIY_MINUTES=10

```bash
cd client
npm i
npm run dev
```

### Frontend Environment
VITE_API_URL=http://localhost:8080/api/v1

## Honest limitations

- The "recent shipments" list and "global CDN" style copy on the login screen is decorative UI text, not a real deployement or CDN system.
- Only one language stack is supported inside the editor - everything is a single HTML document with inline `<style>`/`<script>`, not separate file panes.
- There's no admin panel - the `role` field exists in the database but isn't used for any admin-only screens yet.

## Built for 

Built for [Maconda](http://maconda.hackclub.com) - a Hack Club hackathon.

## Team
- [Jaison David M]