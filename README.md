# HANUMAN

**HANUMAN** es un proyecto web diseñado para renovar la anterior web que el cliente tenía además de ofrecer una experiencia dinámica y multilingüe. Este proyecto incluye múltiples páginas funcionales y recursos que garantizan una navegación fluida y un diseño adaptable. A continuación, se detalla todo lo necesario para comprender, instalar y contribuir al desarrollo del proyecto.

## Características principales

- **Multilingüe**: Soporte para múltiples idiomas mediante archivos JSON (`en.json`, `es.json`).
- **Páginas clave**:
  - Página principal (`index.html`).
  - Página de instalaciones (`instalaciones.html`).
  - Política de privacidad (`privacy-policy.html`).
  - Página de seminarios (`seminarios.html`).
- **Formulario de contacto**: Implementado con `contact.php`.
- **Recursos estáticos**: Archivos en la carpeta `assets` (imágenes, estilos CSS, y scripts JS).

## Tecnologías utilizadas

- **HTML5** y **CSS3**: Para la estructura y el diseño de las páginas.
- **JavaScript**: Para funcionalidades dinámicas.
- **PHP**: Gestión del formulario de contacto.
- **JSON**: Gestión de traducciones.
- **Visual Studio Code**: Configuración específica para el editor en la carpeta `.vscode`.

## Instalación y configuración

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd HANUMAN-main
   ```

2. **Configurar un servidor local**:
   - Si usas XAMPP o WAMP, coloca la carpeta del proyecto en el directorio `htdocs`.
   - Accede al proyecto desde tu navegador en `http://localhost/HANUMAN-main`.

3. **Configurar traducciones**:
   - Los archivos de idioma están en `en.json` y `es.json`. Asegúrate de añadir traducciones pendientes en las secciones `services`, `about`, `contact` y `seminaries`.

## Uso

Una vez configurado el proyecto:

- Navega a la página principal (`index.html`).
- Explora las secciones disponibles como "Instalaciones" y "Seminarios".
- Utiliza el formulario de contacto para enviar mensajes.

## Tareas pendientes

1. **Completar traducciones**:
   - Faltan las traducciones de las secciones: `services`, `about`, `contact`, y `seminaries`.

2. **Mejoras en la interfaz**:
   - Ajustar el nombre de las pestañas según la página actual.
   - Arreglar el preloader en la página de instalaciones.

3. **Adaptabilidad**:
   - Asegurarse de que el diseño responda correctamente en todos los dispositivos y tamaños de pantalla.

4. **Documentación**:
   - Mantener actualizado este archivo `README.md` con los avances y cambios futuros.

## Contribuciones

¡Las contribuciones son bienvenidas! Para colaborar:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Descripción de los cambios'`).
4. Envía un Pull Request para revisión.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme a través del repositorio o abrir un issue.

---

¡Gracias por explorar **HANUMAN**!
