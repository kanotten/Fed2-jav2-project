let isDeletingPost = false;
let isDeletingComment = false;

async function deleteItem(url, isDeletingFlag, updateFlagFn) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!authToken || !apiKey || isDeletingFlag) return;

  updateFlagFn(true);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      const elementId = url.split("/").pop();
      document.getElementById(elementId)?.remove();
    }
  } catch (error) {
    console.error(`Error deleting item: ${error}`);
  } finally {
    updateFlagFn(false);
  }
}

export async function deletePost(postId) {
  await deleteItem(
    `https://v2.api.noroff.dev/social/posts/${postId}`,
    isDeletingPost,
    (flag) => (isDeletingPost = flag),
  );
}

export async function deleteComment(postId, commentId) {
  await deleteItem(
    `https://v2.api.noroff.dev/social/posts/${postId}/comment/${commentId}`,
    isDeletingComment,
    (flag) => (isDeletingComment = flag),
  );
}
