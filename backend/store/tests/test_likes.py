import pytest
from rest_framework import status
from rest_framework.test import APIClient
from store.models import Product
from factory.django import DjangoModelFactory
from factory import SubFactory

from django.contrib.auth import get_user_model


# Factories for generating test data
class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = "testuser"
    email = "testuser@example.com"
    password = "password"


class ProductFactory(DjangoModelFactory):
    class Meta:
        model = Product

    name = "Sample Product"
    description = "Description of sample product"
    price = 10.00  # Example field, adjust based on your actual Product model fields


# Function to find a liked item ID in a JSON array based on a given product ID.
def find_liked_item_id_from_product_id(json_array, product_id):
    for json_object in json_array:
        if json_object.get("product", {}).get("id") == product_id:
            item_id = json_object.get("id")
            assert item_id is not None, "The 'id' for the product should not be None."
            return item_id
    assert False, "Product ID not found in the list."


# Pytest fixture to create an API client and authenticate a user
@pytest.fixture
def api_client():
    client = APIClient()
    user = UserFactory()
    client.force_authenticate(user=user)
    return client


# Pytest fixture to create 'likes' via POST request
@pytest.fixture
def create_likes(api_client):
    return api_client.post("/store/likes/")


# Test class for creating and managing likes
@pytest.mark.django_db
class TestCreateLikes:
    def test_create_likes(self, create_likes):
        response = create_likes
        assert response.status_code == status.HTTP_201_CREATED
        assert "id" in response.data and response.data["id"]

    def test_retrieve_likes(self, api_client, create_likes):
        response = create_likes
        likes_id = response.data["id"]
        response = api_client.get(f"/store/likes/{likes_id}/items/")
        assert response.status_code == status.HTTP_200_OK

    def test_add_product_to_likes_if_data_invalid(self, api_client, create_likes):
        response = create_likes
        likes_id = response.data["id"]
        response = api_client.post(
            f"/store/likes/{likes_id}/items/", {"product_id": "a"}
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_add_product_to_likes_if_data_valid(self, api_client, create_likes):
        product = ProductFactory()
        response = create_likes
        likes_id = response.data["id"]
        response_item_added = api_client.post(
            f"/store/likes/{likes_id}/items/", {"product_id": product.id}
        )
        assert response_item_added.status_code == status.HTTP_201_CREATED

    def test_delete_product_from_likes(self, api_client, create_likes):
        product = ProductFactory()
        response = create_likes
        likes_id = response.data["id"]
        api_client.post(f"/store/likes/{likes_id}/items/", {"product_id": product.id})
        response_item_added = api_client.get(f"/store/likes/{likes_id}/items/")
        assert len(response_item_added.data) > 0
        liked_item_id = find_liked_item_id_from_product_id(
            response_item_added.data, product.id
        )
        response_item_deleted = api_client.delete(
            f"/store/likes/{likes_id}/items/{liked_item_id}/"
        )
        assert response_item_deleted.status_code == status.HTTP_204_NO_CONTENT


# Note: Ensure that FactoryBoy is installed and properly configured for your project to use these factories.
