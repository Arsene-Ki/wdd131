from datetime import datetime
current_time = datetime.now()
TAX_RATE=6/100
DISCOUNT_RATE=10/100
subtotal=float(input("Enter the subtotal: "))
print(f"Total order {subtotal}")
discount=0
today=datetime.now()
dow=today.weekday()
if (dow == 2 or dow == 3) and subtotal >= 50:
    discount=subtotal * DISCOUNT_RATE
    subtotal -=discount
tax=subtotal*TAX_RATE
total=subtotal + tax
print(f"Discount {discount}")
print(f"Subtotal {subtotal}")
print(f"Tax {tax}")
print(f"Total {total}")
print(f"Total Due {total}")
