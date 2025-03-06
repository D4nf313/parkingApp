Sistema de Gestión de Parqueadero
Una aplicación web desarrollada con Angular 19 y Angular Material, diseñada para gestionar de forma integral un parqueadero.

Descripción
Esta aplicación simula un sistema de parqueadero en el que se valida la disponibilidad de puestos, se asigna el espacio correspondiente y se calcula el costo de estacionamiento según el tipo de vehículo y el tipo de combustible (aplicando descuentos para vehículos híbridos y eléctricos). Además, genera una factura detallada por cada salida de vehículo, permite la edición y eliminación de registros, y realiza un cierre del parqueadero calculando la ganancia total, cumpliendo con las reglas de negocio definidas.

Características
Validación y Asignación de Puestos:
Verifica la disponibilidad de espacios y asigna un parqueadero al vehículo.

Cálculo de Costos:
Determina el costo del parqueo según:

Tipo de vehículo.
Tipo de combustible (con descuentos para híbridos y eléctricos).
Cierre del Parqueadero:
Realiza el cierre diario del parqueadero calculando la ganancia total.

Persistencia de Datos:
Utiliza Session Storage para simular un backend y mantener la persistencia de la información durante la sesión.

Facturación:
Genera y muestra una factura detallada para cada salida de vehículo.

Gestión de Registros:
Permite editar y eliminar registros, facilitando la administración del sistema.

Tecnologías Utilizadas
Angular 19: Framework principal para el desarrollo de la aplicación.
Angular Material: Biblioteca de componentes UI para un diseño moderno y responsivo.
Session Storage: Para simular el backend y garantizar la persistencia de datos en la sesión.
Requisitos
Node.js (versión LTS recomendada)
Angular CLI

Ingreso de Vehículos:
Ingresa los datos del vehículo para asignarle un parqueadero.

Cálculo y Facturación:
Al registrar la salida, el sistema calculará el costo y mostrará una factura detallada.

Gestión de Registros:
Edita o elimina registros directamente desde la interfaz para mantener el control actualizado.

Cierre de Parqueadero:
Realiza el cierre del parqueadero y consulta la ganancia total del período.

Contribuciones
Las contribuciones son bienvenidas. Si deseas mejorar o añadir nuevas funcionalidades, abre un issue o crea un pull request en el repositorio.