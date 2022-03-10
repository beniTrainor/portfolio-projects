(function () {
// Beginning of IIFE


// DOM references
// =============================================================================
const slide_title = document.querySelector("#slide-title");
const random_image = document.querySelector("#img-random");
// =============================================================================


// Global Settings
// =============================================================================
const INTERVAL_DURATION_IN_SECONDS = 2;
let interval;
let is_interval_running = false;
let last_used_image_file = "";
let last_used_title_text = "";
let last_used_google_font = "";
// =============================================================================


// Utility functions
// =============================================================================
function random_choice(array) {
    // Returns a random item from an array
    return array[Math.floor(Math.random() * array.length)];
}

function random_int_from_range(bottom, top) {
    // Returns an random integer in between a specified range
    return Math.floor(Math.random() * (top - bottom));
}

function random_color() {
    // Returns a random hexadecimal color string
    let hex_color = "#";
    for (let i = 0; i < 6; i += 1) {
        hex_color += random_choice("0123456789abcdef".split(""));
    }
    return hex_color;
}
// =============================================================================


// Slides information
// =============================================================================
const slides_many_to_many = [
    {
        titles: [
            "Don't have dreams. Have goals.",
            "Learn and Enjoy with Miss & Mister Language",
            "Consigue tus objetivos en 2 meses con nuestro pack de 35 horas!",
            "Necesitas ayuda para preparte con tu exámen oficial? Te ayudamos!"
        ],
        images: [
            "learn-english-1.jpg",
            "learn-english-2.jpg",
        ]
    }

];

const slide_texts = [
    "Don't have dreams. Have goals.",
    "Learn and Enjoy with Miss & Mister Language",
    "Consigue tus objetivos en 2 meses con nuestro pack de 35 horas!",
    "Necesitas ayuda para preparte con tu exámen oficial? Te ayudamos!"
];



const slide_image_files = [
    "learn-catalan-1.jpg",
    "learn-english-1.jpg",
    "learn-english-2.jpg",
    "learn-spanish-1.png",
    "funny-alligator-in-vest.jpg",
    "funny-a-piece-of-cake.jpg",
    "funny-appendix-removal.jpg",
    "funny-attractive-magnets.png",
    "funny-bear-deer-fight.jpg",
    "funny-big-fan-of-yours.jpg",
    "funny-birds-meet-online.gif",
    "funny-bullet-got-fired.jpg",
    "funny-cat-with-glasses-reading-english.jpg",
    "funny-coffee-and-mug-empty.jpg",
    "funny-english-is-hard-examples.jpg",
    "funny-fixed-lamp.jpg",
    "funny-getting-in-the-airplane.jpg",
    "funny-goose-bumps.jpg",
    "funny-homer-simpson-celebrates.jpg",
    "funny-ice-cream-screams.jpg",
    "funny-irony-your-an-idiot.jpg",
    "funny-kick-the-bucket.jpg",
    "funny-learn-english-to-avoid-mistakes.jpg",
    "funny-leaves-fall-for-you.jpg",
    "funny-lets-eat-grandma.jpg",
    "funny-lost-sock.jpg",
    "funny-no-words-in-things.jpg",
    "funny-problems-and-issues.jpg",
    "funny-quote-question-mark.jpg",
    "funny-rock-rule.jpg",
    "funny-screw-screws-up.jpg",
    "funny-spaghetti-meets-ball.jpg",
    "funny-squirrel-realizes-hes-nuts.jpg",
    "funny-sugar-daddy.jpg",
    "funny-the-fourth-ape.jpg",
    "funny-weird-english-words-tough-thorough-etc.jpg",
    "funny-you-drive-crazy-screwdriver.jpg"
];


const google_fonts = [
    "Lobster",
    "Pacifico",
    "Sansita Swashed",
    "Noto Serif",
    "Fredoka"
];
// =============================================================================


// =============================================================================
(function() {

    // Load Google Fonts

    const base_url = "https://fonts.googleapis.com/css?family=";

    google_fonts.forEach(function (font) {

        const font_url = base_url + font.replaceAll(" ", "+");

        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.href = font_url;

        document.head.appendChild(link);
    });

}());

function set_slideshow_interval() {

    is_interval_running = true;

    return setInterval(function () {

        let selected_title_text = random_choice(slide_texts);
        while (selected_title_text === last_used_title_text) {
            selected_title_text = random_choice(slide_texts);
        }
        last_used_title_text = selected_title_text;

        slide_title.innerText = selected_title_text;

        let selected_google_font = random_choice(google_fonts);
        while (selected_google_font === last_used_google_font) {
            selected_google_font = random_choice(google_fonts);
        }
        last_used_google_font = selected_google_font;
        console.log({selected_google_font});
        slide_title.style.fontFamily = selected_google_font;

        let selected_image_file = random_choice(slide_image_files);
        while (selected_image_file === last_used_image_file) {
            selected_image_file = random_choice(slide_image_files);
        }
        last_used_image_file = selected_image_file;

        random_image.src = "./slide-images/" + selected_image_file;

        const degrees = random_int_from_range(0, 360);
        const color = random_color();

        document.body.style.background = `linear-gradient(${degrees}deg, ${color}, transparent)`;

    }, INTERVAL_DURATION_IN_SECONDS * 1000);
}

document.body.addEventListener("click", function () {
    if (is_interval_running) {
        clearInterval(interval);
        is_interval_running = false;
    } else {
        interval = set_slideshow_interval();
    }
});

interval = set_slideshow_interval();


// =============================================================================





// End of IIFE
}());
