document.addEventListener("DOMContentLoaded", () => {
    // Mapa
    const map = L.map('map').setView([22.17, -100.99], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const sucursales = [
        {nombre: "Botanas Provi (Sucursal 1)", lat: 22.2131687, lng: -101.0449406},
        {nombre: "Distribuidora Botanas Provi (Sucursal 2)", lat: 22.1559955, lng: -100.9749457},
        {nombre: "Provi Botanas (Sucursal 3)", lat: 22.1501108, lng: -100.9916967},
        {nombre: "Distribuidora Botanas Provi (Sucursal 4)", lat: 22.123781, lng: -100.9659669}
    ];

    sucursales.forEach(suc => {
        L.marker([suc.lat, suc.lng])
            .addTo(map)
            .bindPopup(`<strong>${suc.nombre}</strong>`);
    });

    // Galería
    const imagenes = [
        {src: "producto1.jpg", caption: "Papas fritas Provi con sal 90 g"},
        {src: "producto2.jpg", caption: "Papas fritas Botanas Provi Adobada 90 g"},
        {src: "producto3.jpg", caption: "Churros verdes 120 g"},
        {src: "producto4.jpg", caption: "Rines 80 g"},
        {src: "producto5.jpg", caption: "Totopos 90 g"},
        {src: "producto6.jpg", caption: "Cacahuates Salados 60 g"},
        {src: "producto7.jpg", caption: "Cacahuates enchilados 55 g"},
        {src: "producto8.jpg", caption: "Chicharrones de cerdo 120 g"}
    ];

    let indice = 0;
    const galeriaImg = document.getElementById("galeria-img");
    const galeriaCaption = document.getElementById("galeria-caption");
    const indicadores = document.getElementById("indicadores");

    imagenes.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("bolita");
        dot.addEventListener("click", () => {
            indice = i;
            mostrarImagen(indice);
            reiniciarIntervalo();
        });
        indicadores.appendChild(dot);
    });

    const bolitas = document.querySelectorAll(".bolita");

    function mostrarImagen(i) {
        galeriaImg.src = imagenes[i].src;
        galeriaCaption.textContent = imagenes[i].caption;
        bolitas.forEach(b => b.classList.remove("activa"));
        bolitas[i].classList.add("activa");
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
        indice = (indice - 1 + imagenes.length) % imagenes.length;
        mostrarImagen(indice);
        reiniciarIntervalo();
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        indice = (indice + 1) % imagenes.length;
        mostrarImagen(indice);
        reiniciarIntervalo();
    });

    let autoCambio = setInterval(() => {
        indice = (indice + 1) % imagenes.length;
        mostrarImagen(indice);
    }, 5000);

    function reiniciarIntervalo() {
        clearInterval(autoCambio);
        autoCambio = setInterval(() => {
            indice = (indice + 1) % imagenes.length;
            mostrarImagen(indice);
        }, 5000);
    }

    mostrarImagen(indice);

    // Configurar jsPDF
    window.jsPDF = window.jspdf.jsPDF;

    // Generación de PDF
    document.getElementById('formContratacion').addEventListener('submit', function(e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            alert("Por favor complete todos los campos requeridos");
            return;
        }

        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            experiencia: document.getElementById('experiencia').value,
            puesto: document.getElementById('puesto').value,
            disponibilidad: document.getElementById('disponibilidad').value,
            motivacion: document.getElementById('motivacion').value
        };

        try {
            const doc = new jsPDF();
            let y = 20;
            const lineHeight = 10;
            const pageHeight = 280;

            doc.setFontSize(18);
            doc.text("Solicitud de Empleo - Botanas Provi", 20, y);
            y += 15;

            doc.setFontSize(12);
            const contenido = [
                `Nombre: ${formData.nombre}`,
                `Email: ${formData.email}`,
                `Teléfono: ${formData.telefono}`,
                `Experiencia: ${formData.experiencia} años`,
                `Puesto solicitado: ${formData.puesto}`,
                `Disponibilidad: ${formData.disponibilidad}`,
                "Motivación:",
                ...doc.splitTextToSize(formData.motivacion, 170)
            ];

            contenido.forEach(line => {
                if (y > pageHeight) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(20, y, line);
                y += lineHeight;
            });

            const nombreArchivo = `Solicitud_${formData.nombre.replace(/ /g, '_')}.pdf`;
            doc.save(nombreArchivo);

            const mensaje = document.getElementById('mensaje-exito');
            mensaje.style.display = 'block';
            mensaje.innerHTML = `
                <p>¡Solicitud enviada con éxito!</p>
                <p>El PDF se ha generado correctamente.</p>
            `;

            this.reset();

        } catch (error) {
            console.error('Error:', error);
            alert('Error al generar el PDF: ' + error.message);
        }
    });

    // FAQ
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
        });
    });



    

});
