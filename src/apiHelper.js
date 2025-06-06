// Description: client-side utility for fetching animal data from an external API (ArtDatabanken API). 
// It provides methods to get animal names and all information about animals, including their scientific names, descriptions, redlist status, biotopes, and characteristics.
// It uses the Fetch API to make GET requests and processes the JSON responses to populate a JSON object with the relevant information.
class ApiHelper {

    // When ApiHelper is created a JSONObject is created.
    constructor() {
        this.JSONObj = { 
            "swedishName": "Information is missing",
            "scientificName": "Information is missing",
            "description": "Information is missing",
            "redlist": ["Information is missing"],
            "criterionText": "Information is missing",
            "biotopes": 'Information is missing',
            "characteristics": "Information is missing"
        };
    }

    // Creates a get request with the sent in url.
    async get(url) {
        let result = await fetch(url, {
            method: "GET",
            headers: {
                'Ocp-Apim-Subscription-Key': '5f9400bcb38845c0a89a9ff5a6d69afb',
            },
        });
        if (result.ok) {
            return result.json();
        }
        else { console.log(result.status) }
    }

    // gets the rest of the species data 
    async getSpeciesData(taxonId, httpEnd) {
        let periods = [''];
        if(httpEnd == 'redlist'){
            periods = ['&period=1', '&period=2', '&period=3', '&period=4', '&period=6'];
        }

        for (let i = 0; i < periods.length; i++) {
        let data = await this.get(`https://api.artdatabanken.se/information/v1/speciesdataservice/v1/speciesdata/${httpEnd}?taxa=${String(taxonId)}${periods[i]}`);
        data.forEach((element) => {
            switch (httpEnd) {
              case 'texts':
                this.JSONObj.characteristics = element.speciesData.characteristic;
                this.JSONObj.description = element.speciesData.spreadAndStatus;
                break;
              case 'redlist':
                this.JSONObj.redlist[i] = element.speciesData.category;
                if (element.speciesData.category == null) {
                    this.JSONObj.redlist[i] = 'Detta djur är inte rödlistat'
                }
                console.log(this.JSONObj.redlist[i])

                this.JSONObj.criterionText = element.speciesData.criterionText;
                break;
              case 'biotopes':
                this.JSONObj.biotopes = '';
                console.log(element)
                element.speciesData.forEach((elem) => {
                    this.JSONObj.biotopes += elem.name + ', '

                });
                // Remove last letter of biotopes string if it is a comma
                if (this.JSONObj.biotopes != '' || this.JSONObj.biotopes != 'Information is missing' ) {
                    this.JSONObj.biotopes = this.JSONObj.biotopes.slice(0, -2);
                    this.JSONObj.biotopes += '.';
                }
                break;
            }
        });
    }
    return;
    }

    async getAnimalInfroamtion(allInfo, amount) {
        let taxonIds = [];
        let scientificNames = [];
        let swedishNames = [];
        // let data = await this.get(`https://api.artdatabanken.se/information/v1/speciesdataservice/v1/speciesdata/redlist?taxa=93`)
        let data = await this.get(`https://api.artdatabanken.se/information/v1/speciesdataservice/v1/speciesdata/search?searchString=${String(amount)}`)
        data.forEach((element) => { // Loop through data and push taxonId and scientificName to arrays
          taxonIds.push(element.taxonId);
          scientificNames.push(element.scientificName);
          swedishNames.push(element.swedishName);
        });
        let i = 0;
        while (swedishNames[i] == "") { // Loop through swedishNames array and find the index of the search string
          i++;
        }
        this.JSONObj.scientificName = scientificNames[i]; 
        this.JSONObj.swedishName = swedishNames[i];

        if (allInfo) {
            await this.getSpeciesData(taxonIds[i], 'texts'); 
            await this.getSpeciesData(taxonIds[i], 'redlist'); 
            await this.getSpeciesData(taxonIds[i], 'biotopes');

        }
    
    }

    // kalla på dessa funktioner nedan om du ska hämta information
    async getAnimalName(amount) {
       await this.getAnimalInfroamtion(false, amount)
       return this.JSONObj
    }

    async getAllAnimalInformation(amount) {
        await this.getAnimalInfroamtion(true, amount)
        return this.JSONObj
    }
    
}

export default ApiHelper;
