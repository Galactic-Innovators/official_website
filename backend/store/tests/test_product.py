import os
import glob
from decimal import Decimal
import pytest
from factory.django import DjangoModelFactory
from factory import SubFactory

from rest_framework import status
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from store.models import Collection, Product
from unittest.mock import patch

# Factories for generating test data
class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = 'testuser'
    email = 'testuser@example.com'
    password = 'securepassword'

class CollectionFactory(DjangoModelFactory):
    class Meta:
        model = Collection

    title = 'Summer Collection'

class ProductFactory(DjangoModelFactory):
    class Meta:
        model = Product

    title = 'Test Product'
    description = 'This is a test product.'
    slug = 'test-product'
    inventory = 20
    unit_price = Decimal('29.99')
    collection = SubFactory(CollectionFactory)
    stripe_id = 'stripe_test_prod'

# Fixture to provide an authenticated API client
@pytest.fixture
def api_client():
    client = APIClient()
    user = UserFactory()
    client.force_authenticate(user=user)
    return client

# Test class for product image upload
@pytest.mark.django_db
class TestUploadImage:
    def test_image_upload_for_product(self, api_client):
        product = ProductFactory()
        image_path = "./media/test_image.jpg"  # Make sure this path exists and the image is available
        with open(image_path, "rb") as img:
            data = {
                "image": SimpleUploadedFile(
                    name="test_image.jpg", content=img.read(), content_type="image/jpeg"
                )
            }
            response = api_client.post(f"/store/products/{product.id}/images/", data, format="multipart")
        assert response.status_code == status.HTTP_201_CREATED

    def test_image_upload_invalid_file_for_product(self, api_client):
        product = ProductFactory()
        image_path = "./media/testing.pdf"  # This is an invalid image file type for this test
        with open(image_path, "rb") as img:
            data = {
                "image": SimpleUploadedFile(
                    name="test_pdf.pdf", content=img.read(), content_type="application/pdf"
                )
            }
            response = api_client.post(f"/store/products/{product.id}/images/", data, format="multipart")
        assert response.status_code == status.HTTP_400_BAD_REQUEST

# Test class for product creation scenarios
@pytest.mark.django_db
class TestCreateProduct:
    def test_create_product_with_valid_data(self, api_client):
        collection = CollectionFactory()
        product_data = {
            "title": "New Product",
            "description": "Brand new product",
            "slug": "new-product",
            "inventory": 10,
            "unit_price": 19.99,
            "collection": collection.id,
            "stripe_id": "new_stripe_id"
        }
        response = api_client.post("/store/products/", product_data)
        assert response.status_code == status.HTTP_201_CREATED
        assert 'id' in response.data

    def test_create_product_with_invalid_data(self, api_client):
        product_data = {
            "title": "",  # Invalid data: title is required
            "description": "No title",
            "slug": "no-title",
            "inventory": 5,
            "unit_price": 15.99,
            "collection": None,
            "stripe_id": "no_title_stripe"
        }
        response = api_client.post("/store/products/", product_data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

# Cleanup fixture to remove test images after tests
@pytest.fixture(scope="session", autouse=True)
def cleanup_test_images():
    yield  # Yield control back to the test session
    pattern = "./media/test_*.jpg"
    test_images = glob.glob(pattern)
    for image in test_images:
        os.remove(image)
    print("All test_*.jpg images have been removed.")

# This setup covers test case creation, including setup and teardown processes, to manage a clean test environment.
