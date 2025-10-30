
// FIX: Update import to GoogleGenAI and add Type
import { GoogleGenAI, Type } from "@google/genai";
import type { Device, Exploit, OrchestratorPlan, UpdateCheckResult } from '../types';
import { ExploitType, DeviceStatus } from '../types';

// This is a mock API, so we'll simulate network delay.
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database of exploits
const MOCK_EXPLOITS: Exploit[] = [
    {
        name: 'checkm8',
        description: 'A permanent, unpatchable bootrom exploit for A5-A11 devices.',
        type: ExploitType.Jailbreak,
        cve: 'N/A',
        compatibility: { os: 'iOS', versions: ['12.0-14.8.1'] }
    },
    {
        name: 'Taurine',
        description: 'A fast, powerful jailbreak for iOS 14.0-14.3.',
        type: ExploitType.Jailbreak,
        compatibility: { os: 'iOS', versions: ['14.0-14.3'] }
    },
    {
        name: 'Fugu15 Max',
        description: 'A modern jailbreak tool for arm64e devices on iOS 15.0-15.4.1.',
        type: ExploitType.Jailbreak,
        compatibility: { os: 'iOS', versions: ['15.0-15.4.1'] }
    },
    {
        name: 'SIM Unlocker',
        description: 'Attempts to unlock the device from its carrier restrictions.',
        type: ExploitType.Unlock,
        compatibility: { os: 'any', versions: ['*'] }
    },
    {
        name: 'Passcode Bypass',
        description: 'Brute-force the device passcode using a dictionary attack.',
        type: ExploitType.Unlock,
        compatibility: { os: 'any', versions: ['*'] }
    },
];

export const getAvailableExploits = async (device: Device): Promise<Exploit[]> => {
    await sleep(1200);
    // In a real app, you'd have more complex logic. Here we just filter by OS.
    return MOCK_EXPLOITS.filter(exploit => 
        exploit.compatibility.os === 'any' || exploit.compatibility.os === device.os
    );
};


// FIX: Initialize Gemini API client according to guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Aligned function with Gemini API guidelines for initialization, content generation, and response handling.
export const getAIRecommendation = async (device: Device): Promise<OrchestratorPlan> => {
    await sleep(2500); // Simulate API latency
    
    // Create a detailed prompt for the Gemini model
    const prompt = `
        You are an expert AI assistant for a device recovery and jailbreaking toolkit.
        Based on the following device information, provide a recommended action plan.

        Device Information:
        - Model: ${device.name}
        - OS: ${device.os} ${device.osVersion}
        - Status: ${device.status}

        Your task is to return a JSON object with the following structure:
        {
          "title": "A concise, user-friendly title for the recommended action.",
          "description": "A brief, one-sentence explanation of why this action is recommended.",
          "action": "The exact name of the action to be executed. Must be one of: 'Start Jailbreak', 'Start Unlock', 'Start Full Recovery', 'Start Data Recovery'.",
          "steps": ["A list of 3-5 high-level steps the user can expect during the process."]
        }

        Analysis and Action Selection Rules:
        1. If the device status is 'Jailbroken', recommend 'Start Full Recovery'.
        2. If the device status is 'Locked', recommend 'Start Unlock'.
        3. If the device status is 'Unlocked', recommend 'Start Jailbreak'.
        4. If the OS is Android, the action should always be 'Start Data Recovery', regardless of status.
        5. For the 'steps', create a plausible-sounding sequence of technical actions. For example, for a jailbreak, it could be "1. Identifying device profile", "2. Loading kernel exploit", "3. Patching root filesystem", "4. Installing package manager".
        
        Provide only the JSON object in your response, with no additional text or markdown formatting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: "A concise, user-friendly title for the recommended action." },
                        description: { type: Type.STRING, description: "A brief, one-sentence explanation of why this action is recommended." },
                        action: { type: Type.STRING, description: "The exact name of the action to be executed." },
                        steps: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "A list of 3-5 high-level steps the user can expect during the process."
                        }
                    },
                    required: ["title", "description", "action", "steps"]
                }
            }
        });

        const text = response.text.trim();
        const recommendation = JSON.parse(text);
        return recommendation;
    } catch (error) {
        console.error("Error fetching AI recommendation:", error);
        // Fallback to a default recommendation in case of an API error
        if (device.status === DeviceStatus.Locked) {
            return {
                title: 'Unlock Device',
                description: 'The device is locked. The recommended action is to attempt an unlock.',
                action: 'Start Unlock',
                steps: ['Connect device', 'Analyze security', 'Attempt bypass', 'Verify access']
            };
        }
        return {
            title: 'Jailbreak Device',
            description: 'The device is unlocked and ready. The recommended action is to jailbreak.',
            action: 'Start Jailbreak',
            steps: ['Analyze kernel', 'Apply exploit', 'Patch filesystem', 'Install Cydia']
        };
    }
};


export const checkForUpdates = async (): Promise<UpdateCheckResult> => {
    await sleep(2000);
    // Simulate a 50/50 chance of an update being available
    if (Math.random() > 0.5) {
        return {
            isUpdateAvailable: true,
            version: '2.5.1',
            releaseNotes: `
- Added support for iOS 16.5 exploits.
- Improved performance of the photo recovery module.
- Fixed a bug in the Android connection logic.
- Updated UI with new animations.
            `.trim(),
        };
    }
    return { isUpdateAvailable: false };
};
