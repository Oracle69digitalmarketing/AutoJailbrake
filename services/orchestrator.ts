import { logger } from './logger';
import { showNotification } from './notification';
import type { RecoveryResult, BruteForceUpdate } from '../types';

interface OrchestratorCallbacks {
  onLog: (log: string) => void;
  onProgressUpdate: (progress: number) => void;
  onStatusUpdate: (status: string) => void;
  onComplete: (results?: RecoveryResult[]) => void;
}

class OrchestratorService {
  private callbacks: OrchestratorCallbacks | null = null;
  private processTimer: ReturnType<typeof setInterval> | null = null;

  register(callbacks: OrchestratorCallbacks) {
    this.callbacks = callbacks;
  }

  unregister() {
    this.callbacks = null;
    if (this.processTimer) {
      clearInterval(this.processTimer);
      this.processTimer = null;
    }
  }

  async *startPasscodeBruteForce(pinLength: 4 | 6): AsyncGenerator<BruteForceUpdate, string, void> {
    logger.info(`Starting Passcode Brute-force for ${pinLength}-digit PIN.`);
    const maxAttempts = Math.pow(10, pinLength);
    // Simulate finding the pin around 70-90% of the way through
    const targetAttempt = Math.floor(maxAttempts * (0.7 + Math.random() * 0.2)); 
    let foundPin = '';

    for (let i = 0; i <= maxAttempts; i++) {
        const currentAttemptPin = i.toString().padStart(pinLength, '0');
        const progress = (i / maxAttempts) * 100;

        if (i === targetAttempt) {
            foundPin = currentAttemptPin;
            yield { currentAttemptPin, attemptCount: i, progress, foundPin };
            logger.success(`Passcode found: ${foundPin}`);
            showNotification({
                title: 'Passcode Found!',
                message: `The device passcode is ${foundPin}.`,
                type: 'success',
            });
            return foundPin;
        }

        // Yield updates less frequently to avoid overwhelming the UI
        if (i % 100 === 0 || i === maxAttempts) {
            yield { currentAttemptPin, attemptCount: i, progress };
            await new Promise(resolve => setTimeout(resolve, 5)); // Small delay
        }
    }
    
    // This part should ideally not be reached if a PIN is always found
    logger.error('Passcode brute-force finished without finding a PIN.');
    showNotification({
        title: 'Process Failed',
        message: `Could not find the passcode after ${maxAttempts} attempts.`,
        type: 'error',
    });
    return '';
  }

  startProcess(actionName: string) {
    if (!this.callbacks) {
      console.error("Orchestrator started without registered callbacks.");
      return;
    }

    logger.info(`Starting process: ${actionName}`);
    let progress = 0;
    const steps = this.getMockSteps(actionName);
    let currentStep = 0;

    const tick = () => {
      if (!this.callbacks) {
          if (this.processTimer) clearInterval(this.processTimer);
          return;
      }
      
      progress += Math.random() * (100 / (steps.length * 5)); // Simulate variable progress
      
      if (progress >= (currentStep + 1) * (100 / steps.length)) {
        currentStep++;
      }
      
      if (currentStep < steps.length) {
          this.callbacks.onStatusUpdate(steps[currentStep]);
          this.callbacks.onLog(`[${Math.round(progress)}%] ${steps[currentStep]}`);
      }
      
      this.callbacks.onProgressUpdate(Math.min(100, progress));

      if (progress >= 100) {
        if (this.processTimer) clearInterval(this.processTimer);
        this.callbacks.onStatusUpdate('Process complete.');
        this.callbacks.onLog('Process finished successfully.');
        logger.success(`Process "${actionName}" completed successfully.`);
        showNotification({
            title: 'Process Complete',
            message: `The "${actionName}" action has finished.`,
            type: 'success',
        });

        // Generate mock results if it's a recovery action
        if (actionName.toLowerCase().includes('scan') || actionName.toLowerCase().includes('recover')) {
            const results = this.generateMockResults();
            this.callbacks.onComplete(results);
        } else {
            this.callbacks.onComplete();
        }
      }
    };
    
    this.processTimer = setInterval(tick, 300);
  }

  private getMockSteps(actionName: string): string[] {
      // Return plausible steps based on the action name
      if (actionName.toLowerCase().includes('jailbreak')) {
          return ['Pinging device...', 'Identifying kernel version...', 'Loading exploit payload...', 'Patching root filesystem...', 'Installing package manager...'];
      }
      if (actionName.toLowerCase().includes('unlock') || actionName.toLowerCase().includes('passcode')) {
          return ['Analyzing security enclave...', 'Loading dictionary attack module...', 'Attempting passcodes (1000/min)...', 'Bypassing lock screen...', 'Finalizing unlock...'];
      }
      if (actionName.toLowerCase().includes('photo')) {
          return ['Mounting data partition...', 'Scanning for JPEG headers...', 'Reconstructing deleted files...', 'Verifying image integrity...', 'Indexing found photos...'];
      }
      return ['Initializing process...', 'Executing core logic...', 'Analyzing results...', 'Cleaning up temporary files...', 'Finalizing...'];
  }

  private generateMockResults(): RecoveryResult[] {
    return Array.from({ length: 15 }, (_, i) => ({
      id: `result-${i}`,
      preview: `https://picsum.photos/seed/result${i}/200/200`,
      date: new Date(Date.now() - Math.random() * 1e10).toISOString().split('T')[0],
    }));
  }
}

export const orchestrator = new OrchestratorService();