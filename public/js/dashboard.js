const updateDestroy = async (e) => {
  e.preventDefault();
  if (e.target.hasAttribute("del-id")) {
    const id = e.target.getAttribute("del-id");
    const res = await fetch(`api/posts/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      document.location.replace("/dashboard");
    }
  }

  if (e.target.hasAttribute("up-id")) {
    const id = e.target.getAttribute("up-id");
    console.log(e.target.getAttribute("up-id"));
    document.getElementById(`updatePost${id}`).classList.remove("hide");
    document
      .getElementById(`updatePost${id}`)
      .addEventListener("submit", async function (e) {
        const body = document.getElementById(`updateText${id}`).value.trim();
        e.preventDefault();
        const res = await fetch(`api/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify({ body }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          document.location.replace(`posts/${id}`);
        }
      });
  } else if (e.target.hasAttribute("link-id")) {
    const id = e.target.getAttribute("link-id");
    document.location.replace(`/posts/${id}`);
  }
};

const newPostBox = document.getElementById("newPostBox");

const makeNewPost = async (e) => {
  e.preventDefault;
  newPostBox.classList.remove("hide");
  newPostBox.addEventListener("submit", async function (e) {
    e.preventDefault();
    const title = document.getElementById("newPostTitle").value.trim();
    const body = document.getElementById("newPostText").value.trim();
    console.log(title);
    console.log(body);
    if (title && body) {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        document.location.replace("/dashboard");
      }
    } else {
      alert("please fill out form fully");
    }
  });
};
// const update = async (e) => {
//   e.preventDefault();
//   console.log(e.target.getAttribute("up-id"));
//   // if (e.target.hasAttribute("up-id")) {
//   //   const id = e.target.getAttribute("up-id");
//   //   document.getElementById(`updatePost${id}`).classList.remove("hide");
//   //   const update = document.getElementById(`updateText${id}`).value.trim();
//   //   const res = await fetch(`api/posts/${id}`, {
//   //     method: "PUT",
//   //     body: JSON.stringify({ update }),
//   //   });
//   //   if (res.ok) {
//   //     document.location.replace("/dashboard");
//   //   }
//   // }
// };
//
$("#newPost").on("click", makeNewPost);

$("#userPosts").on("click", updateDestroy);
