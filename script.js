document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("testimonial-form");
    const container = document.getElementById("testimonial-container");

    // Testimonios predeterminados
    const defaultTestimonials = [
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
