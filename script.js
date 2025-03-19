document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("testimonial-form");
    const container = document.getElementById("testimonial-container");

    // Testimonios predeterminados
    const defaultTestimonials = [
        {
            text: "Trabajar con Osbaldo fue una experiencia excepcional. Entendió perfectamente nuestras necesidades y entregó un sistema que superó nuestras expectativas. Su conocimiento técnico y profesionalidad son de primer nivel.",
            name: "Carlos Rodríguez",
            role: "Director de Tecnología, Empresa XYZ",
            image: "./formal-2.webp"
        },
        {
            text: "La capacidad técnica y la atención al detalle de Osbaldo nos permitieron implementar un sistema de gestión que transformó nuestra operativa diaria. El proyecto se entregó a tiempo y dentro del presupuesto.",
            name: "Laura Martínez",
            role: "CEO, Startup Innovadora",
            image: "./formal-4.webp"
        }
    ];

    // Cargar testimonios (incluyendo los predeterminados)
    const testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    const allTestimonials = [...defaultTestimonials, ...testimonials];
    renderTestimonials(allTestimonials);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const text = document.getElementById("testimonial-text").value;
        const name = document.getElementById("client-name").value;
        const role = document.getElementById("client-role").value;
        const imageInput = document.getElementById("client-image").files[0];

        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = imageInput ? e.target.result : "./default-user.png";

            const newTestimonial = { text, name, role, image: imageUrl };
            testimonials.push(newTestimonial);
            localStorage.setItem("testimonials", JSON.stringify(testimonials));

            renderTestimonials([...defaultTestimonials, ...testimonials]);
            form.reset();
        };

        if (imageInput) {
            reader.readAsDataURL(imageInput);
        } else {
            reader.onload();
        }
    });

    function renderTestimonials(allTestimonials) {
        container.innerHTML = "";
        allTestimonials.forEach((testimonial) => {
            const testimonialElement = `
                <div class="testimonial">
                    <p>"${testimonial.text}"</p>
                    <div class="client-info">
                        <div class="client-image">
                            <img src="${testimonial.image}" alt="${testimonial.name}">
                        </div>
                        <div class="client-details">
                            <h4>${testimonial.name}</h4>
                            <p>${testimonial.role}</p>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += testimonialElement;
        });
    }
});

const audioPlayer = document.getElementById('audioPlayer');
    
audioPlayer.addEventListener('play', function() {
    audioPlayer.volume = 0.5;  // Establecer volumen al 50%
    audioPlayer.muted = false;  // Desactivar el mute después de que empiece a reproducirse
});