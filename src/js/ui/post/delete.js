let isDeletingPost = false;
let isDeletingComment = false;

export async function deletePost(postId) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!authToken || !apiKey || isDeletingPost) return;

  try {
    isDeletingPost = true;
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 204) {
      const postElement = document.getElementById(`post-${postId}`);
      if (postElement) postElement.remove();
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  } finally {
    isDeletingPost = false;
  }
}

export async function deleteComment(postId, commentId) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!authToken || !apiKey || isDeletingComment) return;

  try {
    isDeletingComment = true;
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 204) {
      const commentElement = document.getElementById(`comment-${commentId}`);
      if (commentElement) commentElement.remove();
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  } finally {
    isDeletingComment = false;
  }
}
