import pytest
from factory.django import DjangoModelFactory
from factory import SubFactory,  LazyFunction
from rest_framework import status
from rest_framework.test import APIClient
from store.models import Customer
from django.contrib.auth import get_user_model
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

# Fixture for API client
@pytest.fixture
def api_client():
    return APIClient()

# Fixture for authenticated API client
@pytest.fixture
def authenticate(api_client):
    user = UserFactory()
    api_client.force_authenticate(user=user)
    return user

# Test class for address management
@pytest.mark.django_db
class TestAddresses:
    @pytest.fixture
    def customer(self):
        return CustomerFactory(phone='1234567890', birth_date=datetime.date(1990, 1, 1))

    def test_addresses_list_authorized_user(self, api_client, customer):
        api_client.force_authenticate(user=customer.user)
        url = f"/store/customers/{customer.id}/addresses/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK

    def test_addresses_list_anonymous_user(self, api_client, customer):
        url = f"/store/customers/{customer.id}/addresses/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_addresses_list_unauthorized_user(self, api_client):
        user_1 = UserFactory()
        customer_1 = CustomerFactory(user=user_1)
        user_2 = UserFactory()
        customer_2 = CustomerFactory(user=user_2)

        api_client.force_authenticate(user=user_1)
        url = f"/store/customers/{customer_2.id}/addresses/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_addresses_list_admin_user(self, api_client):
        admin_user = UserFactory(is_superuser=True, username="admin", email="admin@example.com")
        api_client.force_authenticate(user=admin_user)
        customer_2 = CustomerFactory()
        url = f"/store/customers/{customer_2.id}/addresses/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK

    def test_addresses_instance_can_post(self, api_client, customer):
        api_client.force_authenticate(user=customer.user)
        url = f"/store/customers/{customer.id}/addresses/"
        address_details = {
            "street": "200 University Ave W",
            "city": "Waterloo",
            "zip": "N2L 3G1",
        }
        response = api_client.post(url, address_details)
        assert response.status_code == status.HTTP_201_CREATED

    def test_addresses_instance_can_patch(self, api_client, customer):
        api_client.force_authenticate(user=customer.user)
        url = f"/store/customers/{customer.id}/addresses/"
        address_details = {
            "street": "200 University Ave W",
            "city": "Waterloo",
            "zip": "N2L 3G1",
        }
        response = api_client.post(url, address_details)
        address_id = response.data["id"]
        updated_address_details = {
            "street": "1280 Main St W",
            "city": "Hamilton",
            "zip": "L8S 4L8",
        }
        url = f"/store/customers/{customer.id}/addresses/{address_id}/"
        response = api_client.patch(url, updated_address_details)
        assert response.status_code == status.HTTP_200_OK

    def test_addresses_instance_can_delete(self, api_client, customer):
        api_client.force_authenticate(user=customer.user)
        url = f"/store/customers/{customer.id}/addresses/"
        address_details = {
            "street": "200 University Ave W",
            "city": "Waterloo",
            "zip": "N2L 3G1",
        }
        response = api_client.post(url, address_details)
        address_id = response.data["id"]
        url = f"/store/customers/{customer.id}/addresses/{address_id}/"
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
