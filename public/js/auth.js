/**
 * Author: Arnaud Faille
 * Code inspired from https://stackoverflow.com/questions/29775797/fetch-post-json-data
 * @returns User to json value if logged in
 */
 async function getUser() {
    const rawResponse = await fetch('http://localhost:3000/api/auth/me', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'x-access-token': encodeURIComponent(localStorage.getItem('token'))
        }
    });
    return await rawResponse.json();;
}