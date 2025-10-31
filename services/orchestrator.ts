import { logger } from './logger';
import { showNotification } from './notification';
import type { RecoveryResult, BruteForceUpdate } from '../types';

interface OrchestratorCallbacks {
    onLog: (log: string) => void;
    onProgressUpdate: (progress: number) => void;
    onStatusUpdate: (status: string) => void;
    onComplete: (results?: RecoveryResult[]) => void;
}

class Orchestrator {
    private callbacks: Partial<OrchestratorCallbacks> = {};
    private processTimer: ReturnType<typeof setTimeout> | null = null;

    register(callbacks: Partial<OrchestratorCallbacks>) {
        this.callbacks = callbacks;
    }

    unregister() {
        this.callbacks = {};
        if (this.processTimer) {
            clearTimeout(this.processTimer);
            this.processTimer = null;
        }
    }

    private log(message: string) {
        logger.info(message);
        this.callbacks.onLog?.(message);
    }

    private updateProgress(progress: number, status: string) {
        this.callbacks.onProgressUpdate?.(progress);
        this.callbacks.onStatusUpdate?.(status);
    }

    private complete(results?: RecoveryResult[]) {
        logger.success('Process completed successfully.');
        showNotification({
            title: 'Process Complete',
            message: 'The operation finished successfully.',
            type: 'success',
        });
        this.callbacks.onComplete?.(results);
    }

    startProcess(actionName: string) {
        this.log(`Starting process: ${actionName}`);
        
        const steps = [
            { status: 'Initializing...', duration: 1000, progress: 10 },
            { status: 'Analyzing device...', duration: 2000, progress: 30 },
            { status: 'Applying exploit...', duration: 3000, progress: 60 },
            { status: 'Verifying changes...', duration: 1500, progress: 90 },
            { status: 'Cleaning up...', duration: 1000, progress: 100 },
        ];

        let currentStep = 0;
        const runStep = () => {
            if (currentStep >= steps.length) {
                // Check if it's a recovery action to return mock results
                if (actionName.toLowerCase().includes('photo')) {
                    const mockResults: RecoveryResult[] = Array.from({ length: 15 }, (_, i) => ({
                        id: `photo-${i}`,
                        preview: `https://picsum.photos/seed/recovered${i}/200`,
                        date: new Date(Date.now() - i * 1000 * 3600 * 24).toISOString().split('T')[0],
                    }));
                    this.complete(mockResults);
                } else {
                    this.complete();
                }
                return;
            }

            const step = steps[currentStep];
            this.updateProgress(step.progress, step.status);
            this.log(step.status);

            this.processTimer = setTimeout(() => {
                currentStep++;
                runStep();
            }, step.duration);
        };

        runStep();
    }

    async *startPasscodeBruteForce(pinLength: 4 | 6): AsyncGenerator<BruteForceUpdate> {
        const maxAttempts = Math.pow(10, pinLength);
        const foundPin = String(Math.floor(Math.random() * maxAttempts)).padStart(pinLength, '0');
        const foundAtAttempt = Math.floor(Math.random() * (maxAttempts * 0.05)) + 1; // Find it within first 5% of attempts for demo purposes

        this.log(`Starting passcode brute-force for ${pinLength}-digit PIN.`);

        for (let i = 0; i <= foundAtAttempt; i++) {
            const currentAttemptPin = String(i).padStart(pinLength, '0');
            
            // Update UI periodically
            if (i % 100 === 0 || i === foundAtAttempt) { 
                const update: BruteForceUpdate = {
                    currentAttemptPin,
                    attemptCount: i,
                    progress: (i / maxAttempts) * 100,
                };
                
                if (i === foundAtAttempt) {
                    update.foundPin = foundPin;
                    update.currentAttemptPin = foundPin;
                    update.progress = 100;
                    yield update;
                    logger.success(`Passcode found: ${foundPin}`);
                    showNotification({ title: 'Success', message: `Passcode found: ${foundPin}`, type: 'success' });
                    return;
                }
                
                yield update;
                await new Promise(resolve => setTimeout(resolve, 5)); // small delay to make it look like it's working
            }
        }

        logger.error('Passcode not found within attempts.');
        showNotification({ title: 'Failed', message: 'Could not find passcode.', type: 'error' });
    }
}

export const orchestrator = new Orchestrator();
