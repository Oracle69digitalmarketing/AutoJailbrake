import React, { useEffect } from 'react';
import { XMarkIcon } from './icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    isDismissible?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, isDismissible = true }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isDismissible && event.key === 'Escape') {
                onClose();
            }
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, isDismissible]);

    if (!isOpen) {
        return null;
    }

    const handleBackdropClick = () => {
        if (isDismissible) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in-fast"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
                aria-hidden="true"
                onClick={handleBackdropClick}
            ></div>
            
            <div className="relative w-full max-w-lg mx-auto m-6 rounded-lg border border-[var(--neutral-700)] bg-[var(--neutral-800)] text-white shadow-2xl">
                <div className="flex items-start justify-between p-4 border-b border-[var(--neutral-700)]">
                    <h3 className="text-xl font-semibold" id="modal-title">
                        {title}
                    </h3>
                    {isDismissible && (
                        <button 
                            onClick={onClose}
                            className="p-1 text-[var(--neutral-400)] hover:text-white transition-colors rounded-md hover:bg-[var(--neutral-700)]"
                            aria-label="Close modal"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    )}
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
