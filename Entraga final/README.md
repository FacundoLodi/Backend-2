# Documentación de Endpoints

---

## Base URL

```bash
http://localhost:8080/api
```

---

## Índice

- [Usuarios y Autenticación](#usuarios-y-autenticación)
- [Productos](#productos)
- [Carrito](#carrito)
- [Recuperación de Contraseña](#recuperación-de-contraseña)
- [Notas Importantes](#notas-importantes)

---

# Usuarios y Autenticación

### Registrar Usuario

| Método | Endpoint |
|:--|:--|
| **POST** | `http://localhost:8080/api/users/register` |

```json
{
  "first_name": "Nombre",
  "last_name": "Apellido",
  "email": "usuario@gmail.com",
  "age": 25,
  "password": "123456"
}
```

---

### Login

| Método | Endpoint |
|:--|:--|
| **POST** | `http://localhost:8080/api/sessions/login` |

```json
{
  "email": "usuario@gmail.com",
  "password": "123456"
}
```

**Importante:** Guardar la cookie **token** que devuelve el servidor.

---

### Usuario Actual

| Método | Endpoint |
|:--|:--|
| **GET** | `http://localhost:8080/api/sessions/current` |

Devuelve los datos del usuario logueado y su carrito asociado.

---

### Actualizar Usuario

| Método | Endpoint |
|:--|:--|
| **PUT** | `http://localhost:8080/api/users/{USER_ID}` |

---

### Eliminar Usuario (Solo Admin)

| Método | Endpoint |
|:--|:--|
| **DELETE** | `http://localhost:8080/api/users/{USER_ID}` |

---

# Productos

### Crear Producto

| Método | Endpoint |
|:--|:--|
| **POST** | `http://localhost:8080/api/products` |

```json
{
  "title": "Siega",
  "description": "Primera parte de la saga El Arco de la Guadaña",
  "price": 15000,
  "stock": 20,
  "category": "Libros"
}
```

---

### Ver Productos

| Método | Endpoint |
|:--|:--|
| **GET** | `http://localhost:8080/api/products` |

---

### Editar Producto

| Método | Endpoint |
|:--|:--|
| **PUT** | `http://localhost:8080/api/products/{PRODUCT_ID}` |

---

### Eliminar Producto (Solo Admin)

| Método | Endpoint |
|:--|:--|
| **DELETE** | `http://localhost:8080/api/products/{PRODUCT_ID}` |

---

# Carrito

### Ver Carrito Actual

| Método | Endpoint |
|:--|:--|
| **GET** | `http://localhost:8080/api/carts/current` |

---

### Ver Carrito por ID

| Método | Endpoint |
|:--|:--|
| **GET** | `http://localhost:8080/api/carts/{CART_ID}` |

---

### Agregar Producto al Carrito

| Método | Endpoint |
|:--|:--|
| **POST** | `http://localhost:8080/api/carts/{CART_ID}/product/{PRODUCT_ID}` |

---

### Finalizar Compra

| Método | Endpoint |
|:--|:--|
| **POST** | `http://localhost:8080/api/carts/purchase` |

Genera un ticket de compra, descuenta stock y devuelve productos sin disponibilidad.

---

### Historial de Compras

| Método | Endpoint |
|:--|:--|
| **GET** | `http://localhost:8080/api/carts/my-tickets` |

Devuelve todos los tickets generados por el usuario logueado.

---

# Recuperación de Contraseña

### Solicitar Recuperación

| Método | Endpoint |
|:--|:--|
| **POST** | `http://localhost:8080/api/sessions/forgot-password` |

```json
{
  "email": "user@test.com"
}
```

---

### Resetear Contraseña con Token

| Método | Endpoint |
|:--|:--|
| **POST** | `http://localhost:8080/api/sessions/reset-password/{TOKEN}` |

```json
{
  "password": "NuevaPassword123"
}
```

---

### Cambiar Contraseña (Usuario Logueado)

| Método | Endpoint |
|:--|:--|
| **PUT** | `http://localhost:8080/api/sessions/password` |

```json
{
  "currentPassword": "123456",
  "newPassword": "abcdef123"
}
```

---

# Notas Importantes

Las rutas protegidas requieren la cookie **token**.  
Las eliminaciones de productos y usuarios requieren rol **Admin**.  
Las compras generan tickets automáticos.