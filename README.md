# Sorteio Frontend

Frontend em Next (app router) + Tailwind v4 para conectar ao backend WebSocket.

- Configure `NEXT_PUBLIC_WS_URL` com a URL do seu backend (Render) antes de deploy.
- O admin recebe o mapeamento completo no evento `draw_result_admin` e deve salvá-lo no `localStorage` (o código já salva automaticamente no admin quando o evento chega).

# TODO

### Telas

[x] - Inicial /
[X] - Sorteio /room
[ ] - Sorteio Admin /room/id
[ ] - Sorteio Join /room/id/join
[ ] - Sorteio Result /room/id/result

### Backlog

[ ] - Aside bar
[X] - Join Form
[ ] - remove participant do sorteio
[X] - Iniciar soretio button
[ ] - Lista das salas criadas
[ ] - Validar se o sorteio ja foi feito, e redirecionar para a pagina result
[ ] - Admin poder compartilhar link dos resultados das pessoas
[ ] - link do admin ser acessado somente com senha
[ ] - mini chat dos participantes
[X] - caso o admin acessar o link da sala, manter ele na sala de admin
[X] - caso um participant entrar na sala, redirecionar ele para /join
[ ] - Ter a opção de apagar a sala
