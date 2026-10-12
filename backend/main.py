import os
import socket
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/data")
def get_data():
    node_name = os.getenv("NODE_NAME", "Nodo Desconocido")
    node_color = os.getenv("NODE_COLOR", "#38bdf8")
    container_id = socket.gethostname()
    
    return {
        "status": "success",
        "node_name": node_name,
        "node_color": node_color,
        "container_id": container_id,
        "message": f"Petición procesada con éxito por el servidor {node_name}"
    }
