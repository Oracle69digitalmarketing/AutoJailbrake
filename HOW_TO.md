# AutoJailbreak - Technical Guide (HOW-TO)

This document provides a technical overview of the AutoJailbreak application, its architecture, and guidelines for development.

## 🚀 Full Stack Architecture

AutoJailbreak is a full-stack application composed of a backend for core logic and a frontend for user interaction.

-   **Backend (Python + Flask):** A powerful core responsible for device communication (via ADB, libimobiledevice), exploit execution, and automation logic. It exposes a simple REST API for the frontend to consume.
-   **Frontend (Electron Target + React):** A modern, cross-platform desktop application that provides a clean and intuitive user interface for managing devices and triggering actions.

---

## 🏁 Backend Setup & Running

To run the full-stack application, you must run the Python backend server.

### 1. Prerequisites

Before you begin, ensure you have the following installed on your system:
-   **Python 3.8+** and `pip`.
-   **(For iOS)** `libimobiledevice` (provides `ideviceinfo`).
    -   On macOS: `brew install libimobiledevice`
    -   On Linux: `sudo apt-get install libimobiledevice-utils`
-   **(For Android)** `adb` (Android Debug Bridge).
    -   Usually installed with Android Studio or via package managers.

### 2. Installation

1.  Navigate to the `server` directory in your terminal:
    ```bash
    cd server
    ```
2.  Install the required Python packages using `pip`:
    ```bash
    pip install -r requirements.txt
    ```

### 3. Running the Server

1.  From the `server` directory, run the Flask application:
    ```bash
    flask run
    ```
    Alternatively, you can run:
    ```bash
    python app.py
    ```
2.  The server will start, typically on `http://127.0.0.1:5000`. Leave this terminal window running. The frontend application will communicate with this server.

---

## 🔌 API Contract

The frontend communicates with the backend via the following REST API endpoints.

### `GET /detect`

-   **Purpose:** Detects all currently connected iOS and Android devices.
-   **Method:** `GET`
-   **Response Body:** `application/json`
    ```json
    [
      {
        "id": "device-udid-or-serial",
        "name": "iPhone 13 Pro",
        "os": "iOS",
        "osVersion": "15.1",
        "status": "Unlocked",
        "serial": "...",
        "storage": "...",
        "imei": "..."
      }
    ]
    ```

### `POST /execute`

-   **Purpose:** Executes a long-running action (like a jailbreak or recovery) and streams the log output back to the client in real-time.
-   **Method:** `POST`
-   **Request Body:** `application/json`
    ```json
    {
      "actionName": "Install checkm8"
    }
    ```
-   **Response Body:** `text/plain` (Streaming)
    -   The server returns a streaming response where each line is a log message from the executed process. The frontend reads this stream line-by-line to update the Process Monitor.

---

## 🛠️ Integrating Real Exploits and Tools

The core of the backend's power comes from its ability to execute real command-line tools.

-   **Execution Engine:** The `server/core/executor.py` module uses Python's built-in `subprocess` library to run external binaries and scripts.
-   **Tool Location:** All exploit binaries, scripts, and related tools should be placed in the `server/bin/` directory.
-   **Logic:** The `executor.py` module will contain a mapping from `actionName` (received from the API) to the specific command that needs to be run. For example, the action "Jailbreak with checkm8" might map to the command `./bin/checkra1n -c`.
-   **Output Streaming:** The `subprocess.Popen` object's `stdout` is read line-by-line and yielded back through the Flask response stream, creating the real-time log feed.

## 📂 Project Structure

```
AutoJailbreak/
├── components/         # React Components
├── hooks/              # Custom React Hooks
├── services/           # Frontend Services (API, etc.)
├── server/             # Python/Flask Backend
│   ├── core/           # Core backend logic (detection, execution)
│   ├── bin/            # Directory for real exploit binaries/scripts
│   ├── app.py          # Main Flask app, defines API routes
│   └── requirements.txt
├── App.tsx             # Main React component
├── index.html          # Entry point for desktop app
├── mobile.html         # Entry point for mobile web dashboard
└── HOW_TO.md           # This file
```
