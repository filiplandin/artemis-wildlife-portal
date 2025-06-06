<template>
    <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal" >
      <header class="modal-header">
        Name: {{ swedishName }}
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="modal-body">
        Vetenskap-namn: {{ scientificName }}
        Biotoper: {{ biotopes }}
        Rödlistning: {{ redlist }}
        Characteristics: {{  criterionText }}
        Description: {{ description }}
      </section>

      <footer class="modal-footer">
        <button type="button" class="btn-green" @click="close">
          Close Modal
        </button>
      </footer>
    </div>
  </div>
    </transition>
</template>

<script>
export default {
    name: "Modal",
    props: {
    searchString: "",
    },
      swedishName: "",
      scientificName: "",
      description: "",
      redlist: '',
      criterionText: '',
      biotopes: '',
      characteristics: '',
      watch: {
        searchString: function () {
          this.findData();
        },
    },
  methods: {
    close() {
      console.log(this.searchString);
      this.$emit("close");
    },
    async findData() {
      let taxonIds = [];
      let scientificNames = [];
      let swedishNames = [];

      // Get taxonId and scientificName from swedish name
      await fetch(`https://api.artdatabanken.se/information/v1/speciesdataservice/v1/speciesdata/search?searchString=${this.searchString}`, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': '5f9400bcb38845c0a89a9ff5a6d69afb'
        }
      }).then((response) => {
        return response.json(); // Return json data
      }).then((data) => {
        console.log(data);
        data.forEach((element) => { // Loop through data and push taxonId and scientificName to arrays
          taxonIds.push(element.taxonId);
          scientificNames.push(element.scientificName);
          swedishNames.push(element.swedishName);
        });
        console.log(swedishNames);
        let i = 0;
        while (swedishNames[i] == "") { // Loop through swedishNames array and find the index of the search string
          i++;
        }
        this.scientificName = scientificNames[i]; 
        this.swedishName = swedishNames[i];
        this.getSpeciesData(taxonIds[i], 'texts'); 
        this.getSpeciesData(taxonIds[i], 'redlist'); 
        this.getSpeciesData(taxonIds[i], 'biotopes');
      });
    },


    async getSpeciesData(taxonId, httpEnd) {
      let period = '';
      if(httpEnd == 'redlist'){
        period = '&period=4';
      }
      fetch(`https://api.artdatabanken.se/information/v1/speciesdataservice/v1/speciesdata/${httpEnd}?taxa=${taxonId.toString()}${period}`, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': '5f9400bcb38845c0a89a9ff5a6d69afb'
        }
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        data.forEach((element) => {
          switch (httpEnd) {
            case 'texts':
              this.description = element.speciesData.characteristic;
              return;
            case 'redlist':
              this.redlist = element.speciesData.criterion;
              this.criterionText = element.speciesData.criterionText;
              return;
            case 'biotopes':
              element.speciesData.forEach((elem) => {
                // Remove duplicates and null values from biotopes array or if it is all caps
                if (this.biotopes.indexOf(elem.name) == -1 && elem.name != null && elem.name != elem.name.toUpperCase()) {
                  this.biotopes += elem.name + ', ';
                }
             
              });
              //Remove last letter of biotopes string if it is a comma
              if (this.biotopes[this.biotopes.length - 2] == ',') {
                this.biotopes = this.biotopes.slice(0, -2);
              }
              
              return;
          }
        });
      });
    },
  },
};
</script>

<style scoped>

.modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
