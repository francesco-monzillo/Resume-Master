import re

from fastapi import FastAPI, HTTPException, Response
from src.user import User as User
from src.user import UserList as UserList
from src.history import History as History
from src.organization import Organization as Organization
from src.organization import OrganizationList as OrganizationList
from src.resume_wrapper import ResumeWrapper as ResumeWrapper
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError
import os
from hashlib import sha256
from openai import OpenAI
from fastapi import Body

MONGO_DB_CONNECTION_STRING = os.getenv("MONGO_DB_CONNECTION_STRING")

mongoDbClient = AsyncIOMotorClient(MONGO_DB_CONNECTION_STRING, uuidRepresentation="standard")

resumeMasterDb = mongoDbClient.resume_master

users = resumeMasterDb.users

organizations = resumeMasterDb.organizations

histories = resumeMasterDb.histories

api = FastAPI()


@api.post("/user/create")
async def create_user(user: User):

    user.id = sha256(user.get_name().encode('utf-8') + user.get_email().encode('utf-8') + str(user.get_history()).encode('utf-8')).hexdigest()

    try:
        await users.insert_one(user.model_dump(by_alias=True))
    except DuplicateKeyError as e:
        if e.code == 11000:
            return {"message": f"User with name {user.get_name()} and email {user.get_email()} already exists."}

    return {"message": f"User {user.get_name()} created successfully."}

@api.delete("/user/delete/{user_id}")
async def delete_user(user_id: str):
    # Implementation for deleting a user by ID
    delete_result = await users.delete_one({"_id": user_id})

    if delete_result.deleted_count == 0:
        return {"message": f"User with ID {user_id} not found."}
    
    return {"message": f"User with ID {user_id} deleted successfully."}

@api.get("/user/get/{user_id}",  response_model=User)
async def get_user(user_id: str):
    # Implementation for reading a user by ID
    user = await users.find_one({"_id": user_id})

    if user == None:
        return {"message": f"User with ID {user_id} not found."}
    
    return user

@api.get("/user/all", response_model = list[User])
async def get_all_users():
    # Implementation for reading all users
    users_list = await users.find().to_list(length=None)

    if len(users_list) == 0:
        raise HTTPException(status_code=404, detail="No user found.")

    return users_list

@api.post("/organization/create")
async def create_organization(organization: Organization):

    organization.id = sha256(organization.get_name().encode('utf-8') + organization.get_address().encode('utf-8') + str(organization.get_description()).encode('utf-8')).hexdigest()

    try:
        await organizations.insert_one(organization.model_dump(by_alias=True))
    except DuplicateKeyError as e:
        if e.code == 11000:
            return {"message": f"Organization with name {organization.get_name()} already exists."}

    return {"message": f"Organization {organization.get_name()} created successfully."}

@api.delete("/organization/delete/{organization_id}")
async def delete_organization(organization_id: str):
    # Implementation for deleting an organization by ID
    delete_result = await organizations.delete_one({"_id": organization_id})

    if delete_result.deleted_count == 0:
        return {"message": f"Organization with ID {organization_id} not found."}
    
    return {"message": f"Organization with ID {organization_id} deleted successfully."}

@api.get("/organization/get/{organization_id}")
async def get_organization(organization_id: str):
    # Implementation for reading an organization by ID
    organization = await organizations.find_one({"_id": organization_id})
    return organization

@api.get("/organization/all", response_model = list[Organization])
async def get_all_organizations():
    # Implementation for reading all organizations
    organizations_list = await organizations.find().to_list(length=None)

    if len(organizations_list) == 0:
        raise HTTPException(status_code=404, detail="No organization found.")

    #return OrganizationList(organizations_list).model_dump()
    return organizations_list


@api.post("/model/query")
async def query_model(system_query: str = Body(...), user_query: str = Body(...)):

    API_KEY = os.getenv("RESUME_MASTER_GOOGLE_2.5-FLASH_MODEL")

    openai = OpenAI( api_key = API_KEY, base_url = "https://generativelanguage.googleapis.com/v1beta/openai/")

    response = openai.chat.completions.create(
        model = "gemini-3.1-flash-lite",
        messages = [
            {   "role": "system",
                "content": system_query
            },
            {
                "role": "user",
                "content": user_query,
            },
        ],
        reasoning_effort = "medium",
    )

    generated_resume_template = response.choices[0].message.content

    generated_resume_template = re.sub(r"```[a-zA-Z]*\n?", "", generated_resume_template)
    generated_resume_template = re.sub(r"```", "", generated_resume_template)

    resume_pdf = ResumeWrapper(markdown=generated_resume_template).to_pdf()
    return Response(resume_pdf, media_type="application/pdf", headers={"Content-Disposition": "inline; filename=resume.pdf"})




'''My Name is Francesco Monzillo, Email: fracmonz@gmail.com, Linkedin: https://www.linkedin.com/in/francesco-monzillo/, GitHub: https://github.com/francesco-monzillo, Home Address: 11 Via San Marzano, San Pietro Al Tanagro (SA), 84030, Italy, Phone number: (+39) 3756524022.'''




"""async def create_resume(resume_wrapper: ResumeWrapper):
    resume_pdf = resume_wrapper.to_pdf()
    return Response(resume_pdf, media_type="application/pdf", headers={"Content-Disposition": "inline; filename=resume.pdf"})"""