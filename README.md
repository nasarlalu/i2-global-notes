# i2 Global Notes - Minimal Note-Taking Application
A streamlined note-taking application built with Next.js, featuring a clean black-and-white design and efficient data management.

## Installation & Local Setup

### Prerequisites
- Node.js v22+
- MongoDB Atlas account
- npm v10+


## Live Demo
[https://i2-global-notes.vercel.app](https://i2-global-notes.vercel.app)

## Features
- User authentication (Sign up/Log in)
- Create, edit, and delete notes
- Storage with MongoDB
- Minimalist UI/UX


### Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/nasarlalu/i2-global-notes.git
cd i2-global-notes
```

2. Create environment file:
```bash
.env.local
```

3. Update environment variables in .env.local:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=secret_string
```

4. Install dependencies and run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
