# SabzCourse API

**This is the backend I built to really master Node.js, Express, and MongoDB — not by watching, but by doing.**

## What this is (and what it isn't)

SabzCourse is my playground for building a real backend — with scalability in mind from day one.  
The main goal? Move beyond simple CRUD and build something with a proper MVC structure.

Here's what I worked on the most:

- Getting comfortable with **Node.js & Express** — not just syntax, but how they work under the hood  
- Learning **MongoDB data modeling** the hard way — one `populate` at a time  
- Figuring out how to connect collections cleanly (courses ↔ chapters ↔ lessons ↔ comments)  
- Organizing code the way I've seen in professional projects — even if it's not perfect yet

> ⚠️ **Note:** This project isn't finished. I'm still learning, and the code shows it. But that's exactly why I'm sharing it.



## ✨ What it can do (the short version)

- You can **sign up / log in** – and depending on your role, you'll see different things.  
- **Courses** aren't just a title. Each course has chapters, and each chapter has lessons. I built the whole hierarchy.  
- **Articles** work like a blog – create, edit, delete.  
- **Comments** can have replies. So people can actually talk.  
- **Discounts** exist (because who doesn't love a discount?).  
- **Admins** have their own endpoints. Normal users can't touch them – that's what middleware is for.  
- And everything is connected with MongoDB references and `populate`. No broken links (hopefully 😅).


## 🛠 What I built it with (and why)

- **Node.js** – Because JavaScript on the backend just makes sense to me.  
- **Express.js** – Lightweight, flexible, and gets out of my way when I need to build APIs fast.  
- **MongoDB** – I wanted to work with documents, not tables. Flexible schema helped me model courses, chapters, and lessons easily.  
- **Mongoose** – The ODM that holds everything together. Loved using `populate` to connect different collections.  
- **JSON Web Token (JWT)** – Simple and stateless authentication.  
- **bcrypt** – Hashing passwords before saving them. Because plain text is a no-go.  
- **multer** – For handling file uploads (course images, article thumbnails, etc.).  
- **dotenv** – For keeping secrets (database URIs, JWT keys, etc.) out of my code.

I also wrote a couple of custom middlewares: one for authentication (checking if the user is logged in) and another for authorization (restricting access to admin-only routes). While not overly complex, they are effective in enforcing security policies.
