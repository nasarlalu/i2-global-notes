export const login = (token, username, email) => {
    const userData = {
        username,
        email
    }
    if (!token || !username || !email) {
        throw new Error('No login data');
    }
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
}

export const logout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}