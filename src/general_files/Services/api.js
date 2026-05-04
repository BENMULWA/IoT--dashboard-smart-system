// API service for IoT Dashboard
// This service handles communication with the backend for attendance and environmental data

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async getAttendanceData(startDate, endDate) {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate.toISOString());
      if (endDate) params.append('end_date', endDate.toISOString());

      const response = await fetch(`${this.baseURL}/attendance?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      // Return sample data as fallback
      return this.getSampleAttendanceData(startDate, endDate);
    }
  }

  async getEnvironmentalData(startDate, endDate) {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate.toISOString());
      if (endDate) params.append('end_date', endDate.toISOString());

      const response = await fetch(`${this.baseURL}/environmental?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching environmental data:', error);
      // Return sample data as fallback
      return this.getSampleEnvironmentalData(startDate, endDate);
    }
  }

  // Fallback sample data methods
  getSampleAttendanceData(startDate, endDate) {
    const sampleData = [
      { id: 'EMP001', status: 'present', timestamp: new Date("2026-04-28T08:00:00") },
      { id: 'EMP002', status: 'present', timestamp: new Date("2026-04-28T08:15:00") },
      { id: 'EMP003', status: 'late', timestamp: new Date("2026-04-28T09:30:00") },
      { id: 'EMP004', status: 'present', timestamp: new Date("2026-04-28T08:45:00") },
      { id: 'EMP005', status: 'absent', timestamp: new Date("2026-04-28T08:00:00") },
    ];

    if (startDate && endDate) {
      return sampleData.filter(item =>
        item.timestamp >= startDate && item.timestamp <= endDate
      );
    }
    return sampleData;
  }

  getSampleEnvironmentalData(startDate, endDate) {
    const sampleData = [
      { timestamp: new Date("2026-04-28T08:00:00"), temp: 25.5, humidity: 51 },
      { timestamp: new Date("2026-04-28T09:00:00"), temp: 26.8, humidity: 55 },
      { timestamp: new Date("2026-04-28T10:00:00"), temp: 27.3, humidity: 57 },
    ];

    if (startDate && endDate) {
      return sampleData.filter(item =>
        item.timestamp >= startDate && item.timestamp <= endDate
      );
    }
    return sampleData;
  }
}

export default new ApiService();