from pydantic import BaseModel
from typing import Optional


class Product(BaseModel):
    _id: Optional[str]
    name: str
    price: float
    description: str
    image: str
    stock: int
