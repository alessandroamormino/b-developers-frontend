<script>
// importo axios
import AOS from 'aos';
import 'aos/dist/aos.css';

export default{
  name: "AppAbout",
  data() {
      return {
        aboutImages: [
            {
                path: "/public/img/dev1.jpg",
                role: 'Back-end Developer',
            },
            {
                path: "/public/img/dev2.jpg",
                role: 'Project Manager',
            },
            {
                path: "/public/img/dev3.jpg",
                role: 'HR Char Specialist',
            },
            {
                path: "/public/img/dev4.jpg",
                role: 'Front-end Developer',
            },
            {
                path: "/public/img/dev5.jpg",
                role: 'CEO',
            },
            {
                path: "/public/img/dev6.jpg",
                role: 'Designer',
            },
        ]
      };
  },

  methods: {
  }, 

  mounted() {
    AOS.init();
  }
}
</script>


<template>

    <div id="full-container" class="container d-flex flex-column justify-content-center" data-aos="fade-in" data-aos-duration="1400">
        <h1 class="text-center">Chi siamo</h1>

        <div id="img-container" class="container d-flex flex-wrap justify-content-center h-100 w-100">
            <div v-for="img in this.aboutImages" class="box">
                <img :src="img.path" alt="dev-img">
                <h4 class="role">{{ img.role }}</h4>
            </div>
        </div>

        <div class="container" id="team-description">
            <h3>La nostra Azienda</h3>
            <p>
                Benvenuti in BDevelopers, leader nel fornire sviluppatori talentuosi per le tue esigenze digitali. <br> Siamo esperti nello sviluppo di app, siti web e software personalizzati. <br> Offriamo soluzioni di alta qualità e un approccio flessibile alle tue esigenze specifiche. Scegli tra il nostro ampio pool di sviluppatori e goditi un servizio clienti di prima classe.<br> Unisciti a noi su BDevelopers per realizzare le tue idee digitali con successo.
            </p>
            <strong>Il tuo partner di fiducia per lo sviluppo su misura.</strong>
        </div>
    </div>
  
</template>


<style lang="scss" scoped>

    #full-container {
        min-height: 800px;
        padding-top: 130px;

        h1 {
            margin-bottom: 30px;
        }

        #img-container {
            gap: 20px;
            
            .box {
                width: calc(75% / 3 - (20px / 3 * 2));
                aspect-ratio: 1 / 1;
                position: relative;
                overflow: hidden;


                &::after {
                    content: '';
                    background-color: rgba(0, 0, 0, 0.5);
                    position: absolute;
                    top:0;
                    left: 0;
                    transition: all .3s ease-in-out;

                    width: 100%;
                    height: 100%;
                    }

                
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all .45s ease-in-out;

                }

                .role {
                    opacity: 0;
                    position:absolute;
                    bottom: 0;
                    left: 0;
                    transition: all .45s ease-in-out;


                    color: white;
                    text-shadow: 2px 2px 3px black;
                    padding: 5px;
                }

                &:hover {
                    .role {
                        opacity: 1;
                    }

                    img {
                        transform: scale(1.1);
                    }

                    &::after {
                        content: '';
                        background-color: transparent;
                    }
                }
            }
        }


        #team-description {
            max-width: 1000px;
            text-align: center;

            font-size: 1.1em;

            padding-top: 50px;
            padding-bottom: 50px;

            p {
                padding-bottom: 20px;
            }

            strong {
                font-size: 1.4em;
                font-family: 'Nothing You Could Do', cursive;
            }
        }
    }


    @media only screen and (max-width: 992px) {
        #full-container {

            #img-container {
        
                .box {
                    width: calc(100% / 2 - (20px / 2));
                    &::after {
                        content: '';
                        background-color: transparent;
                    }

                    .role {
                        opacity: 1;
                    }
                }
            }
        }
    }


    @media only screen and (max-width: 576px) {
        #full-container {

            #img-container {
        
                .box {
                    width: 80%;
                }
            }
        }
    }


</style>
