"use client";

// Checkout attempt tracking utilities

export interface CheckoutAttempt {
    productId: number;
    productName: string;
    price: number;
    timestamp: number;
    sessionId?: string;
    status: "started" | "completed" | "abandoned" | "declined";
}

export interface CheckoutHistory {
    attempts: CheckoutAttempt[];
    lastChecked: number;
}

const STORAGE_KEY = "secretly_checkout_history";
const MAX_ATTEMPTS_BEFORE_INTERVENTION = 2;

// Get checkout history from localStorage
export function getCheckoutHistory(): CheckoutHistory {
    if (typeof window === "undefined") {
        return { attempts: [], lastChecked: 0 };
    }
    
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Error reading checkout history:", error);
    }
    
    return { attempts: [], lastChecked: 0 };
}

// Save checkout history to localStorage
export function saveCheckoutHistory(history: CheckoutHistory): void {
    if (typeof window === "undefined") return;
    
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.error("Error saving checkout history:", error);
    }
}

// Record a new checkout attempt
export function recordCheckoutAttempt(
    productId: number,
    productName: string,
    price: number,
    sessionId?: string
): void {
    const history = getCheckoutHistory();
    
    // Add new attempt
    history.attempts.push({
        productId,
        productName,
        price,
        timestamp: Date.now(),
        sessionId,
        status: "started",
    });
    
    // Keep only last 10 attempts
    if (history.attempts.length > 10) {
        history.attempts = history.attempts.slice(-10);
    }
    
    saveCheckoutHistory(history);
}

// Update the status of the last attempt
export function updateLastAttemptStatus(status: CheckoutAttempt["status"], sessionId?: string): void {
    const history = getCheckoutHistory();
    
    if (history.attempts.length > 0) {
        const lastAttempt = history.attempts[history.attempts.length - 1];
        lastAttempt.status = status;
        if (sessionId) {
            lastAttempt.sessionId = sessionId;
        }
        saveCheckoutHistory(history);
    }
}

// Get recent failed/abandoned attempts for a specific product (last 24 hours)
export function getRecentFailedAttempts(productId?: number): CheckoutAttempt[] {
    const history = getCheckoutHistory();
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    return history.attempts.filter(attempt => {
        const isRecent = attempt.timestamp > oneDayAgo;
        const isFailed = attempt.status === "abandoned" || attempt.status === "declined";
        const matchesProduct = productId ? attempt.productId === productId : true;
        return isRecent && isFailed && matchesProduct;
    });
}

// Check if we should show intervention (payment assistance)
export function shouldShowPaymentAssistance(productId?: number): boolean {
    const failedAttempts = getRecentFailedAttempts(productId);
    return failedAttempts.length >= MAX_ATTEMPTS_BEFORE_INTERVENTION;
}

// Get the last pending checkout session ID
export function getLastPendingSession(): string | null {
    const history = getCheckoutHistory();
    
    // Find the most recent "started" attempt
    for (let i = history.attempts.length - 1; i >= 0; i--) {
        const attempt = history.attempts[i];
        if (attempt.status === "started" && attempt.sessionId) {
            return attempt.sessionId;
        }
    }
    
    return null;
}

// Clear checkout history (after successful purchase or user request)
export function clearCheckoutHistory(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
}

// Mark all pending attempts as abandoned (only recent ones - last 1 hour)
export function markPendingAsAbandoned(): void {
    const history = getCheckoutHistory();
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    let markedCount = 0;
    
    history.attempts = history.attempts.map(attempt => {
        // Only mark recent "started" attempts as abandoned
        if (attempt.status === "started" && attempt.timestamp > oneHourAgo) {
            markedCount++;
            console.log("[Checkout Tracker] Marking as abandoned:", attempt.productName);
            return { ...attempt, status: "abandoned" as const };
        }
        return attempt;
    });
    
    if (markedCount > 0) {
        saveCheckoutHistory(history);
        console.log(`[Checkout Tracker] Marked ${markedCount} pending attempt(s) as abandoned`);
    }
}

// Debug function - can be called from browser console
export function debugCheckoutTracker(): void {
    const history = getCheckoutHistory();
    const failed = getRecentFailedAttempts();
    console.log("=== Checkout Tracker Debug ===");
    console.log("All attempts:", history.attempts);
    console.log("Failed attempts (last 24h):", failed);
    console.log("Should show assistance:", failed.length >= 2);
    console.log("==============================");
}

// Expose debug function to window for testing
if (typeof window !== "undefined") {
    (window as unknown as { debugCheckoutTracker: typeof debugCheckoutTracker }).debugCheckoutTracker = debugCheckoutTracker;
}
