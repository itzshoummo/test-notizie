const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzToL5hLZqjj1GSLHmMok_lb3FHqenMVuzeHaR-GS71tVrzJb3yAxSDUpy22osv0HDW/exec"; // Web App Apps Script

const newsContainer = document.getElementById("news-container");
const avvisiContainer = document.getElementById("avvisi-container");

fetch(WEBAPP_URL)
  .then(res => res.json())
  .then(data => {
    // Ordina per data decrescente
    data.sort((a,b) => new Date(b.data) - new Date(a.data));

    data.forEach(item => {
      const div = document.createElement("article");
      div.className = (item.evidenza === "TRUE" ? "evidenza" : "");

      div.innerHTML = `
        <header>
          <time datetime="${item.data}">${new Date(item.data).toLocaleDateString("it-IT")}</time>
          <span class="categoria">${item.categoria}</span>
          <h3>${item.link ? `<a href="${item.link}" target="_blank">${item.titolo}</a>` : item.titolo}</h3>
        </header>
        ${item.immagine ? `<img src="${item.immagine}" alt="${item.titolo}">` : ""}
        <p>${item.testo}</p>
        ${item.allegato ? `<a href="${item.allegato}" target="_blank" class="allegato">📎 Allegato</a>` : ""}
      `;

      if(item.categoria.toLowerCase() === "notizie") newsContainer.appendChild(div);
      else avvisiContainer.appendChild(div);
    });
  })
  .catch(err => console.error("Errore fetch dati:", err));
