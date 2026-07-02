from typing import List
from pydantic import BaseModel, Field
from .organization import Organization, OrganizationList
from hashlib import sha256


class History(BaseModel):
    
    id : str | None = Field(default=None, alias="_id")
    summary : str = Field(default="")
    projects : list= Field(default_factory=list)
    education : list = Field(default_factory=list)
    organizations : List[Organization] = Field(default_factory=list)
    technical_skills : list = Field(default_factory=list)
    organizational_skills : list = Field(default_factory=list)

    def get_id(self):
        return self.id

    def set_id(self, new_id):
        self.id = new_id

    def get_summary(self):
        return self.summary
    
    def set_summary(self, new_summary):
        self.summary = new_summary

    def get_projects(self):
        return self.projects
    
    def get_education(self):
        return self.education
    
    def get_organizations(self):
        return self.organizations
   
    def get_technical_skills(self):
        return self.technical_skills
    
    def get_organizational_skills(self):
        return self.organizational_skills
    
    def set_projects(self, new_projects):
        self.projects = new_projects
    
    def set_education(self, new_education):
        self.education = new_education
    
    def set_organizations(self, new_organizations):
        self.organizations = new_organizations
    
    def set_technical_skills(self, new_technical_skills):
        self.technical_skills = new_technical_skills
    
    def set_organizational_skills(self, new_organizational_skills):
        self.organizational_skills = new_organizational_skills

    def __str__(self):
        return f"History(summary={self.summary}, education={self.education}, projects={self.projects}, organizations={self.organizations}, technical_skills={self.technical_skills}, organizational_skills={self.organizational_skills})"