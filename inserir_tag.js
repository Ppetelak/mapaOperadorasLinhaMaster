const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync("./index.html", "utf-8");
const dom = new JSDOM(html);
const document = dom.window.document;

const gestoresOdonto = `
<h6> Gestores Odonto </h6>
<div class="col-12 mb-3">
    <h6><strong> Priscila </strong></h6>
    <a href="https://api.whatsapp.com/send?phone=5511953662806" target="_blank">
        <button class="btn btn-primary whatsapp"><i class="bi bi-whatsapp"></i> 11 5366 2806</button>
    </a>
</div>`;

const novaOperadora = `
<div class="col-4">
    <a href="https://nextcloud.mounthermon.com.br/s/jTpFfaSadHBQaiR" target="_blank">
        <img src="https://dental.mounthermon.com.br/arquivos/porto-seguro-saude.png" class="img-fluid d-block">
    </a>
</div>`;

const estadosDiv = document.querySelectorAll(".estadoDiv");

estadosDiv.forEach((estadoDiv) => {
  const divisorInterno = estadoDiv.querySelector(".divisorInterno");
  if (divisorInterno) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = gestoresOdonto;
    divisorInterno.before(wrapper);
  }

  const rows = estadoDiv.querySelectorAll(".row");
  rows.forEach((row) => {
    const heading = row.querySelector("h6");
    if (heading && heading.textContent.trim() === "Operadoras") {
      const portoWrapper = document.createElement("div");
      portoWrapper.innerHTML = novaOperadora;
      row.appendChild(portoWrapper);
    }
  });
});

// NOVO HTML = new_index.html
fs.writeFileSync("new_index.html", dom.serialize(), "utf-8");
