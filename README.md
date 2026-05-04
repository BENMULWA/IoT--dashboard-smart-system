
## RESEARCH PROJECT ARCHTECTURE DESIGN DOCUMENTATION

# 📡 IoT Embedded System Dashboard

A modern IoT monitoring and control dashboard built with **React (Vite)** for visualizing real-time data from embedded devices such as microcontrollers, biometric sensors, and environmental monitoring modules.

---

## 🚀 Project Overview

This system provides a centralized dashboard for monitoring IoT devices in real time. It helps track:

- 📊 Device status (Online / Offline)
- 🔐 Biometric attendance (Fingerprint sensors)
- 🌡️ Environmental data (Temperature & Humidity sensors)
- 🚨 Real-time alerts and system notifications
- 📡 IoT gateway communication status

---

## 🏗️ System Architecture

### 1. Frontend (Dashboard UI)
Built with:
- React (Vite)
- Tailwind CSS
- React Router
- Lucide Icons

Responsibilities:
- Displays real-time IoT data
- Shows device status
- Handles navigation between pages
- Visualizes alerts and system metrics

---

### 2. Backend (Planned)
Will be built using:
- FastAPI / Node.js

Responsibilities:
- Receive IoT sensor data
- Store and process data
- Serve API endpoints to frontend
- Enable real-time communication (WebSockets)

---

### 3. Embedded Devices (IoT Layer)
Hardware examples:
- ESP32 / Arduino boards
- Fingerprint sensor module
- DHT11 / DHT22 sensors
- WiFi modules

Responsibilities:
- Collect sensor data
- Send data to backend (HTTP/MQTT)
- Execute device-level operations

---

## 📊 Features

### 🏠 Dashboard
- System overview
- Device summary
- Quick health monitoring

### 🔐 Biometric Attendance
- Fingerprint authentication
- Attendance tracking system

### 🌿 Environment Monitoring
- Temperature tracking
- Humidity monitoring
- Sensor-based alerts

### 📡 Device Management
- List all connected IoT devices
- Show online/offline status
- Device categorization

### 🚨 Alerts System
- Real-time alerts
- Threshold warnings
- Device failure notifications

### ⚙️ System Status
- IoT Gateway status
- Database health
- Network connectivity status

---

## 🔄 Data Flow

1. IoT device collects sensor data  
2. Data is sent via WiFi (HTTP/MQTT)  
3. Backend processes and stores data  
4. Frontend fetches or receives updates  
5. Dashboard updates in real time  

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Lucide React

### Embedded Systems
- Arduino / ESP32
- C++ (Arduino framework)
- Sensor modules (DHT, Fingerprint)

### Backend (Planned)
- FastAPI / Node.js
- REST API / WebSockets
- MongoDB / PostgreSQL

---

## 📁 Project Structure
