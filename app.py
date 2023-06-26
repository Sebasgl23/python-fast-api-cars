import fastapi as FastAPI
from routes.products import product
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product)
