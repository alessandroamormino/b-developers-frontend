<script>

export default {
    name: "AppFooter",
    data() {
        return {};
    },
}
</script>
<template>
    <footer class="bg-light text-center text-white">

      <!-- Grid container -->
      <div class="container p-4 pb-0 mt-5">
        <!-- Links -->
          <section class="">
            <div class="container text-center text-md-start my-5" style="color:#333333">
              <!-- Grid row -->
              <div class="row mt-3">
                <!-- Grid column -->
                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <!-- Content -->
                  <h6 class="text-uppercase fw-bold mb-4">
                    <img src="img/bdevelopers-website-favicon-black.png" alt=""> <span>BDevelopers</span>
                  </h6>
                  
                  <p>
                    Una soluzione fatta apposta per il business.
                    Approfitta di un'esperienza curata per accedere a talenti selezionati e strumenti esclusivi.
                  </p>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <!-- Links -->
                  <h6 class="text-uppercase fw-bold mb-4">
                    <i class="fa-solid fa-microchip"></i> <span class="footer-lil-title">Servizi</span>
                  </h6>
                  <p>
                    <a href="#!" class="text-reset">Angular</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset">React</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset">Vue</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset">Laravel</a>
                  </p>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <!-- Links -->
                  <h6 class="text-uppercase fw-bold mb-4">
                    <i class="fa-solid fa-link"></i> <span class="footer-lil-title">Link Utili</span>
                  </h6>
                  <p>
                    <a href="#!" class="text-reset">Prezzi</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset">Impostazioni</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset">Ordini</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset">Assistenza</a>
                  </p>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <!-- Links -->
                  <h6 class="text-uppercase fw-bold mb-4">
                    <i class="fa-regular fa-address-card"></i> <span class="footer-lil-title">Contatti</span>
                  </h6>
                  <p><i class="fas fa-home me-3"></i> Vle Cassala 22 Milano Lombardia</p>
                  <p>
                    <i class="fas fa-envelope me-3"></i>
                    BDevelopers@email.it
                  </p>
                  <p><i class="fas fa-phone me-3"></i> + 02 367 890 22</p>
                  <p><i class="fas fa-print me-3"></i> + 02 690 582 37</p>
                </div>
                <!-- Grid column -->
              </div>
              <!-- Grid row -->
            </div>
          </section>
          <!-- Links -->
        <!-- Section: Social media -->
        <section class="my-5" id="footer-icons">
          <!-- Facebook -->
          <span
            class="btn text-white btn-floating m-1"
            style="background-color: #3b5998;"
            role="button"
            ><i class="fab fa-facebook-f"></i
          ></span>

          <!-- Twitter -->
          <span
            class="btn text-white btn-floating m-1"
            style="background-color: #55acee;"
            role="button"
            ><i class="fab fa-twitter"></i
          ></span>

          <!-- Google -->
          <span
            class="btn text-white btn-floating m-1"
            style="background-color: #dd4b39;"
            role="button"
            ><i class="fab fa-google"></i
          ></span>

          <!-- Instagram -->
          <span
            class="btn text-white btn-floating m-1"
            style="background-color: #ac2bac;"
            role="button"
            ><i class="fab fa-instagram"></i
          ></span>

          <!-- Linkedin -->
          <span
            class="btn text-white btn-floating m-1"
            style="background-color: #0082ca;"
            href=""
            role="button"
            ><i class="fab fa-linkedin-in"></i
          ></span>
          <!-- Github -->
          <span
            class="btn text-white btn-floating m-1"
            style="background-color: #333333;"
            role="button"
            ><i class="fab fa-github"></i
          ></span>
        </section>
        <!-- Section: Social media -->
      </div>
      <!-- Grid container -->

      

      <!-- Copyright -->
      <div class="text-center p-3" id="footer-bottom">
        © 2023 Copyright:
        <span>Team 1</span>
      </div>
      <!-- Copyright -->
    </footer>

</template>
<style lang="scss" scoped>


#footer-bottom {
  background-color: rgb(20, 110, 190);
  color:white;

  span {
    color:white;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      color: blueviolet;
    }

  }
}

h6 {
  display: flex;
  align-items: center;
}

img{
  width: 8%;
  margin-right: 5px;
}

.footer-lil-title {
  margin-left: 10px;
}

#footer-icons {
  
  span {
    transition: none;
    -webkit-transition: all .4s ease;

    &:hover {
      transform: scale(1.2);
      transition: none;
      -webkit-transition: all .4s ease;
    }
  }
}
</style>