from pydantic import BaseModel, Field
from hashlib import sha256


class Organization(BaseModel):

    id : str = Field(default_factory= lambda data: sha256(data["name"].encode('utf-8') + data["address"].encode('utf-8') + str(data["description"]).encode('utf-8')).hexdigest(), alias="_id")
    name : str = Field(default="")
    address : str = Field(default="")
    description : str | None = Field(default=None)

    def set_description(self, description):
        self.description = description

    def get_description(self):
        return self.description

    def get_name(self):
        return self.name

    def get_address(self):
        return self.address

    def get_id(self):
        return self.id

    def set_id(self, new_id):
        self._id = new_id

    def set_address(self, new_address):
        self.address = new_address

    def set_name(self, new_name):
        self.name = new_name


    def __str__(self):
        if self.description:
            return f"Organization(name={self.name}, address={self.address}, description={self.description})"
        return f"Organization(name={self.name}, address={self.address})"


class OrganizationList(BaseModel):
    def __init__(self, organizations: list):
        self._organizations = organizations

    def get_organizations(self):
        return self._organizations
    
    def set_organizations(self, new_organizations: list):
        self._organizations = new_organizations

    def __str__(self):
        return f"OrganizationList(organizations={self._organizations})"