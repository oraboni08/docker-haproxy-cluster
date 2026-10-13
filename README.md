# 🤖 Scalable Web Architecture: FastAPI + React + HAProxy (Docker)

Sistema web altamente escalable y desacoplado, diseñado e implementado dentro de un entorno contenedorizado con Docker. La arquitectura integra una interfaz interactiva en **React**, un clúster de tres nodos backend construidos en **FastAPI** y un balanceador de carga de alto rendimiento **HAProxy** configurado para servir todo el tráfico en el puerto HTTP estándar (`80`) con distribución *Round Robin*, monitoreo en tiempo real e aislamiento de red.

---

## 📐 Arquitectura del Sistema

```mermaid
graph TD
    User[👤 Usuario / Navegador] -->|HTTP:80| HAProxy[⚖️ HAProxy Load Balancer]
    
    subgraph Red Interna Docker (app_net)
        HAProxy -->|Proxy /| ReactApp[⚛️ React Frontend]
        HAProxy -->|Round Robin /api| API1[🐍 FastAPI Node 1 - Alpha]
        HAProxy -->|Round Robin /api| API2[🐍 FastAPI Node 2 - Beta]
        HAProxy -->|Round Robin /api| API3[🐍 FastAPI Node 3 - Gamma]
    end

    HAProxy -.->|Stats Page :1936| Dashboard[📊 HAProxy Dashboard]

### Componentes Clave:
1. **HAProxy Load Balancer (Puerto 80):** Actúa como puerta de entrada única (*Reverse Proxy*). Enruta el tráfico raíz (`/`) hacia el contenedor del Frontend y el tráfico dinámico (`/api/`) hacia el clúster de backends usando el algoritmo `roundrobin`. Además, expone un dashboard de estadísticas en el puerto `1936`.
2. **Frontend (React + Vite):** Interfaz gráfica de usuario con estética de *Data & AI*, integrada mediante llamadas relativas (`/api/data`) atendidas directamente por HAProxy.
3. **Backend Cluster (FastAPI / Uvicorn):** Tres microservicios independientes (`api1`, `api2`, `api3`) aislados dentro de una red privada virtual (`app_net`), identificados dinámicamente mediante variables de entorno (`NODE_NAME`, `NODE_COLOR`).

---

## 🛠️ Requisitos Previos

* **Docker Desktop** (versión 20.10+ o superior)
* **Docker Compose** (v2.0+)
* **Apache Bench (`ab`)** o **Apache JMeter** (para pruebas de carga)

---

## 🚀 Despliegue Local

### 1. Clonar el repositorio
```bash
git clone [https://github.com/oraboni08/docker-haproxy-cluster.git](https://github.com/oraboni08/docker-haproxy-cluster.git)
cd docker-haproxy-cluster