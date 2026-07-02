import requests

if __name__ == "__main__":
    url = "http://localhost:8000/download/resume"
    markdown = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Junior Software Developer - CV</title>
        <style>
        /* Reset and base styles for clean PDF rendering */
        body { 
            font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif; 
            color: #2b2b2b; 
            line-height: 1.5; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px; 
        }
        
        /* Typography and Layout */
        h1 { margin: 0 0 5px 0; font-size: 2.4em; color: #111; letter-spacing: -0.5px; }
        h2 { font-size: 1.3em; border-bottom: 2px solid #e0e0e0; padding-bottom: 5px; margin-top: 25px; color: #333; text-transform: uppercase; letter-spacing: 1px;}
        
        /* Contact section with no-wrap to prevent awkward line breaks */
        .contact-info { margin-bottom: 25px; padding-bottom: 15px; }
        .contact-info span { margin-right: 15px; white-space: nowrap; color: #555; }
        .contact-info a { color: #0056b3; text-decoration: none; }
        
        /* Experience and Projects */
        .entry { margin-bottom: 20px; }
        .entry-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
        .entry-title { font-weight: bold; font-size: 1.1em; }
        .entry-date { white-space: nowrap; color: #666; font-size: 0.95em; }
        .entry-subtitle { font-style: italic; color: #555; margin-bottom: 8px; font-size: 0.95em; }
        
        ul { padding-left: 20px; margin-top: 5px; }
        li { margin-bottom: 6px; }

        /* Skills tags */
        .skills-container { margin-top: 10px; }
        .skill-category { font-weight: bold; margin-bottom: 5px; display: block;}
        .skills-list { display: flex; flex-wrap: wrap; gap: 8px; padding: 0; list-style: none; margin-top: 5px; margin-bottom: 15px;}
        .skills-list li { background: #f0f4f8; border: 1px solid #dce6f1; padding: 4px 10px; border-radius: 4px; font-size: 0.9em; color: #333; }

        /* Print-specific optimizations */
        @media print {
            body { padding: 0; max-width: 100%; }
            @page { margin: 0.8in; }
            /* Ensure page breaks don't cut entries in half */
            .entry { page-break-inside: avoid; }
            h2 { page-break-after: avoid; }
            .contact-info a { color: #2b2b2b; }
        }
        </style>
        </head>
        <body>

        <!-- HEADER -->
        <header>
            <h1>[Your Name]</h1>
            <div class="contact-info">
            <span>📍 [Your Location]</span>
            <span>📧 <a href="mailto:email@example.com">email@example.com</a></span>
            <span>🔗 <a href="https://github.com/yourusername">github.com/yourusername</a></span>
            <span>💼 <a href="https://linkedin.com/in/yourusername">linkedin.com/in/yourusername</a></span>
            </div>
        </header>

        <!-- SUMMARY -->
        <section>
            <h2>Professional Summary</h2>
            <p>Junior Software Developer focused on building robust backend systems, containerized applications, and structured data architectures. Experienced in resolving complex data serialization challenges and managing seamless migrations.</p>
        </section>

        <!-- TECHNICAL SKILLS -->
        <section>
            <h2>Technical Skills</h2>
            <div class="skills-container">
            <span class="skill-category">Languages & Frameworks:</span>
            <ul class="skills-list">
                <li>Python</li>
                <li>Pydantic</li>
                <li>CSS/HTML</li>
                <li>SPARQL</li>
            </ul>
            
            <span class="skill-category">Databases & Infrastructure:</span>
            <ul class="skills-list">
                <li>MongoDB</li>
                <li>Docker</li>
                <li>Git</li>
                <li>Semantic Web Technologies</li>
            </ul>
            </div>
        </section>

        <!-- PROJECTS / EXPERIENCE -->
        <section>
            <h2>Technical Experience</h2>
            
            <div class="entry">
            <div class="entry-header">
                <span class="entry-title">Lark Repository Migration</span>
                <span class="entry-date">Month Year – Present</span>
            </div>
            <div class="entry-subtitle">Bootstrap v5 Migration</div>
            <ul>
                <li>Successfully managed the `bootstrap_migration_v5` branch, modernizing front-end frameworks and ensuring CSS layout stability.</li>
                <li>[Add your next bullet point here]</li>
                <li>[Add your next bullet point here]</li>
            </ul>
            </div>

            <div class="entry">
            <div class="entry-header">
                <span class="entry-title">Backend Development Project</span>
                <span class="entry-date">Month Year – Month Year</span>
            </div>
            <div class="entry-subtitle">Python & MongoDB Architecture</div>
            <ul>
                <li>Engineered robust data validation models utilizing Pydantic `Field()` configurations.</li>
                <li>Handled complex MongoDB `ObjectId` serialization to ensure clean data flow between the database and application layers.</li>
                <li>Containerized the application using Docker, configuring `docker compose run` environments for consistent service deployment.</li>
            </ul>
            </div>
        </section>

        <!-- EDUCATION -->
        <section>
            <h2>Education</h2>
            <div class="entry">
            <div class="entry-header">
                <span class="entry-title">[Degree/Certificate Name]</span>
                <span class="entry-date">Graduation Year</span>
            </div>
            <div class="entry-subtitle">[Institution Name], [Location]</div>
            </div>
        </section>

        </body>
        </html>

        """
    
    response = requests.post(url, json={"markdown": markdown})

    content = response.content

    save_path = "generated_resume.pdf"
    with open(save_path, "wb") as f:
        f.write(content)

    #print(content)