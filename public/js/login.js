$("#login").on("click", loginButtonGo);
const loginButtonGo = async (e) => {
  e.preventDefault();
  const email = $("#email");
  const pass = $("#pass");

  if (email && pass) {
    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, pass }),
    });

    if (res.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(res.statusText);
    }
  }
};
