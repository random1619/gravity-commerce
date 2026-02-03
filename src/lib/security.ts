// Security utility functions for input validation and sanitization

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validates password strength
 */
export function isValidPassword(password: string): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }
    if (password.length > 128) {
        errors.push('Password too long');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain uppercase letter');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain number');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Sanitizes string input to prevent XSS
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
    if (typeof input !== 'string') return '';

    return input
        .slice(0, maxLength)
        .replace(/[<>]/g, '') // Remove < and > to prevent script tags
        .trim();
}

/**
 * Validates and sanitizes numeric input
 */
export function sanitizeNumber(
    input: string | number | null | undefined,
    min?: number,
    max?: number
): number | null {
    const num = Number(input);

    if (isNaN(num) || !isFinite(num)) {
        return null;
    }

    if (min !== undefined && num < min) return null;
    if (max !== undefined && num > max) return null;

    return num;
}

/**
 * Rate limiter for API endpoints (in-memory, for demo)
 * In production, use Redis or similar
 */
class RateLimiter {
    private requests: Map<string, number[]> = new Map();
    private readonly maxRequests: number;
    private readonly windowMs: number;

    constructor(maxRequests: number = 100, windowMs: number = 60000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }

    check(identifier: string): boolean {
        const now = Date.now();
        const userRequests = this.requests.get(identifier) || [];

        // Remove old requests outside the window
        const validRequests = userRequests.filter(time => now - time < this.windowMs);

        if (validRequests.length >= this.maxRequests) {
            return false; // Rate limit exceeded
        }

        validRequests.push(now);
        this.requests.set(identifier, validRequests);

        // Cleanup old entries
        if (this.requests.size > 10000) {
            this.cleanup();
        }

        return true;
    }

    private cleanup() {
        const now = Date.now();
        for (const [key, times] of this.requests.entries()) {
            const validTimes = times.filter(t => now - t < this.windowMs);
            if (validTimes.length === 0) {
                this.requests.delete(key);
            } else {
                this.requests.set(key, validTimes);
            }
        }
    }
}

// Export singleton instance
export const apiRateLimiter = new RateLimiter(100, 60000); // 100 requests per minute

/**
 * Validates product ID format
 */
export function isValidProductId(id: string): boolean {
    return /^[a-zA-Z0-9_-]+$/.test(id) && id.length <= 50;
}

/**
 * Validates category name
 */
export function isValidCategory(category: string): boolean {
    const validCategories = [
        'T-Shirts',
        'Bottoms',
        'Hoodies',
        'Accessories',
        'Outerwear',
    ];
    return validCategories.includes(category);
}
