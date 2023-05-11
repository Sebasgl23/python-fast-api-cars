def productEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "price": item["price"],
        "description": item["description"],
        "image": item["image"],
        "stock": item["stock"],
    }


def productsEntityList(data) -> list:
    return [productEntity(item) for item in data]
