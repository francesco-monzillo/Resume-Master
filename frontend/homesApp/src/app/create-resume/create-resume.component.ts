import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { History } from '../Interfaces/history';
import { Organization } from '../Interfaces/organization';
import { ViewChild } from '@angular/core';
import OpenAI from 'openai';
import { environment } from '../environment';
@Component({
  selector: 'app-create-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chat-container">
      <div #chatBot class="chatBot">
          <header class="chat-header">
              <h2>ChatBot</h2>
              <span alt="Close" 
                    id="cross" 
                    onclick="cancel()">X</span>
          </header>
          <ul #chatbox class="chatbox">
              <li class="chat-incoming chat">
                  <p>Provide your general information (Name, Surname, contacts, links, and Home Address), please</p>
              </li>
          </ul>
          <div class="chat-input">
              <textarea #chatInputArea rows="0" cols="17"
                        placeholder="Enter a message..."></textarea>
              <button #sendChatBtn id="sendBTN" (click)="handleChat()">Send</button>
          </div>
      </div>
    </div>
  `,
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent {
  // Next, Create typical LLM interaction chat structure in the template.
  @Input() userHistory!: History | undefined;
  @Input() organization!: Organization | undefined;
  @Input() jobDescription!: string;
  @Input() jobRole!: string;

  @ViewChild('chatInputArea')chatInputArea!: ElementRef; 
  @ViewChild('sendChatBtn')sendChatBtn!: ElementRef;
  @ViewChild('chatbox')chatbox!: ElementRef;
  @ViewChild('chatBot')chatbot!: ElementRef;

  private userMessage: string = "";

  private API_KEY = environment.apiKey;

  constructor(private renderer: Renderer2){
    this.renderer = renderer;
  }

  //OpenAI Free APIKey
  createChatLi(message: string, className: string) {
    const chatLi = this.renderer.createElement("li");
    this.renderer.addClass(chatLi, "chat");
    this.renderer.addClass(chatLi, className);

    const insidePar = this.renderer.createElement("p");
    this.renderer.setProperty(insidePar, "innerHTML", message);
    this.renderer.appendChild(chatLi, insidePar);

    return chatLi;
  }
  async generateResponse(incomingChatLi: HTMLElement) {

    const messageElement = incomingChatLi.childNodes[0];

    const isPDF: boolean = true;

    const API_URL = "/api/model/query";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'system_query': 'You are a helpful Resume Builder. The user will provide you with a Target organization, job description, job role and his/her professional History.\nOrganization = ' + JSON.stringify(this.organization) + '\nJob Description = ' + JSON.stringify(this.jobDescription) + '\nJob Role = ' + JSON.stringify(this.jobRole) + '\nUser History = ' + JSON.stringify(this.userHistory) + '\nYou will use that information along with the user\'s history to generate a template using HTML and CSS to generate a resume for the user. The resume should be in a clear and organized format, highlighting the user\'s relevant skills, experiences, and achievements that align with the provided job description and role. The CV format must be ATS friendly (single column), all visible in an A4 page. You must fit the whole CV in two pages. So, if there is no enough space to fit all my data, then the size of characters, what to put inside, what structure to be followed for the recruiters and what to not put into, is up to you. User qualities, impactful numbers and labourious results must be included. Ensure all text wraps within page boundaries. Use overflow-wrap: break-word and avoid fixed-width content that can exceed the printable area. It must be all very much clean. Font size must 16px. Font Family is up to you. You must reply with the template only. Return only raw HTML. Do not use markdown. Do not wrap the response in ```html or ```',
            'user_query': this.userMessage
        })
    };

    fetch(API_URL, requestOptions)
        .then(res => {

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            //Insert here some logic to check if the response is a PDF or a text one
            return res.blob();
        })
        .then(data => {

            const url = URL.createObjectURL(data);

            const clickable_content = this.renderer.createElement('a');
            this.renderer.setProperty(clickable_content, "href", url);
            this.renderer.setProperty(clickable_content, "innerHTML", "Download Your Resume!");
            this.renderer.setProperty(clickable_content, "download", 'your_resume.pdf');
            this.renderer.setStyle(clickable_content, "text-decoration", "none");
            this.renderer.setStyle(clickable_content, "color", "var(--secondary-color)");
            this.renderer.appendChild(messageElement, clickable_content);

            //this.renderer.setProperty(messageElement, "innerHTML", clickable_content.outerHTML);
            
            //This line invalidates the URL right after it's execution...
            //URL.revokeObjectURL(url);

            this.renderer.setProperty(messageElement, "innerHTML", clickable_content.outerHTML);
        })
        .catch((error) => {
            this.renderer.addClass(messageElement, "error");
            this.renderer.setProperty(messageElement, "textContent", "Oops! Something went wrong. Please try again!");
            console.log("Error fetching response:", error);
        })
        .finally(() => this.chatbox.nativeElement.scrollTo(0, this.chatbox.nativeElement.scrollHeight));
  };

  handleChat () {
    this.userMessage = this.chatInputArea.nativeElement.value.trim();

    if (!this.userMessage) {
        return;
    }

    this.renderer.appendChild(this.chatbox.nativeElement, this.createChatLi(this.userMessage, "chat-outgoing"));

    this.chatbox.nativeElement.scrollTo(0, this.chatbox.nativeElement.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = this.createChatLi("Thinking...", "chat-incoming")
        this.renderer.appendChild(this.chatbox.nativeElement, incomingChatLi);
        this.chatbox.nativeElement.scrollTo(0, this.chatbox.nativeElement.scrollHeight);
        this.generateResponse(incomingChatLi);
    }, 600);
  }

  //Set in the template: (click)="handleChat()"
  //sendChatBtn.addEventListener("click", handleChat);

  cancel() { 
    let chatbotcomplete = this.chatbot
    if (chatbotcomplete.nativeElement.style.display != 'none') {
        chatbotcomplete.nativeElement.style.display = "none";
        let lastMsg = this.renderer.createElement("p");
        this.renderer.setProperty(lastMsg, "textContent", "Thanks for using our Chatbot!");
        this.renderer.addClass(lastMsg, "lastMessage");
        this.renderer.appendChild(document.body, lastMsg);
        document.body.appendChild(lastMsg)
    }
}

}
