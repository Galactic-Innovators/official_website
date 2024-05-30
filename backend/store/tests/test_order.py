import pytest
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from store.models import Order, Cart, CartItem
from factory.django import DjangoModelFactory
from factory import SubFactory, post_generation
from factory.fuzzy import FuzzyInteger

# Factories for generating test data
class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = 'test_user'
    email = 'testuser@example.com'

class CartFactory(DjangoModelFactory):
    class Meta:
        model = Cart

    # Assuming 'customer' field on Cart model maps to a User
    customer = SubFactory(UserFactory)

class CartItemFactory(DjangoModelFactory):
    class Meta:
        model = CartItem

    cart = SubFactory(CartFactory)
    quantity = FuzzyInteger(1, 5)  # Creates a random integer between 1 and 5

# Test class
@pytest.mark.django_db
class TestCreateCollection:

    @pytest.fixture
    def api_client(self):
        return APIClient()

    def test_if_user_is_anonymous_returns_401(self, api_client):
        response = api_client.post("/store/orders/", {"cart_id": ""})
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_data_is_invalid_returns_400(self, api_client):
        user = UserFactory()
        api_client.force_authenticate(user=user)
        response = api_client.post("/store/orders/", {"cart_id": ""})
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_data_is_valid_returns_200(self, api_client):
        user = UserFactory()
        api_client.force_authenticate(user=user)
        cart = CartFactory(customer=user)
        CartItemFactory(cart=cart, quantity=1)  # Creating a cart item
        response = api_client.post(f"/store/orders/", {"cart_id": cart.id})
        assert response.status_code == status.HTTP_200_OK
        assert 'customer' in response.data

    def test_retrieve_orders(self, api_client):
        user = UserFactory()
        api_client.force_authenticate(user=user)
        cart = CartFactory(customer=user)
        CartItemFactory(cart=cart, quantity=1)
        response = api_client.post(f"/store/orders/", {"cart_id": cart.id})
        order_id = response.data["id"]
        response = api_client.get(f"/store/orders/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data[0]["id"] == order_id

# Ensure FactoryBoy is installed to use these factories:
# pip install factory_boy
