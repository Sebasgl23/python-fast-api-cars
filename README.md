# Python Cars parts store API
This is an API for a car parts store made with Python, FastAPI and MongoDB


##  How to run the project

Firt of all you can create a virtual enviroment with the help of Anaconda, to keep all the dependencies isolated, using the command `` conda create --name TheNameOfTheEnviroment`` and the activate this with ``conda activate TheNameOfTheEnviroment``

Then you need to install all the dependencies needed to run the projects, for this just run the command  ``pip install -r requirements.txt`` in the directory of the project.

Before of that you just need to run the command ``uvicorn app:app --reload`` to start the server in development mode.

To try the API you can go to the URL ``localhost:8000/docs`` once the server is up.

## Stack

* Python 3.11.3
* MongoDB
