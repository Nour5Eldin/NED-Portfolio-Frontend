import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
}