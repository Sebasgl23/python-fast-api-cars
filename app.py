import fastapi as FastAPI
from routes.products import product

app = FastAPI.FastAPI()

app.include_router(product)
