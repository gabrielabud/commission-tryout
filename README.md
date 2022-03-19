Create a RESTful API with an endpoint for transaction commission calculation.
*1st example*

```
{
  "date": "2021-01-01",
  "amount": "100.00",
  "currency": "EUR",
  "client_id": 42
}
```

*2nd example*

```
{
  "date": "2021-01-01",
  "amount": "200.40",
  "currency": "USD",
  "client_id": 42
}
```

**Response (Commission) example**

```
{
  "amount": "0.05",
  "currency": "EUR"
}
```