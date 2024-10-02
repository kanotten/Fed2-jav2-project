
# Blog Platform - JavaScript 2 Course Assignment

## Project Overview

- This project is a **client-side social media application** built as part of the JavaScript 2 course assignment. The application allows users to create, view, edit, and delete their own posts. It also supports viewing posts from other users, with potential features like following/unfollowing users, commenting on posts, and reacting with emojis.

- The project uses **Vite** as a build tool and is structured as a **multi-page application (MPA)** using vanilla JavaScript. It interacts with the provided API to perform CRUD operations (Create, Read, Update, Delete) on posts.

### Key Features

- **User Authentication**: Register and login with JWT token-based authentication.
- **Post Management**: Create, view, edit, and delete posts.
- **Profile Management**: View user profiles and posts created by each user.
- **Social Features**: Interact with posts through comments, reactions, and following/unfollowing users.

### Project Structure

The project follows a modular structure with separate folders for different features like authentication, posts, and profiles:
src/ ├── api/ # API calls for different sections (auth, post, profile)
├── css/ # Stylesheets for the application
├── js/ │
├── router/ # Routing logic for handling different pages │
├── ui/ # UI components and functionality for different views │
└── utilities/ # Utility functions like authentication guards
├── profile/ # HTML for the profile page
└── post/ # HTML for post-related pages (create, edit)


## Installation and Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Vite** (installed globally)

### Downloading the Project

1. **Clone the repository**:

```bash
   git clone https://github.com/your-username/blog-platform.git
```

2.

```cd blog-platform
```

Installing Dependencies
Use npm to install all required dependencies:

```npm install
```

Running the Project
Start the development server using Vite:

````npm run dev

Building the Project
To create a production build:

```npm run build


Accessing the Project
Once the development server is running, you can access the project at:
http://localhost:5173

###Using Vite in the Project
This project is set up with Vite as the build tool. Vite is a fast front-end build tool that provides a development server with hot-module replacement (HMR) and optimized build output.

###Available Scripts
npm run dev: Starts the development server.
npm run build: Builds the project for production.
npm run preview: Preview the production build locally.
Functionality and Code Overview
Key JavaScript Functions
1. readUserPosts - (Located in src/js/api/profile/read.js)
This function retrieves all posts created by a specific user from the /social endpoint.

Parameters:

username: The username of the user whose posts are being retrieved.
Returns: A JSON object containing an array of posts.

Example:

```javascript
const posts = await readUserPosts("kenneth");
console.log(posts);
```

###2. onUpdateProfile - (Located in src/js/ui/profile/update.js)
This function is triggered when the "Update Profile" button is clicked on the profile page. It fetches and displays posts created by the logged-in user.

Parameters:
event: The event object from the button click.
Returns: Renders the user-specific posts on the profile page.
3. createPost - (Located in src/js/api/post/create.js)
This function sends a POST request to create a new post using the blog or social endpoint.

Parameters:
post: An object containing title, body, tags, and media properties.
Returns: A JSON object with the newly created post.
4. getPosts - (Located in src/js/api/post/read.js)
This function retrieves all posts from the /social/posts endpoint and is used on the home page to display all posts.

Parameters: None.
Returns: A JSON object containing an array of all available posts.
Known Issues and To-Do List
Posts created using the blog endpoint are not appearing correctly on pages using social endpoints.
Profile page currently shows no posts if created using a different endpoint.
Further testing and debugging needed to align all CRUD operations under consistent endpoints.

###Future Enhancements
- Implement comment and reaction features for posts.
- Add follower/following functionality for profiles.
- Refactor code for better error handling and user experience.
