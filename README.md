# Sorteio Frontend

Frontend em Next (app router) + Tailwind v4 para conectar ao backend WebSocket.

- Configure `NEXT_PUBLIC_WS_URL` com a URL do seu backend (Render) antes de deploy.
- O admin recebe o mapeamento completo no evento `draw_result_admin` e deve salvá-lo no `localStorage` (o código já salva automaticamente no admin quando o evento chega).
