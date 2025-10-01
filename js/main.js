const images = document.querySelectorAll(".carrusel img");
let index = 0;
let interval = setInterval(nextImage, 4000); // cada 4s

function showImage(newIndex) {
  const current = images[index];
  const next = images[newIndex];

  // Quitar clases previas
  images.forEach((img) => img.classList.remove("active", "prev"));

  // Imagen actual → pasa a "prev" (se desvanece)
  current.classList.add("prev");

  // Imagen nueva → fade in
  next.classList.add("active");

  // Actualizar índice
  index = newIndex;
}

function nextImage() {
  let newIndex = (index + 1) % images.length;
  showImage(newIndex);
}

const nav = document.getElementById("site-nav");
const hamb = document.getElementById("hamb");
hamb?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  hamb.setAttribute("aria-expanded", String(open));
});

// Cerrar menú al hacer clic en un enlace (en mobile)
document.querySelectorAll("#menu a").forEach((a) => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// ============ Estado activo de enlace según scroll ============
const sections = ["#inicio", "#productos", "#marcas", "#ubicanos"].map((id) =>
  document.querySelector(id)
);
const links = Array.from(document.querySelectorAll("#menu a"));
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) =>
          l.classList.toggle(
            "active",
            l.getAttribute("href") === "#" + e.target.id
          )
        );
      }
    });
  },
  { rootMargin: "-60% 0px -40% 0px", threshold: 0 }
);
sections.forEach((s) => s && obs.observe(s));

// ============ Filtro de productos ============
const filterButtons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");
filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    cards.forEach((c) => {
      c.style.display = f === "all" || c.dataset.category === f ? "" : "none";
    });
  })
);

// ============ Año dinámico ============
document.getElementById("year").textContent = new Date().getFullYear();
