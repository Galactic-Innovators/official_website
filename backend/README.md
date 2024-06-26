# AI-Powered E-Commerce App Django Backend

An AI-enhanced e-commerce platform designed to offer an intuitive and efficient online shopping experience. Developed with Django and backed by MySQL, this app integrates advanced AI features to cater to both user and business needs.

![Django CI](https://github.com/Galactic-Innovators/official_website/actions/workflows/django.yml/badge.svg?branch=main)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed before starting:

- Python 3.x
- MySQL
- Basic understanding of Python and Django

### Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Galactic-Innovators/official_website
   cd backend
   ```

2. **Install Dependencies in a Virtual Environment**
   MacOS:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
   Windows:
   ```bash
   python3 -m venv venv
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   .\venv\Scripts\Activate
   pip install -r requirements.txt
   ```
4. **Configure MySQL**

   Start the MySQL service on your machine.
   Create a new MySQL database for the project:

   ```sql
   CREATE DATABASE storefront;
   ```

5. **Update Django Settings**

   Navigate to the settings file at AI-Powered-E-Commerce-App/settings.py.
   Configure the DATABASES setting to reflect your MySQL setup:

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'root',
           'USER': 'storefront',
           'PASSWORD': 'yourpassword',
           'HOST': 'localhost',
           'PORT': '3306',
       }
   }
   ```

6. **Run Database Migrations**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

   add the sql data

   ```sql
    -- Insert into collection table
    INSERT INTO storefront.collection (id, title) VALUES
    (1, '3D printing'),
    (2, 'Accessors');

    -- Insert into store_product table
    INSERT INTO storefront.store_product (id, title, slug, description, unit_price, inventory, total_sells, last_update, collection_id, stripe_id) VALUES
    (1, 'T-Shirt', '-', 'East Side Type R T-shirt.', 45.00, 10, 1, '2024-05-03 00:00:00.000000', 2, 'price_1PCVSNLyCz9ytZLnvqVTLzx2'),
    (2, 'Model', '-', 'Type R Model', 15.00, 5, 1, '2024-05-03 19:58:45.000000', 1, 'price_1PCVrgLyCz9ytZLnITNGvdH5');
   ```

7. **Running the Project**
   To run the project:

   ```bash
   python manage.py runserver
   ```

   The project should now be running on http://127.0.0.1:8000/.

8. **Create admin user**
   ```python
   python manage.py createsuperuser
   ```
   You can log in using page http://127.0.0.1:8000/admin/

<!-- #### Remember to import dummy data using Seed.sql in mysqlworkbench

## Additional Setup

### RESTful API and Utilities Installation

```bash
pipenv install djangorestframework drf-nested-routers django-filter djoser pillow django-templated-mail djangorestframework_simplejwt
```

### Cross-Origin Resource Sharing (CORS) and Email Service Setup

```bash
pipenv install django-cors-headers
```

reference: https://github.com/adamchainz/django-cors-headers

### Install smtp4dev for email purpose

https://github.com/rnwood/smtp4dev
Run it using docker

## Setting up for Client side

### Install Node.js dependencies and start the client application:

```bash
npm install # install dependencies
npm start
```

## Performance Improvement

### Background Tasks with Celery and Redis

```bash
docker run -d -p 6379:6379 redis
pipenv install redis django-redis celery flower
```

### Run Celery workers and monitor tasks with Flower:

```bash
celery -A storefront worker --loglevel=info
```

### or periodic:

```bash
celery -A storefront beat
```

```bash
celery -A storefront flower
```

## Testing

### Unit and Integration Tests with Pytest

```bash
pipenv install --dev pytest
pipenv install --dev pytest-django
pipenv run pytest
pipenv run ptw # automated testing keep running
```

### Performance testing using locust & django-silk

```bash
pipenv install --dev locust
pipenv install --dev django-silk
pipenv install django-silk
locust -f locustfiles/browse_products.py
```

### Monitoring cache

```bash
docker exec -it CONTAINER_ID redis-cli ## select 2
...
keys *
del ...
flushall
```

## Prepare Production

```bash
python manage.py collectstatic # collecting static
pipenv install whitenoise # serving static assets
pipenv install gunicorn
gunicorn storefront.wsgi # web server gateway interface
```

## Deployment

using HeroKu: https://www.heroku.com/

```bash
heroku login
heroku create AI-Ecom-prod
```

### add the domain to the allowed host in prod.py

### use djecrety.ir generate the SECRET_KEY

```bash
heroku config:set SECRET_KEY = '...'
heroku config:set DJANGO_SETTINGS_MODULE=storefront.settings.prod
```

After adding SQL, HeroRedis, Mailgun in Heroku

```bash
heroku config # get MySQL:....
heroku config:set DATABASE_URL=MySQL:....
pipenv install dj-database-url
```

## Deploy:

```bash
git remote -vv
git push heroku main
heroku run bash # run in production environment
```

## Dockerize

```bash
docker-compose up --build
docker-compose log web
docker-compose log test
docker-compose logs -f tests
docker-compose run web bash
```

## Populating the database

```bash
heroku run python manage.py seed_db
heroku config:get DATABASE_URL # use it in DataGrip
```

# Contributing to AI-Powered E-Commerce App

To contribute, follow these steps:

1. Fork this repository.
2. Create a branch: git checkout -b <branch_name>.
3. Make your changes and commit them: git commit -m '<commit_message>'.
4. Push to the original branch: git push origin AI-Powered-E-Commerce-App/<branch_name>.
5. Create the pull request.
   Alternatively, see the GitHub documentation on creating a pull request.

#License
This project is licensed under the Apache License Version 2.0 - see the LICENSE file for details. -->
