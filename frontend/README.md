## Arquitectura

Este proyecto sigue una **Arquitectura Hexagonal (Ports & Adapters)**. El objetivo es separar la lógica de negocio de los detalles de infraestructura para facilitar el mantenimiento, las pruebas y la escalabilidad.

### Estructura de carpetas

```text
src/
  app/                    # ÚNICAMENTE sistema de rutas (Next.js App Router)
    layout.tsx
    page.tsx
  domain/
    entities/             # Entidades del dominio
    ports/                # Puertos (interfaces)
  application/
    use-cases/            # Casos de uso
  infrastructure/
    adapters/             # Adaptadores que implementan los puertos
    http/                 # Cliente HTTP base (opcional)
  presentation/
    components/           # Componentes reutilizables
    hooks/                # Hooks que consumen casos de uso
    templates/            # Plantillas de página (presentacionales)

src/
  domain/
    entities/        # Tipos puros (Product, User...)
    ports/           # Interfaces (IProductRepository, IAuthRepository)
  application/
    use-cases/       # GetProducts, CreateProduct (usan ports)
  infrastructure/
    http/            # Cliente HTTP base
    adapters/        # Implementan ports (products.adapter.ts)
  presentation/
    hooks/           # hooks que usan use-cases
    components/      # UI
  app/               # Next App Router (pages/views)

Nota: Con App Router no existe pages/. Las rutas se definen mediante carpetas que contienen un page.tsx dentro de app/.
