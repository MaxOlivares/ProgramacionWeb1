function guardarPost(titulo, contenido) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.unshift({
    titulo,
    contenido,
    fecha: new Date().toISOString()
  });
  localStorage.setItem("posts", JSON.stringify(posts));
}

function cargarPosts() {
  const container = document.getElementById("posts");
  container.innerHTML = "";
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.forEach(post => {
    const article = document.createElement("article");
    article.className = "blog-post";
    article.innerHTML = `
      <h2>${post.titulo}</h2>
      <p class="blog-date">${new Date(post.fecha).toLocaleString()}</p>
      <p>${post.contenido}</p>
    `;
    container.appendChild(article);
  });
}

document.getElementById("formulario-post").addEventListener("submit", function (e) {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const contenido = document.getElementById("contenido").value.trim();
  if (!titulo || !contenido) return alert("Completa todos los campos");

  guardarPost(titulo, contenido);
  this.reset();
  cargarPosts();
});

window.addEventListener("DOMContentLoaded", cargarPosts);

const toggleBtn = document.getElementById("toggle-form");
const form = document.getElementById("formulario-post");

toggleBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
  toggleBtn.textContent = form.classList.contains("hidden")
    ? "Crear nuevo post +"
    : "Ocultar formulario -";
});
