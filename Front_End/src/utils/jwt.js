export function decodeToken(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

export function getRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = decodeToken(token);
    return decoded?.role ?? null;
}

export function isTokenExpired() {
    const token = localStorage.getItem('token');
    if (!token) return true;
    const decoded = decodeToken(token);
    if (!decoded?.exp) return true;
    return decoded.exp * 1000 < Date.now();
}