import pytest
from factory.django import DjangoModelFactory
from factory import SubFactory
from rest_framework import status
from rest_framework.test import APIClient
from store.models import Product
from django.contrib.auth import get_user_model

# Factory for generating user data
class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = 'testuser'
    email = 'testuser@example.com'
    password = 'password'
    is_staff = True  # Assuming staff status is required for some operations

# Factory for generating product data
class ProductFactory(DjangoModelFactory):
    class Meta:
        model = Product

    name = 'Sample Product'
    price = 10.00  # Adjust based on your Product model

# Helper function to find a cart item ID based on a product ID
def find_cart_item_id_from_product_id(json_array, product_id):
    for json_object in json_array:
        if json_object.get("product", {}).get("id") == product_id:
            item_id = json_object.get("id")
            assert item_id is not None, "The 'id' for the product should not be None."
            return item_id
    assert False, "Product ID not found in the list."

# Fixture for creating API client
@pytest.fixture
def api_client():
    return APIClient()

# Fixture for authenticating API client
@pytest.fixture
def authenticate(api_client):
    user = UserFactory()
    api_client.force_authenticate(user=user)
    return api_client

# Fixture for creating a cart
@pytest.fixture
def create_cart(api_client, authenticate):
    authenticate()
    return api_client.post("/store/carts/")

# Test class for cart operations
@pytest.mark.django_db
class TestCreateCart:
    def test_create_cart(self, create_cart):
        response = create_cart
        assert response.status_code == status.HTTP_201_CREATED
        assert "id" in response.data and response.data["id"]

    def test_retrieve_carts(self, api_client, create_cart):
        response = create_cart
        cart_id = response.data["id"]
        response = api_client.get(f"/store/carts/{cart_id}/items/")
        assert response.status_code == status.HTTP_200_OK

    def test_add_product_to_cart_if_data_invalid(self, api_client, create_cart):
        product = ProductFactory()
        response = create_cart
        cart_id = response.data["id"]
        response = api_client.post(f"/store/carts/{cart_id}/items/", {"product_id": product.id, "quantity": -1})
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_add_product_to_cart_if_data_valid(self, api_client, create_cart):
        product = ProductFactory()
        response = create_cart
        cart_id = response.data["id"]
        response_item_added = api_client.post(f"/store/carts/{cart_id}/items/", {"product_id": product.id, "quantity": 10})
        assert response_item_added.status_code == status.HTTP_201_CREATED
        assert response_item_added.data["product_id"] == product.id
        assert response_item_added.data["quantity"] == 10

    def test_delete_item_from_cart(self, api_client, create_cart):
        product = ProductFactory()
        response = create_cart
        cart_id = response.data["id"]
        response_item_added = api_client.post(f"/store/carts/{cart_id}/items/", {"product_id": product.id, "quantity": 10})
        response_item_added = api_client.get(f"/store/carts/{cart_id}/items/")
        assert len(response_item_added.data) > 0
        cart_item_id = find_cart_item_id_from_product_id(response_item_added.data, product.id)
        response_item_deleted = api_client.delete(f"/store/carts/{cart_id}/items/{cart_item_id}/")
        assert response_item_deleted.status_code == status.HTTP_204_NO_CONTENT
