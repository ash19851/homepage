import random
from datetime import datetime, timedelta
from jose import jwt
from ..config import JWT_SECRET, JWT_ALGORITHM

def generate_captcha() -> dict:
    a = random.randint(1, 20)
    b = random.randint(1, 20)
    op = random.choice(['+', '-', '×'])
    if op == '+':
        answer = a + b
    elif op == '-':
        answer = max(a, b) - min(a, b)
        question = f'{max(a, b)} - {min(a, b)} = ?'
    else:
        answer = a * b
        question = f'{a} × {b} = ?'
    if op != '-':
        question = f'{a} {op} {b} = ?'
    token = jwt.encode(
        {'answer': str(answer), 'exp': datetime.utcnow() + timedelta(minutes=5)},
        JWT_SECRET, algorithm=JWT_ALGORITHM,
    )
    return {'token': token, 'question': question}

def verify_captcha(token: str, user_answer: str) -> bool:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get('answer') == str(user_answer).strip()
    except Exception:
        return False
