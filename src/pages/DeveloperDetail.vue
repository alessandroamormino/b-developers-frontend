<script>
// importo axios
import axios from 'axios';
import {store} from '../store.js';

// stelline
import StarRating from 'vue-star-rating';

export default{
  name: "DeveloperDetail",
  data() {
      return {
        developerSlug: '',
        developer: {},
        store,
        isDeveloperFound: false,
        icons: [],
        ratingAVG: '',
        fullStars: '',
        halfStars: '',
        remainingStars: '',
        revName: '',
        revRate: '',
        revContent: '',
        completeName: '',

        // messaggi
        messageName: '',
        messageEmail: '',
        messageSubject: '',
        messageDate: '',
        messageContent: '',
        isMessageVisible: false,
        loaderVisible: false,

        messageSent: false,
        messageFailed: false,

        rateSent: false,
        rateFailed: false,

        reviewSent: false,
        reviewFailed: false,

      };

  },

  components: {
    StarRating,
  },

  methods: {

    getDevelopers() {
      this.loaderVisible = true;

        axios.get(this.store.URI + this.store.APIPath + '/' + this.developerSlug).then(response => {
            if(response.data.developer) {
                this.isDeveloperFound = true;
                this.developer = response.data.developer;
                this.completeName = this.developer.user.name + ' ' + this.developer.last_name;
                this.getRatingAVG();
                this.loaderVisible = false;
            } else {
                this.isDeveloperFound = false;
            }
        });
    },

    getRatingAVG() {
      this.ratingAVG = this.developer.ratingAVG;
    },

    getFullStars(avg) {
      return this.fullStar = Math.floor(avg);
    },

    getHalfStars(avg) {
      // return this.halfStars = Math.round(avg) - this.getFullStars(avg);
      return this.halfStars = Math.round(Math.floor(avg * 2) / 2 - this.getFullStars(avg));
    },

    getRemainingStars(avg) {
      return this.remainingStars = 5 - (this.getFullStars(avg) + Math.round(this.getHalfStars(avg)));
    },

    // Invio la recensione
    sendReview() {
      this.loaderVisible = true;

      axios.post(
        this.store.URI + 'api/reviews',
        {
          developer_id: this.developer.id,
          name: this.revName,
          comment: this.revContent,
        })
      .then(response => {
        console.log(response)
        this.loaderVisible = false;
        this.reviewSent = true;
      })
      .catch(error => {
        console.log(error)
        this.loaderVisible = false;
        this.reviewFailed = true;
      });

      this.revName = '';
      this.revContent = '';

    }, 

    sendRate(){
      this.loaderVisible = true;

      axios.post(
        this.store.URI + 'api/ratings',
        {
          developer_id: this.developer.id,
          rating: this.revRate,
        })
      .then(response => {
        console.log(response)
        this.loaderVisible = false;
        this.rateSent = true;
      })
      .catch(error => {
        console.log(error)
        this.loaderVisible = false;
        this.rateFailed = true;
      });

      this.revRate = '';
    },

    sendMessage(){
      this.loaderVisible = true;

      axios.post(
        this.store.URI + 'api/messages', 
      {
        developer_id: this.developer.id,
        name: this.messageName,
        email: this.messageEmail,
        subject: this.messageSubject,
        content: this.messageContent,
        meeting_date: this.messageDate,
      })
      .then(response => {
        console.log(response);
        this.loaderVisible = false;
        this.messageSent = true;
      })
      .catch(error => {
        console.log(error)
        this.loaderVisible = false;
        this.messageFail = true;
      });

      this.messageName = '';
      this.messageEmail = '';
      this.messageSubject = '';
      this.messageContent = '';
      this.messageDate = '';

      // alert("Messaggio inviato correttamente");

    },

    colorStars(index){
      console.log(index);
    }, 

    showMessageBox(){
      this.isMessageVisible = !this.isMessageVisible;
    },

    closeMessage() {
      this.messageSent = false;
      this.messageFailed = false;
      this.rateSent = false;
      this.rateFailed = false;
      this.reviewSent = false;
      this.reviewFailed = false;
      this.isMessageVisible = false;
    },


  },


  created() {
    this.developerSlug = this.$route.params.slug;
    this.getDevelopers();
  },

  computed: {
    getDevPicture() {
        return this.store.URI + 'storage/' + this.developer.picture;
    },

    getDevCV() {
        return this.store.URI + 'storage/' + this.developer.cv;
    },

    
    getSkillsIcons(){
        this.icons = [];

        for (let i = 0; i < this.developer.skills.length; i++) {
            this.icons.push(this.developer.skills[i].icon);
        }
        return this.icons;
    },



  }

};
</script>
<template>
  <div id="overlay" :class="this.isMessageVisible ? 'display' : ''" @click="this.isMessageVisible ? closeMessage() : ''">
  </div>
  <div class="big-container container d-flex my-5">

      <section class="card-section gradient-custom-2" v-if="this.isDeveloperFound">
        <div class="container py-5 h-100">
          <div class="row developer-card d-flex align-items-center h-100">
            <div class="col col-lg-9 col-xl-7 w-100 h-100">

              <div class="card w-100 h-100">
                <div class="rounded-top text-white d-flex flex-row justify-content-between" style="background-color: #146ebe; height:200px;">
                  <div class="profile-image d-flex p-2">
                    <img id="dev-picture" :src="getDevPicture" alt="Generic placeholder image" class="img-fluid img-thumbnail ">
                  </div>
                  <div id="user-header" style="padding-right: 15px;" class="d-flex flex-grow-1 flex-column gap-3 align-items-end justify-content-center h-100 w-25">
                    <div class="d-flex flex-column align-items-end">
                      <h3 style="text-align: end;">{{ this.developer.user.name }} {{ this.developer.last_name }}</h3>
                      <div v-if="this.developer.ratings.length > 0" class="stars h-100">
                        <i v-for="star in this.getFullStars(this.ratingAVG)" class="fa-solid fa-star"></i><i v-for="halfStar in this.getHalfStars(this.ratingAVG)" class="fa-solid fa-star-half-stroke"></i><i v-for="star in this.getRemainingStars(this.ratingAVG)" class="fa-regular fa-star "></i> 
                      </div>
                    </div>
                    <div class="px-2 d-flex flex-column align-items-center">
                      <p class="mb-1 h5">{{ this.developer.ratings.length}} </p>
                      <p class="small mb-0 text-white">Voti</p>
                    </div>
                  </div>
                </div>

                <div id="card-inner" class="p-2">
                  <div class="card-body text-black">
  
                    <div class="my-2 w-100">
                      <div class="p-2">
                        <p class="box-title">Informazioni</p>
                        <p><strong>Indirizzo:</strong> {{ this.developer.address }}</p>
                        <p><strong>Telefono:</strong> {{ this.developer.phone }}</p>
                        <p><strong>Titolo:</strong> {{ this.developer.role }}</p>
                        <p><strong>Prestazioni:</strong> {{ this.developer.services }}</p>
                      </div>
                    </div>
                    <hr>
                    <div class="my-2 w-100">
                      <div class="icons d-flex align-items-center">
                        <p class="box-title">Specializzazioni</p>
                        <img class="skill-icon" v-for="icon in getSkillsIcons" :src="this.store.URI + 'storage/' + icon" alt="">
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </section>

      <div v-else class="alert alert-warning">
          <p>Lo sviluppatore non è stato trovato</p>
      </div>

      <hr>

      <div class="form-section py-5">
        <div id="cv-container">
          <img id="dev-curriculum" :src="getDevCV" alt="developer-cv">
        </div>
        
        
      </div>
    </div>

    <div class="container">
      <div class="ratings-form">
          <h4>Dai un voto a <span>{{this.completeName}}</span></h4>
          <star-rating :rounded-corners="true" :border-width="3" :rating="1" v-model:rating="this.revRate" @click="sendRate()" :star-size="25" active-color="#ff0201" border-color="##ff0201" ></star-rating>
        </div>
  
        <hr>
  
        <div class="reviews-form">
          <h4>Lascia una tua recensione</h4>
          <form @submit.prevent="sendReview()" method="POST">
            <div class="mb-3 info-user">
              <label for="name" class="form-label"> Inserisci il tuo nome completo*</label>
              <input type="text" id="name" name="name" v-model="this.revName" class="form-control" required>
            </div>
            <div class="mb-3 content">
              <label for="content" class="form-label">Inserisci il tuo commento*</label>
              <textarea name="content" id="content" cols="30" rows="10" v-model="this.revContent" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Invia</button>
          </form>
          <div class="disclaimer mt-3">
            <em>I campi indicati con * sono obbligatori per l'invio della recensione.</em>
          </div>
        </div>
    </div>

 

    <!-- Messaggi -->
    
    <div class="messages-box" @click="showMessageBox()">
      <i class="fa-solid fa-envelope" style="color: #f7f7f7;"></i>
    </div>

    <div class="card p-3 message-form-container" :class="this.isMessageVisible ? 'show' : 'hide'">
      <div class="d-flex justify-content-between">
        <h5>Lascia un messaggio a <span>{{this.completeName}}</span></h5>
        <button type="button" class="btn-close" aria-label="Chiudi" @click="closeMessage()"></button>
      </div>
      <form @submit.prevent="sendMessage()" method="POST">
        <!-- name 	email 	subject 	meeting_date 	content -->
        <div class="mb-3 info-user">
          <label for="name" class="form-label">Inserisci il tuo nome completo*</label>
          <input type="text" id="name" name="name" v-model="this.messageName" class="form-control" max="255" required>
        </div>
        <div class="mb-3 info-mail">
          <label for="email" class="form-label">Inserisci la tua mail*</label>
          <input type="email" id="email" name="email" v-model="this.messageEmail" class="form-control" required>
        </div>
        <div class="mb-3 subject">
          <label for="subject" class="form-label">Oggetto*</label>
          <input type="text" id="subject" name="subject" v-model="this.messageSubject" class="form-control" required>
        </div>
        <div class="mb-3 date">
          <label for="meeting_date" class="form-label">Data Appuntamento</label>
          <input type="datetime-local" id="meeting_date" name="meeting_date" v-model="this.messageDate" class="form-control">
        </div>
        <div class="mb-3 content">
          <label for="content" class="form-label">Inserisci il tuo messaggio*</label>
          <textarea name="content" id="content" cols="30" rows="10" v-model="this.messageContent" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Invia</button>
      </form>
      <div class="disclaimer mt-3">
        <em>I campi indicati con * sono obbligatori.</em>
      </div>
    </div>

    <div class="loader" v-if="loaderVisible"></div>

    <!-- messages alerts -->
    <div class="my-alert" v-if="messageSent" >Messaggio inviato correttamente <button @click="closeMessage()" class="btn btn-primary">Ok</button></div>
    <div class="my-alert" v-if="messageFailed">IL messaggio non è stato inviato</div>
    <!--///  -->

    <!-- ratings alerts -->
    <div class="my-alert" v-if="rateSent" >Voto inviato correttamente <button @click="closeMessage()" class="btn btn-primary">Ok</button></div>
    <div class="my-alert" v-if="rateFailed" >Voto non inviato<button @click="closeMessage()" class="btn btn-primary">Ok</button></div>
    <!-- /// -->

    <!-- reviews alerts -->
    <div class="my-alert" v-if="reviewSent" >La recensione è stata inviata correttamente <button @click="closeMessage()" class="btn btn-primary">Ok</button></div>
    <div class="my-alert" v-if="reviewFailed">Recensione non inviata<button @click="closeMessage()" class="btn btn-primary">Ok</button></div>
    <!-- /// -->

