async function getUser() {
    const rawResponse = await fetch('../api/auth/me', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'x-access-token': encodeURIComponent(localStorage.getItem('token'))
        }
    });
    return await rawResponse.json();;
}