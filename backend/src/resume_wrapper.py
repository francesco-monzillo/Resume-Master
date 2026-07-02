from pydantic import BaseModel, Field
from weasyprint import HTML

class ResumeWrapper(BaseModel):

    markdown : str = Field(default="")

    def to_pdf(self) -> bytes:
        return HTML(string = self.markdown).write_pdf()