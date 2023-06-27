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
                    <i class="fas fa-gem me-3"></i>Company name
                  </h6>
                  <p>
                    Here you can use rows and columns to organize your footer content. Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <!-- Links -->
                  <h6 class="text-uppercase fw-bold mb-4">
                    Products
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
                    Useful links
                  </h6>
                  <p>
                    <a href="#!" class="text-reset">Pricing</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset">Settings</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset">Orders</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset">Help</a>
                  </p>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <!-- Links -->
                  <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                  <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
                  <p>
                    <i class="fas fa-envelope me-3"></i>
                    info@example.com
                  </p>
                  <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
                  <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
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