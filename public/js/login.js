const loginButtonGo = async (e) => {
  e.preventDefault();
  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPass").value.trim();

  console.log(email);
  console.log(password);
  if (email && password) {
    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      document.location.replace("/dashboard");
      res.json().then((data) => alert(data.message));
    } else {
      res.json().then((data) => alert(data.message));
    }
  }
};

$("#login").on("submit", loginButtonGo);
$("#loginBut").on("click", loginButtonGo);
