import { Routes } from '@angular/router';
import { Hero } from './features/hero/hero';
import { About } from './features/about/about';
import { Projects } from './features/projects/projects';
import { Contact } from './features/contact/contact';
import { Reviews } from './features/reviews/reviews';
import { Advantage } from './features/advantage/advantage';
import { Values } from './features/values/values';
import { Dashboard } from './admin/dashboard/dashboard';
import { HeroAdmin } from './admin/hero-admin/hero-admin';
import { AboutAdmin } from './admin/about-admin/about-admin';
import { ProjectsAdmin } from './admin/projects-admin/projects-admin';
import { ValuesAdmin } from './admin/values-admin/values-admin';
import { AdvantageAdmin } from './admin/advantage-admin/advantage-admin';
import { TestimonialsAdmin } from './admin/testimonials-admin/testimonials-admin';
import { ContactAdmin } from './admin/contact-admin/contact-admin';

export const routes: Routes = [
    { path: '', component: Hero },
    { path: 'about', component: About },
    { path: 'values', component: Values },
    { path: 'advantage', component: Advantage },
    { path: 'projects', component: Projects },
    { path: 'reviews', component: Reviews },
    { path: 'contact', component: Contact },
    
    // Admin Routes
    {
        path: 'admin',
        component: Dashboard,
        children: [
            { path: 'admin', component: Dashboard },
            { path: 'hero', component: HeroAdmin },
            { path: 'about', component: AboutAdmin },
            { path: 'projects', component: ProjectsAdmin },
            { path: 'values', component: ValuesAdmin },
            { path: 'advantage', component: AdvantageAdmin },
            { path: 'testimonials', component: TestimonialsAdmin },
            { path: 'contact', component: ContactAdmin },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
];