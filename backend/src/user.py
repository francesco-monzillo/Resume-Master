from pydantic import BaseModel, Field
from .history import History
from hashlib import sha256


class User(BaseModel):

    id: str = Field(default_factory=lambda data: sha256(data["name"].encode('utf-8') + data["email"].encode('utf-8') + str(data["history"]).encode('utf-8')).hexdigest(), alias="_id")
    name: str = Field(default="")
    email: str = Field(default="")
    history: History | None = Field(default=None, alias="history")

    def get_id(self):
        return self.id

    def set_id(self, new_id):
        self.id = new_id

    def get_name(self):
        return self.name

    def get_email(self):
        return self.email
    
    def set_name(self, new_name):
        self.name = new_name

    def set_email(self, new_email):
        self.email = new_email

    def get_history(self):
        return self.history
    
    def set_history(self, new_history):
        self.history = new_history



    def __str__(self):
        return f"User(name={self.name}, email={self.email})"


class UserList(BaseModel):
    def __init__(self, users: list):
        self._users = users

    def get_users(self):
        return self._users
    
    def set_users(self, new_users):
        self._users = new_users

    def __str__(self):
        return f"UserList(users={self._users})"