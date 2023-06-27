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

    //close(el) {
   //   this.isMessageVisible = false;
    //},


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
      // let sum = 0; 
      // for(let i=0; i < this.developer.ratings.length; i++){
      //   sum += this.developer.ratings[i].rating; 
      // }
      //  return this.ratingAVG = sum / this.developer.ratings.length;
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
    }


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
    } ,


  }

};
</script>
<template>
    <div class="container">
      <h1 class="py-5">Dettagli Sviluppatore</h1>

      <div v-if="this.isDeveloperFound" class="developer-detail">
          <h3 class="mb-3">{{ this.developer.user.name }} {{ this.developer.last_name }}</h3>
          <img id="dev-picture" :src="getDevPicture" alt="developer-img">
          <div v-if="this.developer.ratings.length > 0" class="stars">
              <i v-for="star in this.getFullStars(this.ratingAVG)" class="fa-solid fa-star"></i><i v-for="halfStar in this.getHalfStars(this.ratingAVG)" class="fa-solid fa-star-half-stroke"></i><i v-for="star in this.getRemainingStars(this.ratingAVG)" class="fa-regular fa-star "></i> <span> ( Voti Totali: {{ this.developer.ratings.length}} )</span>
          </div>
          <hr>
          <div class="info">
            <h4>Informazioni</h4>
            <p><strong>Indirizzo:</strong> {{ this.developer.address }}</p>
            <p><strong>Telefono:</strong> {{ this.developer.phone }}</p>
            <p><strong>Titolo:</strong> {{ this.developer.role }}</p>
            <p><strong>Prestazioni:</strong> {{ this.developer.services }}</p>
          </div>
          <hr>
          <h4>Specializzazioni</h4>
          <div class="icons">
              <img class="skill-icon" v-for="icon in getSkillsIcons" :src="this.store.URI + 'storage/' + icon" alt="">
          </div>
          <hr>
          <h4>Curriculum</h4>
          <img id="dev-curriculum" :src="getDevCV" alt="developer-cv">
      </div>
      <div v-else class="alert alert-warning">
          <p>Lo sviluppatore non è stato trovato</p>
      </div>
      <hr>

      <div class="ratings-form">
        <h4>Dai un voto a <span>{{this.completeName}}</span></h4>

        <!-- <i v-for="(star, index) in 5" class="fa-regular fa-star" @mouseover="colorStars(index)"></i> -->
        <!-- <star-rating v-model:rating="rating"></star-rating> -->
        <star-rating :rounded-corners="true" :border-width="3" :rating="1" v-model:rating="this.revRate" @click="sendRate()" :star-size="25" active-color="#ffe030" border-color="#999" ></star-rating>
      </div>

      <hr>

      <div class="reviews-form">
        <h4>Lascia una tua recensione</h4>
        <form @submit.prevent="sendReview()" method="POST">
          <div class="mb-3 info-user">
            <label for="name" class="form-label"> Inserisci il tuo nome completo*</label>
            <input type="text" id="name" name="name" v-model="this.revName" class="form-control" required>
          </div>
          <!-- <div class="mb-3 ratings">
            <label for="rating" class="form-label">Dai un voto da 1 a 5</label>
            <input type="number" min="1" max="5" v-model="this.revRate" class="form-control">
          </div> -->
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
      <h5>Lascia un messaggio a <span>{{this.completeName}}</span></h5>
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

.developer-detail {
    h3 {
        text-transform: capitalize;
    }
    .info{
      h4{
        margin-bottom: 1em;
      }
    }
}

#dev-picture {
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin: 2em 0;

    border-radius: 50%;
}

#dev-curriculum {
  width: 350px;
  display: block;
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
      color: #ebd247e3;
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
    right: 2em;
    bottom: 9em;
    width: 500px;
    &.hide{
      display: none;
    }
    &.show{
      display: block;
    }
    h5{
      span{
        text-transform: capitalize;
      }
    }

  }



  .loader {
   position: fixed;
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

</style>
