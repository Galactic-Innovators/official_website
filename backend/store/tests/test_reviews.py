from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
import pytest
from store.models import Customer, Product, Review, Order, OrderItem
from core.models import User
from factory.django import DjangoModelFactory
from factory import SubFactory, post_generation

# Define factories for your models
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
    description = 'Sample Description'

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

class ReviewFactory(DjangoModelFactory):
    class Meta:
        model = Review

    product = SubFactory(ProductFactory)
    customer = SubFactory(CustomerFactory)
    rating = 5
    description = 'Excellent!'

@pytest.mark.django_db
class TestReviews:
    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def user(self):
        return UserFactory()

    @pytest.fixture
    def customer(self, user):
        customer, _ = Customer.objects.get_or_create(user=user)
        return customer

    @pytest.fixture
    def product(self):
        return ProductFactory()

    @pytest.fixture
    def order(self, customer, product):
        order = OrderFactory(customer=customer)
        OrderItemFactory(order=order, product=product)
        return order

    @pytest.fixture
    def review_data(self, product):
        return {
            "product": product.id,
            "name": "Test User",
            "rating": "4.5",
            "description": "This is a test review."
        }

    def test_reading_reviews_of_product(self, product, api_client, customer):
        review = ReviewFactory(product=product, customer=customer)
        url = f"/store/products/{product.id}/reviews/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["rating"] == str(review.rating)  # Ensure type consistency in comparison
        assert response.data[0]["description"] == review.description

    def test_create_review_unlogged_in(self, api_client, product, review_data):
        url = f"/store/products/{product.id}/reviews/"
        response = api_client.post(url, review_data, format="json")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert not Review.objects.filter(product=product).exists()

    def test_create_review_with_ordered_product(self, user, product, order, api_client, review_data):
        api_client.force_authenticate(user=user)
        url = f"/store/products/{product.id}/reviews/"
        response = api_client.post(url, review_data, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert Review.objects.filter(product=product).exists()

    def test_create_review_did_not_order_product(self, user, product, api_client, review_data):
        api_client.force_authenticate(user=user)
        url = f"/store/products/{product.id}/reviews/"
        response = api_client.post(url, review_data, format="json")
        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert not Review.objects.filter(product=product).exists()
