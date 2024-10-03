import { authGuard } from "../../utilities/authGuard.js";
import { displayUserPosts } from "../../ui/profile/update.js";

authGuard();

document.addEventListener("DOMContentLoaded", displayUserPosts);
