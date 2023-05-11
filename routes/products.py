from fastapi import APIRouter, Response
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT

from config.db import client
from schemas.products import productEntity, productsEntityList
from models.products import Product

product = APIRouter()


@product.get("/products")
def get_products():
    return productsEntityList(client.cars.products.find())


@product.get("/products/{product_id}")
def get_product(product_id: str):
    return productEntity(client.cars.products.find_one({"_id": ObjectId(product_id)}))


@product.post("/products")
def create_product(product: Product):
    new_product = dict(product)

    if new_product["price"] <= 0:
        return "Price must be greater than 0"

    if new_product["stock"] < 0:
        return "Stock must be greater than or equal to 0"

    id = client.cars.products.insert_one(new_product).inserted_id

    return productEntity(client.cars.products.find_one({"_id": id}))


@product.patch("/products/{product_id}")
def edit_product(product_id: str, product: Product):
    edit_product = dict(product)

    product = client.cars.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        return "Product not found"

    if edit_product["price"] <= 0:
        return "Price must be greater than 0"

    if edit_product["stock"] < 0:
        return "Stock must be greater than or equal to 0"

    client.cars.products.update_one(
        {"_id": ObjectId(product_id)}, {"$set": edit_product}
    )

    return productEntity(client.cars.products.find_one({"_id": ObjectId(product_id)}))


@product.delete("/products/{product_id}")
def delete_product(product_id: str):
    product = client.cars.products.find_one({"_id": ObjectId(product_id)})
    if product:
        client.cars.products.delete_one({"_id": ObjectId(product_id)})
        return Response(status_code=HTTP_204_NO_CONTENT)
    else:
        return "Product not found"
