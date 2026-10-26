document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================
           PLACE DATA
        ===================================== */

        const places = [

            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 01",

                title:
                    "Place Name Here",

                description:
                    "Add the description of this place here. You can write information about its history, location, importance and connection to Sarozai."
            },


            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 02",

                title:
                    "Place Name Here",

                description:
                    "Add the description of this place here. Explain why this location is important to the people and community of Sarozai."
            },


            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 03",

                title:
                    "Place Name Here",

                description:
                    "Add information about this place, its background, location and importance to Sarozai."
            },


            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 04",

                title:
                    "Place Name Here",

                description:
                    "Add the official description of this location here. You can describe its history, surroundings and importance."
            },


            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 05",

                title:
                    "Place Name Here",

                description:
                    "Add information about the fifth important place of Sarozai here."
            },


            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 06",

                title:
                    "Place Name Here",

                description:
                    "Add information about this location, its history and connection with the people of Sarozai."
            },


            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 07",

                title:
                    "Place Name Here",

                description:
                    "Add the official information about this important place of Sarozai here."
            },


            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 08",

                title:
                    "Place Name Here",

                description:
                    "Add information about this place here. You can continue adding more places later."
            },


            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 09",

                title:
                    "Place Name Here",

                description:
                    "Add the description for this place of Sarozai here."
            },


            {
                image:
                    "/sarozai-village/static/images/places-1.jpg",

                number:
                    "PLACE 10",

                title:
                    "Place Name Here",

                description:
                    "Add the description for the tenth place here."
            }

        ];



        /* =====================================
           ELEMENTS
        ===================================== */

        const image =
            document.getElementById(
                "placesImage"
            );


        const imageWrap =
            document.getElementById(
                "placesImageWrap"
            );


        const number =
            document.getElementById(
                "placesNumber"
            );


        const title =
            document.getElementById(
                "placesTitle"
            );


        const description =
            document.getElementById(
                "placesDescription"
            );


        const dotsContainer =
            document.getElementById(
                "placesDots"
            );


        const previous =
            document.getElementById(
                "placesPrevious"
            );


        const next =
            document.getElementById(
                "placesNext"
            );



        if (
            !image ||
            !imageWrap ||
            !number ||
            !title ||
            !description ||
            !dotsContainer
        ) {

            return;

        }



        /* =====================================
           CURRENT PLACE
        ===================================== */

        let currentIndex = 0;



        /* =====================================
           CREATE DOTS
        ===================================== */

        places.forEach(
            function (place, index) {


                const dot =
                    document.createElement(
                        "button"
                    );


                dot.type = "button";


                dot.className =
                    "places__dot";


                dot.setAttribute(
                    "aria-label",
                    "Show " +
                    place.number
                );


                dot.addEventListener(
                    "click",
                    function () {

                        showPlace(index);

                        restartAutoPlay();

                    }
                );


                dotsContainer.appendChild(
                    dot
                );

            }
        );


        const dots =
            dotsContainer.querySelectorAll(
                ".places__dot"
            );



        /* =====================================
           SHOW PLACE
        ===================================== */

        function showPlace(index) {


            if (index < 0) {

                index =
                    places.length - 1;

            }


            if (
                index >= places.length
            ) {

                index = 0;

            }


            currentIndex = index;


            const place =
                places[currentIndex];



            /* IMAGE ANIMATION */

            image.classList.add(
                "is-changing"
            );


            setTimeout(
                function () {


                    image.src =
                        place.image;


                    image.alt =
                        place.title;


                    number.textContent =
                        place.number;


                    title.textContent =
                        place.title;


                    description.textContent =
                        place.description;


                    image.classList.remove(
                        "is-changing"
                    );


                },
                120
            );



            /* UPDATE DOTS */

            dots.forEach(
                function (dot, dotIndex) {

                    dot.classList.toggle(
                        "active",
                        dotIndex === currentIndex
                    );

                }
            );

        }



        /* =====================================
           NEXT
        ===================================== */

        function nextPlace() {

            showPlace(
                currentIndex + 1
            );

        }



        /* =====================================
           PREVIOUS
        ===================================== */

        function previousPlace() {

            showPlace(
                currentIndex - 1
            );

        }



        /* =====================================
           BUTTONS
        ===================================== */

        next.addEventListener(
            "click",
            function () {

                nextPlace();

                restartAutoPlay();

            }
        );


        previous.addEventListener(
            "click",
            function () {

                previousPlace();

                restartAutoPlay();

            }
        );



        /* =====================================
           SWIPE SUPPORT
        ===================================== */

        let touchStartX = 0;

        let touchStartY = 0;

        let touchEndX = 0;

        let touchEndY = 0;



        imageWrap.addEventListener(
            "touchstart",
            function (event) {

                stopAutoPlay();


                const touch =
                    event.changedTouches[0];


                touchStartX =
                    touch.clientX;


                touchStartY =
                    touch.clientY;

            },
            {
                passive: true
            }
        );



        imageWrap.addEventListener(
            "touchend",
            function (event) {


                const touch =
                    event.changedTouches[0];


                touchEndX =
                    touch.clientX;


                touchEndY =
                    touch.clientY;


                handleSwipe();


                startAutoPlay();

            },
            {
                passive: true
            }
        );



        function handleSwipe() {


            const differenceX =
                touchEndX -
                touchStartX;


            const differenceY =
                touchEndY -
                touchStartY;


            /*
             * Ignore vertical scrolling.
             */

            if (
                Math.abs(differenceY) >
                Math.abs(differenceX)
            ) {

                return;

            }


            /*
             * Minimum swipe distance.
             */

            if (
                Math.abs(differenceX) <
                45
            ) {

                return;

            }


            if (
                differenceX < 0
            ) {

                nextPlace();

            } else {

                previousPlace();

            }

        }



        /* =====================================
           AUTO PLAY
        ===================================== */

        let autoPlay = null;


        function startAutoPlay() {


            stopAutoPlay();


            autoPlay =
                setInterval(
                    function () {

                        nextPlace();

                    },
                    5000
                );

        }


        function stopAutoPlay() {


            if (
                autoPlay !== null
            ) {

                clearInterval(
                    autoPlay
                );


                autoPlay = null;

            }

        }


        function restartAutoPlay() {

            stopAutoPlay();

            startAutoPlay();

        }



        /* =====================================
           PAUSE WHEN MOUSE IS OVER IMAGE
        ===================================== */

        imageWrap.addEventListener(
            "mouseenter",
            function () {

                stopAutoPlay();

            }
        );


        imageWrap.addEventListener(
            "mouseleave",
            function () {

                startAutoPlay();

            }
        );



        /* =====================================
           INITIAL PLACE
        ===================================== */

        showPlace(0);

        startAutoPlay();


    }
);