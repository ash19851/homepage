from datetime import datetime, timezone, timedelta
from jose import JWTError, jwt
from ..config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRE_HOURS

def create_token(username: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRE_HOURS)
    return jwt.encode({'sub': username, 'exp': expire}, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get('sub')
    except JWTError:
        return None
