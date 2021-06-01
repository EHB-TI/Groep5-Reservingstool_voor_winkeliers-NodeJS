async function logout(){
    let user = await getUser();

    localStorage.removeItem("token");
    window.location.href = "../";
}

logout();