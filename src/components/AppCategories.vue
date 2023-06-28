<script>

export default {
    name: "AppCategories",
    data() {
        return {};
    },
}
</script>
<template>
    <section>
        <div class="container p-4 pb-0 mt-5">
            <h3 id="section-title">Lo cerchi, lo abbiamo.</h3>
            <div id="section-container">
                <div class="single-category">
                    <img src="img/graphics.png" alt="category-icon">
                    <span>Graphics & Design</span>
                </div>
                <div class="single-category">
                    <img src="img/digital_mark.png" alt="category-icon">
                    <span>Marketing Digitale</span>
                </div>
                <div class="single-category">
                    <img src="img/writing.png" alt="category-icon">
                    <span>Scrivere e tradurre</span>
                </div>
                <div class="single-category">
                    <img src="img/video.png" alt="category-icon">
                    <span>Video & Animation</span>
                </div>
                <div class="single-category">
                    <img src="img/music.png" alt="category-icon">
                    <span>Musica & Audio</span>
                </div>
                <div class="single-category">
                    <img src="img/programming.png" alt="category-icon">
                    <span>Programmazione & Tech</span>
                </div>
                <div class="single-category">
                    <img src="img/business.png" alt="category-icon">
                    <span>Business</span>
                </div>
                <div class="single-category">
                    <img src="img/lifestyle.png" alt="category-icon">
                    <span>Lifestyle</span>
                </div>
                <div class="single-category">
                    <img src="img/data.png" alt="category-icon">
                    <span>Informazioni & Data</span>
                </div>
                <div class="single-category">
                    <img src="img/fotografia.png" alt="category-icon">
                    <span>Fotografia</span>
                </div>

            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
section {
    margin: 0 auto 80px;
    font-family: 'Montserrat', sans-serif;


    #section-title {
        color: rgb(20, 110, 190);
        font-size: 2.5rem;
        letter-spacing: 2px;
    }

    #section-container {
        display: flex;
        flex-flow: row wrap;
        padding: 30px;

        .single-category {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            gap: 10px;
            width: calc(100% / 5);
            margin: 50px auto 30px;

            img {
                width: 20%;
                object-fit: contain;
                // border-bottom: 2px solid gray;
            }


            span {
                position: relative;
                font-weight: 500;

                &::before {
                    content: "";

                    position: absolute;
                    top: -5px;
                    left: 50%;
                    transform: translatex(-50%);
                    width: 50px;
                    height: 2px;
                    background-color: gray;
                    transition: none;
                    -webkit-transition: all .4s ease;
                }
            }

            &:hover {

                span::before {
                    width: 90px;
                    background-color:rgb(20, 110, 190);
                    transition: all .4s ease;
                    -webkit-transition: all .4s ease;
                }
            }
        }
    }
}

</style>
