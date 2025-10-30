# AutoJailbreak MVP

An automation-first, dual-platform jailbreaking app for iOS & Android that detects devices, auto-runs compatible exploits, installs a package manager, and provides a local/remote control interface.

![AutoJailbreak Screenshot](https://raw.githubusercontent.com/aistudio-template-apps/world-class-senior-frontend-engineer/main/screenshots/s3.png)

## ✨ Features

- **Automatic Device Detection:** Identifies connected iOS and Android devices via USB.
- **Dynamic Exploit Matching:** Matches the detected device and OS version to a database of compatible exploits.
- **One-Click Execution:** Simplifies complex jailbreaking and unlocking procedures into single actions.
- **Real-time Process Monitor:** Provides live feedback, progress, and detailed logs for all operations.
- **AI-Powered Recommendations:** Suggests the best course of action for a connected device.
- **Auto-Updateable Exploit Stack:** (Planned) Fetches the latest exploits and tools from remote sources to stay current.

## 🚀 Full Stack Architecture

AutoJailbreak is a full-stack application composed of a backend for core logic and a frontend for user interaction.

-   **Backend (Python + Flask):** A powerful core responsible for device communication (via ADB, libimobiledevice), exploit execution, and automation logic. It exposes a simple REST API for the frontend to consume.
-   **Frontend (Electron + React):** A modern, cross-platform desktop application that provides a clean and intuitive user interface for managing devices and triggering actions.

## 🏁 Getting Started

To run this application, you need to run both the frontend and the backend services.

**1. Backend Server:**
(Instructions for setting up and running the Python/Flask server will be added here once implemented.)
```bash
# Example
cd server
pip install -r requirements.txt
flask run
```

**2. Frontend Application:**
This is a static web application and requires no build step.
1.  Ensure the backend server is running.
2.  Open the `index.html` file in a modern web browser.

## 📂 Project Structure (Monorepo)

The project is organized in a monorepo style to keep the backend, frontend, and shared logic clean and separated.

```
AutoJailbreak/
├── desktop/                # Electron Frontend
│   ├── components/
│   ├── App.tsx
│   ├── index.html
│   └── ...
├── server/                 # Flask Backend
│   ├── core/
│   ├── exploits/
│   ├── app.py
│   └── ...
├── tools/                  # Shared scripts & utilities
├── HOW_TO.md               # Technical development guidelines
└── README.md               # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for bugs, feature requests, or improvements.
