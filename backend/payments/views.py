import time
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

from django.shortcuts import redirect
from rest_framework.views import APIView

import stripe
import json

stripe.api_key = settings.STRIPE_SECRET_KEY


class PaymentViewSet(APIView):
    def post(self, request):
        parsed_items = []
        # print("request:", request, "\n\n")
        # print("request.data", request.data, "\n\n")
        # print("request.data.items()", request.data.items(), "\n\n")
        # Iterate through the request data
        for key, value in request.data.items():
            # Check if the key starts with 'items[' to identify item data
            if key.startswith("items["):
                # Parse out the index and the property name
                _, index, property = key.split("[")
                index = int(index[:-1])  # Remove the trailing ']' and convert to int
                property = property[:-1]  # Remove the trailing ']'

                # Ensure the current index is already represented in the parsed_items list
                while len(parsed_items) <= index:
                    parsed_items.append({})

                # Add the property value to the appropriate dictionary
                parsed_items[index][property] = value

        # At this point, parsed_items contains a list of item dictionaries
        print(parsed_items)

        # subtotal = request.data.get('subtotal', 0)
        items = request.data.get("items", [])
        items = parsed_items
        input_items = []
        for item in items:
            # print("currency: ", item.get("currency"))
            # print("name", item.get("name"))
            # print("unit_amount", item.get("amount"))
            # print("quantity", item.get("quantity"))
            # print("stripe_id:", item.get("stripe_id"))
            input_items.append(
                {
                    'price': item.get("stripe_id"),
                    # "price_data": {
                    #     "currency": str(
                    #         item.get("currency", "cad")
                    #     ),  # Default currency to 'cad' if not provided
                    #     "product_data": {
                    #         "name": str(
                    #             item.get("name", "Unknown Product")
                    #         ),  # Default name if not provided
                    #         # 'images': [item.get('image', 'url_to_default_image')],
                    #     },
                    #     "unit_amount": int(
                    #         round(float(item.get("amount")))
                    #     ),  # Amount in cents
                    # },
                    "quantity": int(round(float(item.get("quantity", 1)))),
                }
            )
        # print("input_items:\n", input_items)

        YOUR_DOMAIN = "http://127.0.0.1:3000/"
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=input_items,
                payment_method_types=["card"],
                mode="payment",
                success_url="http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
                # success_url='http://localhost:3000/?success&session_id={CHECKOUT_SESSION_ID}',
                # cancel_url="http://localhost:3000/?canceled=true",
                cancel_url='http://localhost:3000/cart/:id?',
                automatic_tax={"enabled": True},  # Enable or disable automatic tax calculation
                billing_address_collection="required",  # Set to 'required' to collect billing address
                shipping_options=[{"shipping_rate": "shr_1P1h9kLyCz9ytZLnNjnm4TMt"}], # Use 'shipping_options' to specify shipping rates
                shipping_address_collection={
                    "allowed_countries": [
                        "US","CA",
                    ],  # Specify allowed countries for shipping
                },
                allow_promotion_codes=True,  # This enables promotion code input
                # setup_future_usage='on_session',  # Save card for future off_session use
                phone_number_collection={'enabled': True},  # Requires providing phone number
            )
            return redirect(checkout_session.url)
            # return JsonResponse({'sessionId': checkout_session['id']})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        # return JsonResponse({
        #     'id': checkout_session.id
        # })
