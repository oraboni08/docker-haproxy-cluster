# 🤖 Scalable Web Architecture: FastAPI + React + HAProxy (Docker)

Sistema web altamente escalable y desacoplado, diseñado e implementado dentro de un entorno contenedorizado con Docker. La arquitectura integra una interfaz interactiva en **React**, un clúster de tres nodos backend construidos en **FastAPI** y un balanceador de carga de alto rendimiento **HAProxy** configurado con distribución *Round Robin*, monitoreo en tiempo real e aislamiento de red.

---

## 📐 Arquitectura del Sistema

                     ┌───────────────────────┐
                     │   Usuario / Browser   │
                     └───────────┬───────────┘
                                 │
                     ┌───────────▼───────────┐
                     │ React Frontend (3000) │
                     └───────────┬───────────┘
                                 │
                     ┌───────────▼───────────┐
                     │ HAProxy Load Balancer │ (Port 8080 / Stats: 1936)
                     └───────────┬───────────┘
                                 │
     ┌───────────────────────────┼───────────────────────────┐
     │ (Round Robin Distribution │ app_net Bridge Network)   │
     ▼                           ▼                           ▼
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│ FastAPI - Node 1 │        │ FastAPI - Node 2 │        │ FastAPI - Node 3 │
│   (Nodo Alpha)   │        │   (Nodo Beta)    │        │   (Nodo Gamma)   │
└──────────────────┘        └──────────────────┘        └──────────────────┘

### Componentes Clave:
1. **Frontend (React + Vite):** Interfaz gráfica inspirada en una estética de *Data & AI* con métricas de conexión, indicadores visuales de nodo activo por color y simulación de peticiones en tiempo real.
2. **Load Balancer (HAProxy 2.8):** Gestiona el tráfico entrante en el puerto público `8080`, aplicando el algoritmo `roundrobin` con *health checks* continuos. Además, expone un dashboard de estadísticas en el puerto `1936`.
3. **Backend Cluster (FastAPI / Uvicorn):** Tres microservicios independientes (`api1`, `api2`, `api3`) aislados en una red privada interna (`app_net`), identificados dinámicamente mediante variables de entorno (`NODE_NAME`, `NODE_COLOR`).

---

## 🛠️ Requisitos Previos

* **Docker Desktop** (versión 20.10+ o superior)
* **Docker Compose** (v2.0+)
* **Apache Bench (`ab`)** o **Apache JMeter** (para pruebas de carga)

---

## 🚀 Despliegue Local

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/docker-haproxy.git](https://github.com/tu-usuario/docker-haproxy.git)
cd docker-haproxy