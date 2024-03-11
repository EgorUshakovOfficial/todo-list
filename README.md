## About Project

A web application designed for managing project workflows, enabling users to log in and create projects. Once a project is created, users can generate features and choose to add them to one of the three lists: to-do, in-progress, and done. Within each feature, users have the option to create user stories and further break them down into developer tasks. The application facilitates the process of breaking down complex projects into smaller tasks, aiding users in optimizing their time and successfully completing their projects.

## Architecture

This project uses React in the front-end and integrates with the Django back-end, which is connected to the PostgreSQL database.


## How to run the project in development environment?

If you are interested in cloning and running the project on your local machine, please follow the outlined steps in the front-end and back-end sub-sections. Begin installing and configuring the back-end of the application before preceding to the front-end, as the front-end depends on the back-end. Failure to follow this sequence may result in errors.

### Back-end Setup
1. After the code repository has been cloned, change to the backend folder by running <code>cd backend</code>
2. Create a virtual environment by executing <code>python -m venv venv</code>
3. Activate the virtual environment by using <code>venv\Scripts\activate</code>, if you are using Windows as your OS. If you are using Linux or IOS, use <code>venv/Scripts/activate</code>.
4. Run <code>pip install --upgrade pip</code> to upgrade the version of pip
5. Install all required dependencies by using <code>pip install -r requirements.txt</code>
6. Copy the content of <code>.env.sample</code> into <code>.env</code> file. Modify DB_USER, DB_PASSWORD, and DB_NAME variables, according to the PostgreSQL configurations. If you are having trouble integrating the database to Django, please revisit <bold>PostgreSQL Setup</bold> section.
7. Change to the todolist directoty by running <code>cd todolist</code>
8. Execute <code>python manage.py makemigrations && python manage.py migrate</code> to perform database migration.
9. Finally, start the backend servcer by using <code>python manage.py server</code>

### Front-end Setup
1. Change directory to the frontend directory by running <code>cd frontend</code>.
2. Install package dependencies by using <code>npm install</code>
3. Execute <code>npm run start</code> to start React application.




