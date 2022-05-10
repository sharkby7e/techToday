const addComment = async (e) => {
  e.preventDefault();
  const body = document.querySelector("#commentInput").value.trim();
  const post_id = window.location.href.split("/").pop();
  // console.log(comment);
  // console.log(postId);
  if (body && post_id) {
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ body, post_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      document.location.replace(`/posts/${post_id}`);
    } else {
      res.json().then((data) => alert(data.message));
    }
  }
};

$("#commentForm").on("submit", addComment);
