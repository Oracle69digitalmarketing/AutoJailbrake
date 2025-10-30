# How-to & Development Guidelines

This document provides technical guidelines for developers contributing to the AutoJailbreak project. It covers the application's architecture, frontend-backend communication, and development workflow.

## 🏛️ Architectural Overview

The application follows a client-server model, with a Python backend handling all the heavy lifting and an Electron frontend providing the user interface.

### 1. Python Backend (Flask)

-   **Role:** The "brain" of the application.
-   **Responsibilities:**
    -   **Device Detection:** Uses tools like `libimobiledevice` and `ADB` to detect and identify connected devices.
    -   **Exploit Logic:** Contains the logic to match a device's OS and version to the correct exploit from its database.
    -   **Automation & Execution:** Runs the actual shell scripts and command-line tools that perform the jailbreak, unlock, or recovery.
    -   **API Server:** Exposes a set of RESTful endpoints (e.g., `/detect`, `/start`, `/logs`) for the frontend to call.

### 2. Electron Frontend (React)

-   **Role:** The "face" of the application.
-   **Responsibilities:**
    -   **User Interface:** Renders the device dashboard, detailed views, and the process monitor.
    -   **User Interaction:** Captures user actions (e.g., clicking the "Start Jailbreak" button).
    -   **API Client:** Makes `fetch` requests to the Python backend to get data and trigger operations.
    -   **State Management:** Manages the UI state, including displaying data from the backend and showing loading/processing states.

---

## 🔌 Frontend-Backend Communication

The frontend and backend communicate over a local HTTP API. This keeps the two parts decoupled and allows them to be developed and tested independently.

-   **Backend Server Address:** The Flask server runs locally at `http://127.0.0.1:5000`.
-   **API Endpoints:**
    -   `GET /detect`: Asks the backend to scan for connected devices and returns a list of device objects.
    -   `POST /start`: Tells the backend to start a specific operation (e.g., jailbreak) on a device. The request body includes the device ID and the desired action.
    -   `GET /logs`: Fetches the latest logs for an ongoing operation.
    -   `POST /update`: Triggers the backend's auto-updater module to fetch new exploits.

**Example `fetch` call from the frontend:**
```javascript
async function triggerJailbreak(os, device) {
  const response = await fetch('http://127.0.0.1:5000/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ os, device })
  });
  return await response.json();
}
```

---

## 🛠️ How to Add a New Feature

### 1. Add a New Exploit or Tool

1.  **Backend:** Add the new exploit script/binary to the appropriate directory within `server/exploits/`.
2.  **Backend:** Update the YAML configuration (`server/configs/devices.yaml`) to map the new exploit to the correct device models and OS versions.
3.  **Backend:** If necessary, update the Python exploit selection logic in `server/core/exploit_selector.py` to handle the new tool.
4.  **Frontend:** The frontend should automatically display the new action if the backend logic is correct. No frontend changes are typically needed, as the UI is driven by data from the backend.

### 2. Add a New UI Component

1.  Create a new file in `desktop/components/` (e.g., `NewComponent.tsx`).
2.  Define the component's props in a TypeScript `interface`.
3.  Write the component as a `React.FC`.
4.  Import and use the new component where needed (e.g., in `DeviceDetails.tsx`).
5.  If the component needs data from the backend, ensure the parent component fetches that data and passes it down as props.
