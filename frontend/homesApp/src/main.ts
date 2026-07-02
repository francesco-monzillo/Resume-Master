import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { PageStructureComponent } from './app/page-structure/page-structure.component';

bootstrapApplication(PageStructureComponent, {
  providers : [
    provideRouter(routeConfig)
  ]
}).catch(err => console.error(err));
