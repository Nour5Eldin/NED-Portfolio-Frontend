import { Routes } from '@angular/router';
import { Hero } from './features/hero/hero';
import { About } from './features/about/about';
import { Projects } from './features/projects/projects';
import { Contact } from './features/contact/contact';
import { Reviews } from './features/reviews/reviews';
import { Advantage } from './features/advantage/advantage';
import { Values } from './features/values/values';

export const routes: Routes = [
    { path: '', component: Hero },
    { path: 'about', component: About },
    { path: 'values', component: Values },
    { path: 'advantage', component: Advantage },
    { path: 'projects', component: Projects },
    { path: 'reviews', component: Reviews },
    { path: 'contact', component: Contact },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
