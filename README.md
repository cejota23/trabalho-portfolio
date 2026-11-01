# 🚀 Portfólio Profissional de TI - César Assunção da Silva Jr

Portfólio moderno, minimalista e responsivo desenvolvido com **HTML5 semântico, CSS3 e JavaScript**, projetado com foco em oportunidades e processos seletivos no mercado de Tecnologia da Informação (estágio, jovem aprendiz ou desenvolvedor júnior).

---

## 🎨 Identidade Visual e Recursos

- **Paleta de Cores:** Azul elétrico (`#3b82f6`), Roxo moderno (`#8b5cf6`), Branco e fundo Azul-marinho profundo (`#090d16`).
- **Design Minimalista:** Espaçamentos equilibrados, tipografia de alta legibilidade (`Plus Jakarta Sans` e `JetBrains Mono`), sem poluição visual.
- **Animações Fluidas:** Efeitos suaves de entrada com `Intersection Observer`, cartões com elevação sutil e suporte completo a `prefers-reduced-motion`.
- **Totalmente Responsivo:** Perfeita adaptação para celulares, tablets e computadores.
- **Performance Máxima:** 100% código nativo (HTML/CSS/JS puros), sem bibliotecas pesadas, carregamento instantâneo.

---

## 📁 Estrutura de Arquivos

```text
├── index.html          # Estrutura principal da página (seções: Início, Sobre, Skills, Projetos, Contato)
├── css/
│   └── styles.css      # Estilização completa, variáveis de tema, responsividade e animações
├── js/
│   └── script.js       # Lógica do menu móvel, animações ao rolar, cópia de e-mail e interatividade
├── assets/             # Pasta reservada para suas imagens reais (foto de perfil, prints de projetos)
└── README.md           # Guia de uso e personalização
```

---

## ✏️ Como Personalizar

### 1. Inserir sua Foto Pessoal
No arquivo `index.html`, localize o bloco `<div class="photo-content-area" id="profilePhotoArea">`:
1. Salve uma foto sua (de preferência quadrada ou retrato, em boa resolução) na pasta `assets/minha-foto.jpg`.
2. Substitua o bloco `<div class="avatar-tech-display">...</div>` por:
```html
<img src="assets/minha-foto.jpg" alt="Foto de César Assunção da Silva Jr" class="profile-real-photo">
```
3. No arquivo `css/styles.css`, basta aplicar a classe caso queira:
```css
.profile-real-photo {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-purple);
}
```

### 2. Atualizar Links de Contato e Redes
No arquivo `index.html`, vá até a seção `#contato`:
- Substitua `cesar.assuncao@exemplo.com` pelo seu endereço de e-mail real (no texto e no atributo `href="mailto:seu-email@..."`).
- Adicione o link do seu perfil no LinkedIn no botão "Conectar": `href="https://linkedin.com/in/seu-perfil"`.
- Adicione o link da sua conta no GitHub no botão "Acessar": `href="https://github.com/seu-usuario"`.

### 3. Adicionar Novos Projetos
Na seção `#projetos` do `index.html`, você já encontra:
1. O card do seu **Portfólio Pessoal**.
2. Um card de **Projeto Prático** (ex: gerenciador de tarefas).
3. Um card com **Estrutura Pronta** (`[Nome do Seu Novo Projeto]`), pronto para você duplicar ou preencher com trabalhos do colégio Raphael Di Santo ou estudos individuais.

---

## 🌐 Como Publicar Gratuitamente

### Opção 1: GitHub Pages (Recomendado para TI)
1. Crie um repositório no seu GitHub chamado `portfolio` ou `cesar-assuncao.github.io`.
2. Suba todos os arquivos desta pasta.
3. Acesse **Settings** > **Pages** no seu repositório.
4. Em **Branch**, selecione `main` e a pasta `/ (root)`. Clique em **Save**.
5. Seu site estará no ar em poucos segundos no endereço `https://seu-usuario.github.io/portfolio`.

### Opção 2: Vercel ou Netlify
- Basta conectar sua conta do GitHub e importar o repositório com 1 clique (deploy automático a cada atualização).

---

© César Assunção da Silva Jr • Desenvolvido com foco em excelência e profissionalismo.
