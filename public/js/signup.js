const signUpGo = async (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#signUpEmail").value.trim();
  const password = document.querySelector("#signUpPassword").value.trim();

  if (name && email && password) {
    console.log(name);
    const res = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      document.location.replace("/dashboard");
    } else {
      res.json().then((data) => alert(data.message));
    }
  }
};

$("#signUp").on("submit", signUpGo);
$("#signUpButton").on("click", signUpGo);
