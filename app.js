document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mousemove', e =>{
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
});

document.querySelector(".contact-btn").addEventListener("click", function () {
    const section = document.getElementById("contact");
    const yOffset = -80; // adjust based on header height
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
});

const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');
const video4 = document.getElementById('projectVideo4');

const videoList = [video1, video2, video3, video4];

videoList.forEach(function(video){
    video.addEventListener('mouseenter', function(){
        video.play();
    })
    video.addEventListener('mouseleave', function(){
        video.pause();
    })
})

successMessage = document.getElementById('successMessage');

// document.getElementById('contactForm').addEventListener('submit', function(e){
//     e.preventDefault();
//     document.getElementById('successMessage').style.display = 'block';

//     this.reset();

//     setTimeout(function(){
//         document.getElementById('successMessage').style.display = 'none';
//     }, 3000);
// })

// Initialize EmailJS
(function () {
    emailjs.init("DhwWo9pI02QffAMcK"); // replace this
})();

// Form Submit
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = document.getElementById("submitBtn");
    btn.innerText = "Sending...";

    emailjs.send("service_o17oc9j", "template_paf3e3o", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    })
    .then(() => {
        btn.innerText = "SEND MESSAGE";

        document.getElementById("successMessage").style.display = "block";

        document.getElementById("contactForm").reset();

        // Hide message after 4 sec
        setTimeout(() => {
            document.getElementById("successMessage").style.display = "none";
        }, 4000);
    })
    .catch((error) => {
        btn.innerText = "SEND MESSAGE";
        alert("Failed to send message !!");
        console.log(error);
    });
});