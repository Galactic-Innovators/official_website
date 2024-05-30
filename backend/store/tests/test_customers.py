import pytest
from rest_framework import status
from rest_framework.test import APIClient
from store.models import Customer
from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory
from factory import SubFactory,  LazyFunction

import factory
import datetime


# Factory for generating user data
class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = factory.Faker('user_name')
    email = factory.Faker('email')

class CustomerFactory(DjangoModelFactory):
    class Meta:
        model = Customer

    user = SubFactory(UserFactory)
    phone = factory.Faker('phone_number')  # Ensure realistic phone numbers
    birth_date = LazyFunction(datetime.date.today)  # Use current date or another appropriate default
    membership = 'B'  # Assuming 'B' is a valid membership type

# Pytest fixtures and test class
@pytest.mark.django_db
class TestCustomerCreation:
    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def customer(self):
        return CustomerFactory(phone='1234567890', birth_date=datetime.date(1990, 1, 1))

    def test_customer_list_authenticated_user(self, api_client, customer):
        api_client.force_authenticate(user=customer.user)
        url = "/store/customers/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK

    def test_customer_list_anonymous_user(self, api_client):
        url = "/store/customers/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_customer_instance_authorized_user(self, api_client, customer):
        api_client.force_authenticate(user=customer.user)
        url = f"/store/customers/{customer.id}/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK

        url = "/store/customers/me/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == customer.id

    def test_customer_instance_unauthorized_user(self, api_client):
        user_1 = UserFactory()
        user_2 = UserFactory()
        customer_2 = CustomerFactory(user=user_2)

        api_client.force_authenticate(user=user_1)
        url = f"/store/customers/{customer_2.id}/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_customer_instance_admin_user(self, api_client):
        admin_user = UserFactory(is_superuser=True, username="admin", email="admin@example.com")
        user_2 = UserFactory()
        customer_2 = CustomerFactory(user=user_2)

        api_client.force_authenticate(user=admin_user)
        url = f"/store/customers/{customer_2.id}/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK

    def test_customer_instance_anonymous_user(self, api_client):
        url = "/store/customers/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

# Make sure to have factory_boy installed to use these factories:
# pip install factory_boy
