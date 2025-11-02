# TX-FrontEndTest1

Proyecto de frontend para una tienda de productos, desarrollado en React. Permite visualizar una lista de productos, ver el detalle de cada uno, seleccionar opciones y añadirlos al carrito.

## Características

- **Listado de productos:** Página principal con todos los productos disponibles.
- **Detalle de producto:** Información detallada, opciones de color y almacenamiento.
- **Carrito de compras:** Añade productos y muestra el contador en el header.
- **Breadcrumbs:** Navegación jerárquica en la cabecera.
- **Barra de búsqueda:** Filtra productos por nombre y marca.
- **Rutas:** Navegación entre páginas usando React Router.
- **Consumo de API:** Obtiene productos y detalles desde una API externa.
- **Estilos:** Componentes estilizados con CSS modular.

## Estructura de carpetas

```
src/
├── components/
│   ├── Breadcrumbs.jsx
│   ├── Header.jsx
│   ├── Header.css
│   ├── ProductCard.jsx
│   ├── ProductCard.css
│   ├── ShoppingCart.jsx
│   ├── ShoppingCart.css
│   └── SearchBar.jsx
├── pages/
│   ├── ProductListPage.jsx
│   ├── ProductDetail.jsx
│   └── ProductDetail.css
├── assets/
│   └── shopping-cart.svg
├── App.jsx
├── main.jsx
└── ...
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/TX-FrontEndTest1.git
   cd TX-FrontEndTest1
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Uso

- Accede a la página principal para ver el listado de productos.
- Usa la barra de búsqueda para filtrar productos.
- Haz clic en un producto para ver su detalle.
- Selecciona color y almacenamiento, y añádelo al carrito.
- El contador del carrito se actualiza automáticamente.

## Dependencias principales

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- CSS Modules

## Notas

- El proyecto consume la API pública de [itx-frontend-test.onrender.com](https://itx-frontend-test.onrender.com).
- Las imágenes SVG esta en la carpeta `src/assets`.
- El contador del carrito se almacena en `localStorage`.

## Autor

VictorMC
