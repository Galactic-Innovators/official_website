import pytest
from factory import DjangoModelFactory, SubFactory, RelatedFactoryList
from rest_framework import status
from rest_framework.test import APIClient
from store.models import Collection, Product
from django.contrib.auth import get_user_model

# Factories for generating test data
class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = 'testuser'
    email = 'testuser@example.com'
    password = 'password'
    is_staff = True  # Default to staff, override in tests if needed

class CollectionFactory(DjangoModelFactory):
    class Meta:
        model = Collection

    title = 'New Collection'

class ProductFactory(DjangoModelFactory):
    class Meta:
        model = Product

    name = 'Sample Product'
    price = 10.00
    collection = SubFactory(CollectionFactory)

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

# Fixture for creating collections
@pytest.fixture
def create_collection(api_client):
    def do_create_collection(collection):
        return api_client.post("/store/collections/", collection)
    return do_create_collection

# Test class for collection creation
@pytest.mark.django_db
class TestCreateCollection:
    def test_if_user_is_anonymous_returns_401(self, api_client, create_collection):
        response = create_collection({"title": "a"})
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_admin_returns_403(self, api_client, create_collection):
        user = UserFactory(is_staff=False)
        api_client.force_authenticate(user=user)
        response = create_collection({"title": "a"})
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_data_is_invalid_returns_400(self, authenticate, create_collection):
        response = create_collection({"title": ""})
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_data_is_valid_returns_201(self, authenticate, create_collection):
        response = create_collection({"title": "Valid Title"})
        assert response.status_code == status.HTTP_201_CREATED

# Test class for retrieving collections
@pytest.mark.django_db
class TestRetrieveCollection:
    def test_if_collection_exists_returns_200(self, api_client):
        collection = CollectionFactory(title="Unique Title", products=RelatedFactoryList(ProductFactory, 'collection', size=10))
        response = api_client.get(f"/store/collections/{collection.id}/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == collection.id
        assert response.data["title"] == collection.title
        assert len(response.data["products"]) == 10

# Ensure FactoryBoy is installed to use these factories:
# pip install factory_boy
