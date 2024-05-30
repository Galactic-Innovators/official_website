import pytest
from factory import DjangoModelFactory, SubFactory
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from store.models import Customer, Order, OrderItem, Product

# Define factories
class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()
    
    username = 'user'
    email = 'user@example.com'

class CustomerFactory(DjangoModelFactory):
    class Meta:
        model = Customer
    
    user = SubFactory(UserFactory)

class ProductFactory(DjangoModelFactory):
    class Meta:
        model = Product
    
    name = 'Sample Product'
    price = 9.99

class OrderFactory(DjangoModelFactory):
    class Meta:
        model = Order
    
    customer = SubFactory(CustomerFactory)

class OrderItemFactory(DjangoModelFactory):
    class Meta:
        model = OrderItem
    
    order = SubFactory(OrderFactory)
    product = SubFactory(ProductFactory)
    quantity = 1

# Define the test class
@pytest.mark.django_db
class TestRecommendation:
    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def user(self):
        return UserFactory()

    @pytest.fixture
    def customer(self, user):
        return CustomerFactory(user=user)

    def test_recommendation_anonymous_user(self, api_client):
        url = "/store/recommendation/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_recommendation_authenticated_user_no_order(self, api_client, customer):
        api_client.force_authenticate(user=customer.user)
        url = "/store/recommendation/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK

    def test_recommendation_authenticated_user_with_order(self, api_client, customer):
        order = OrderFactory(customer=customer)
        product = ProductFactory()
        order_item = OrderItemFactory(order=order, product=product)
        api_client.force_authenticate(user=customer.user)
        url = "/store/recommendation/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK

# Execute the tests as needed
