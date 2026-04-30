import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  public sectionStatus = [
    { name: 'Hero', route: '/admin/hero', icon: 'ri-home-line',status: 'draft', count: 0, lastUpdated: new Date() },
    { name: 'About', route: '/admin/about', icon: 'ri-information-line', status: 'draft', count: 0, lastUpdated: new Date() },
    { name: 'Values', route: '/admin/values', icon: 'ri-award-line', status: 'draft', count: 0, lastUpdated: new Date() },
    { name: 'Projects', route: '/admin/projects', icon: 'ri-building-line', status: 'draft', count: 0, lastUpdated: new Date() },
    { name: 'Advantage', route: '/admin/advantage', icon: 'ri-star-line', status: 'draft', count: 0, lastUpdated: new Date() },
    { name: 'Testimonials', route: '/admin/testimonials', icon: 'ri-chat-quote-line', status: 'draft', count: 0, lastUpdated: new Date() },
    { name: 'Contact', route: '/admin/contact', icon: 'ri-phone-line', status: 'draft', count: 0, lastUpdated: new Date() },
  ]
  constructor(private http: HttpClient) { }
  setAsDraft(sectionName: string) {
    const section = this.sectionStatus.find(s => s.name === sectionName);
    if (section && section.status !== 'draft') {
      section.status = 'draft'
    }
  }
  setAsPublished(sectionName: string, serverResponse: any) {
    const section = this.sectionStatus.find(s => s.name === sectionName);
    if (section && serverResponse) {
      section.status = 'published';
      section.lastUpdated = new Date(serverResponse.updatedAt || serverResponse.date);
      if (serverResponse.count !== undefined) {
        section.count = serverResponse.count
      }
    }
  }
  getHero(isAdmin: boolean = false) {
    const url = isAdmin ? `${this.apiUrl}/api/hero?mode=admin` : `${this.apiUrl}/api/hero`;
    return this.http.get(url);
  }

  getAbout(isAdmin: boolean = false) {
    const url = isAdmin ? `${this.apiUrl}/api/about?mode=admin` : `${this.apiUrl}/api/about`;
    return this.http.get(url);
  }

  getValues(isAdmin: boolean = false) {
    const url = isAdmin ? `${this.apiUrl}/api/values?mode=admin` : `${this.apiUrl}/api/values`;
    return this.http.get(url);
  }

  getProjects(isAdmin: boolean = false) {
    const url = isAdmin ? `${this.apiUrl}/api/projects?mode=admin` : `${this.apiUrl}/api/projects`;
    return this.http.get(url)
  }
  getWhyChooseUs(isAdmin: boolean = false) {
    const url = isAdmin ? `${this.apiUrl}/api/whychooseus?mode=admin` : `${this.apiUrl}/api/whychooseus`;
    return this.http.get(url);
  }

  getTestimonials(isAdmin: boolean = false) {
    const url = isAdmin ? `${this.apiUrl}/api/testimonials?mode=admin` : `${this.apiUrl}/api/testimonials`;
    return this.http.get(url);
  }
  getContactInfo(isAdmin: boolean = false) {
    const url = isAdmin ? `${this.apiUrl}/api/contact/info?mode=admin` : `${this.apiUrl}/api/contact/info`;
    return this.http.get(url);
  }
  updateContactInfo(data: any, isAdmin: boolean = false) {
    const url = isAdmin ? `${this.apiUrl}/api/contact/info?mode=admin` : `${this.apiUrl}/api/contact/info`;
    return this.http.put(url, data);
  }
  sendInquiry(data: any, isAdmin: boolean = false) {
    const url = isAdmin ? `${this.apiUrl}/api/inquiry?mode=admin` : `${this.apiUrl}/api/contact/inquiry`;
    return this.http.post(url, data);
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