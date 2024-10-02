import { authGuard } from "../../utilities/authGuard";
import { onUpdateProfile } from "../../ui/profile/update.js";

authGuard();

// Check if the script is being executed
console.log("Profile page script is loaded");

// Attach event listener to the form
const form = document.forms.updateProfile;
if (form) {
  console.log("Found updateProfile form");
  form.addEventListener("submit", onUpdateProfile);
} else {
  console.log("updateProfile form not found");
}
