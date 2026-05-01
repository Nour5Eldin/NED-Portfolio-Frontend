import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  public sectionStatus = [
    { name: 'Hero', route: '/admin/hero', icon: 'ri-home-line', count: 0, lastUpdated: new Date() },
    { name: 'About', route: '/admin/about', icon: 'ri-information-line', count: 0, lastUpdated: new Date() },
    { name: 'Values', route: '/admin/values', icon: 'ri-award-line', count: 0, lastUpdated: new Date() },
    { name: 'Projects', route: '/admin/projects', icon: 'ri-building-line', status: 'draft', count: 0, lastUpdated: new Date() },
    { name: 'Advantage', route: '/admin/advantage', icon: 'ri-star-line', count: 0, lastUpdated: new Date() },
    { name: 'Testimonials', route: '/admin/testimonials', icon: 'ri-chat-quote-line', count: 0, lastUpdated: new Date() },
    { name: 'Contact', route: '/admin/contact', icon: 'ri-phone-line', count: 0, lastUpdated: new Date() },
  ]
  constructor(private http: HttpClient) { }
  getHero() {
    return this.http.get(`${this.apiUrl}/api/hero`);
  }

  getAbout() {
    return this.http.get(`${this.apiUrl}/api/about`);
  }

  getValues() {
    return this.http.get(`${this.apiUrl}/api/values`);
  }

  getProjects() {
    return this.http.get(`${this.apiUrl}/api/projects`)
  }
  getWhyChooseUs() {
    return this.http.get(`${this.apiUrl}/api/whychooseus`);
  }

  getTestimonials() {
    return this.http.get(`${this.apiUrl}/api/testimonials`);
  }
  getContactInfo() {
    return this.http.get(`${this.apiUrl}/api/contact/info`);
  }
  updateContactInfo(data: any) {
    return this.http.put(`${this.apiUrl}/api/contact/info`, data);
  }
  sendInquiry(data: any) {
    return this.http.post(`${this.apiUrl}/api/contact/inquiry`, data);
  }
  //dashboard updates
  updateHero(id: string, formData: FormData) {
    return this.http.put(`${this.apiUrl}/api/hero/${id}`, formData);
  }
  updateAbout(id: string, formData: FormData) {
    return this.http.put(`${this.apiUrl}/api/about/${id}`, formData);
  }
  updateValues(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/values/${id}`, data);
  }
  createProject(formData: FormData) {
    return this.http.post(`${this.apiUrl}/api/projects`, formData);
  }
  updateProject(id: string, formData: FormData) {
    return this.http.put(`${this.apiUrl}/api/projects/${id}`, formData);
  }
  deleteProject(id: string) {
    return this.http.delete(`${this.apiUrl}/api/projects/${id}`);
  }
  updateWhyChooseUs(id: string, formData: FormData) {
    return this.http.put(`${this.apiUrl}/api/whychooseus/${id}`, formData);
  }
  createTestimonial(data: any) {
    return this.http.post(`${this.apiUrl}/api/testimonials`, data);
  }
  updateTestimonial(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/testimonials/${id}`, data);
  }
  deleteTestimonial(id: string) {
    return this.http.delete(`${this.apiUrl}/api/testimonials/${id}`);
  }
  getInquiries() {
    return this.http.get(`${this.apiUrl}/api/contact/inquiries`);
  }
  deleteInquiry(id: string) {
    return this.http.delete(`${this.apiUrl}/api/contact/inquiries/${id}`);
  }
  getDashboardStats() {
    return this.http.get<any>(`${this.apiUrl}/admin`);
  }
}