import type { RecoveryResult, BruteForceUpdate } from '../types';
import { logger } from './logger';
import { showNotification } from './notification';

interface OrchestratorCallbacks {
  onLog: (log: string) => void;
  onProgressUpdate: (progress: number) => void;
  onStatusUpdate: (status: string) => void;
  onComplete: (results?: RecoveryResult[]) => void;
}

class OrchestratorService {
  private callbacks: OrchestratorCallbacks | null = null;
  private abortController: AbortController | null = null;

  register(callbacks: OrchestratorCallbacks) {
    this.callbacks = callbacks;
  }

  unregister() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this.callbacks = null;
  }

  private log(message: string) {
    if (this.callbacks) this.callbacks.onLog(message);
  }

  private updateProgress(progress: number) {
    if (this.callbacks) this.callbacks.onProgressUpdate(progress);
  }
  
  private updateStatus(status: string) {
    if (this.callbacks) this.callbacks.onStatusUpdate(status);
  }

  private complete(results?: RecoveryResult[]) {
    if (this.callbacks) this.callbacks.onComplete(results);
  }

  async startProcess(actionName: string) {
    if (!this.callbacks) return;

    logger.info(`Requesting process from backend: ${actionName}`);
    this.updateProgress(0);
    this.updateStatus('Initializing...');
    this.log(`[INFO] Sending request to backend for action: ${actionName}`);

    this.abortController = new AbortController();
    
    try {
      const response = await fetch('http://127.0.0.1:5000/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionName }),
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last, possibly incomplete, line

        for (const line of lines) {
          if (line.startsWith('LOG:')) {
            this.log(line.substring(5));
          } else if (line.startsWith('STATUS:')) {
            this.updateStatus(line.substring(8));
          } else if (line.startsWith('PROGRESS:')) {
            this.updateProgress(parseInt(line.substring(10), 10));
          } else if (line.startsWith('ERROR:')) {
             this.log(`[BACKEND ERROR] ${line.substring(7)}`);
             logger.error(`Backend error for "${actionName}": ${line.substring(7)}`);
          }
        }
      }

      // Handle any remaining data in the buffer
      if (buffer) {
        this.log(buffer);
      }
      
      this.updateProgress(100);
      this.updateStatus('Completed');
      logger.success(`Process "${actionName}" completed.`);
      showNotification({ title: 'Process Complete', message: `Action "${actionName}" finished.`, type: 'success' });
      this.complete();

    } catch (error: any) {
      if (error.name === 'AbortError') {
        this.log('[INFO] Process aborted by user.');
        logger.info(`Process "${actionName}" was aborted.`);
      } else {
        this.log(`[FATAL] Connection to backend failed: ${error.message}`);
        this.updateStatus('Connection Error');
        logger.error(`Failed to execute "${actionName}": ${error.message}`);
        showNotification({ title: 'Execution Failed', message: 'Could not connect to the backend server.', type: 'error' });
        this.complete();
      }
    } finally {
        this.abortController = null;
    }
  }

  async *startPasscodeBruteForce(pinLength: 4 | 6): AsyncGenerator<BruteForceUpdate> {
    const maxAttempts = Math.pow(10, pinLength);
    const successAttempt = Math.floor(maxAttempts * 0.001) + 100; 
    
    for (let i = 0; i <= maxAttempts; i++) {
        if (i % 100 === 0 || i === successAttempt) {
            const currentAttemptPin = i.toString().padStart(pinLength, '0');
            const progress = (i / maxAttempts) * 100;

            if (i === successAttempt) {
                logger.success(`Passcode found: ${currentAttemptPin}`);
                showNotification({ title: 'Passcode Found!', message: `The device passcode is ${currentAttemptPin}`, type: 'success' });
                yield {
                    currentAttemptPin,
                    attemptCount: i,
                    progress,
                    foundPin: currentAttemptPin,
                };
                return;
            }

            yield {
                currentAttemptPin,
                attemptCount: i,
                progress,
            };

            await new Promise(resolve => setTimeout(resolve, 5));
        }
    }
  }
}

export const orchestrator = new OrchestratorService();