</template>




<style lang="scss" scoped>
#overlay {
  display: none;
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);

  &.display {
    display: block
  }
}




.big-container {
  padding-top: 60px;
  width: 100%;
  gap: 20px;
  
  .card-section {
    width: 80%;
    height: auto;

    .developer-card {
      width: 100%;
      
      #dev-picture {
        width: 180px; 
        height: 180px;
        object-fit: cover;
        margin-top: 30px;
        margin-left: 30px;
      }
      .box-title {
        font-size: 1.2em;
        margin-bottom: 0;
      }

      .card {
        perspective: 2000px;

        #card-inner {
          padding-top: 10px;
          // position: relative;
          width: 100%;
          height: 100%;

          .card-body {
            padding: 0;
          }
        }
      }

    }
  }
  
}

#cv-container {
  // transform: rotateY(180deg);

  #dev-curriculum {
    width: 500px;
    height: 700px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid lightgray;
  }
}

#developer-detail {
  border: 1px solid rgba(0, 0, 0, 0.267);
    h3 {
        text-transform: capitalize;
    }
    .info{
      h4{
        margin-bottom: 1em;
      }
    }
}

  #cv-link {
    text-decoration: none;
    color: #146ebe;
  }





  .icons{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    min-height: 100px;
    width: 80%;

    padding: 10px;

    .skill-icon{
      width: 30px;
      height: 30px;
      object-fit: contain;

    }
  }

  
  .stars {
    .fa-solid.fa-star,
    .fa-solid.fa-star-half-stroke {
      color: red;
    }
    .fa-regular.fa-star {
      color: #b4b3b3;
    }
  }

  .reviews-form {
    margin: 2em 0;
  }

  .ratings-form {
    h4{
      span{
        text-transform: capitalize;
      }
    }
  }

  .messages-box{
    position: fixed;
    bottom: 0;
    right: 0;
    // position
    display: flex;
    justify-content: center;
    align-items: center;
    // flex
    border-radius: 50%;
    background-color: #FA7D3D;

    width: 100px;
    height: 100px;

    margin: 1em;

    cursor: pointer;

    transition: transform .3s ease-in-out;
    &:hover{
      transform: scale(1.1);
    }

    i{
      font-size: 2.5em;
    }
  }
  .message-form-container{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    width: 500px;

    &.hide{
      display: none;
    }

    &.show{
      display: block;
    }

    h5 {

      span {
        text-transform: capitalize;
      }
    }

  }



  .loader {
   position: fixed;
   z-index: 3;
   top: 50%;
   right: 49%;
   transform: translateX(-50%);
   width:50px;
   height:50px;
   border-radius:100%;
   border:5px solid;
   border-top-color:rgba(254, 168, 23, 0.65);
   border-bottom-color:rgba(57, 154, 219, 0.65);
   border-left-color:rgba(188, 84, 93, 0.95);
   border-right-color:rgba(137, 188, 79, 0.95);
   -webkit-animation: loading 1s ease-in-out infinite alternate;
   animation: loading 1s ease-in-out infinite alternate;
  }

  @keyframes loading {
    from {transform: rotate(0deg);}
    to {transform: rotate(720deg);}
  }

  @-webkit-keyframes loading {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(720deg);}
  }

  .my-alert {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 15px;
    position: fixed;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%);

    color: rgba(57, 154, 219, 0.911);
    background-color: #faf4f4;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.164);

    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.37);
    border-radius: 20px;
    font-weight: bold;

    button {
      width: 30%;
    }
  }



// *******************************************
//                  RESPONSIVE
// *******************************************
@media only screen and (max-width: 576px) {
  .message-form-container {
    width: 300px;
  }
  .big-container {
    max-width: 450px;
    margin: auto;

    #cv-container #dev-curriculum {
      width: 100%;
      padding: 0 10px;
    }
  }
}




@media only screen and (max-width: 992px){
  .big-container{
    
    flex-flow: column;
    gap: 0;

    .form-section #cv-container {
      display: flex;
      justify-content: center;
    }
    .card-section{
      width: 100%;
      .container{
        display: flex;    
        justify-content: center;
      }

      .developer-card {
      width: 100%;
      
      #dev-picture {
        width: 150px; 
        height: 150px;
        object-fit: cover;
        margin-top: 15px;
        margin-left: 15px;
      }
      .box-title {
        font-size: 1.2em;
        margin-bottom: 0;
      }

      .card {
        perspective: 2000px;

        #card-inner {
          padding-top: 10px;
          // position: relative;
          width: 100%;
          height: 100%;

          .card-body {
            padding: 0;
          }
        }
      }

    }
    }
  }
}

</style>
