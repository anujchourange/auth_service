# auth_service
This repo consists of the backend for a auth service that is a basic app.

## Features
- User Signup / Signin
- JWT based Authentication System
- User Profile

#### Authentication
- - -

| Method      | Path |   
| ---        |    ----   |  
| post      | /auth/register      |
| post   | /auth/login       | 

- - -

#### User

- - -

| Method      | Path |    
| ---        |    ----  | 
| get   | /user/profile      |
- - -

<br/>
### Usage 
  >fork this repo and clone it on your system
  >rename the .env copy file to just .env file and the variables according to your project
  
```bash
git clone https://github.com/<your user name>/auth_service.git
cd auth_service
npm install
npm run dev
```
This will start the development server on `http://localhost:8000/`. This should reload automatically when you make changes to the code, but no code is perfect, so sometimes you may need to restart it. :)
  

