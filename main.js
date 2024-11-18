const app = Vue.createApp({
  data() {
    return {
      searchText: '',
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao.silva@example.com',
      city: 'São Paulo',
      picture: 'https://randomuser.me/api/portraits/med/men/1.jpg',

      /*
      listContacts: [
        {firstName: 'Luiz', lastName: 'Gomes', email: 'luiz.gomes@example.com', city: 'Fortaleza', picture: 'https://randomuser.me/api/portraits/med/men/4.jpg'},
        {firstName: 'Carla', lastName: 'Santos', email: 'carla.santos@example.com', city: 'Curitiba', picture: 'https://randomuser.me/api/portraits/med/women/5.jpg'}
      ]
      */
      listContacts: []
    }
  },

  computed: {
    listResult() {
      if(this.searchText) {
        return this.listContacts.filter(contact => {
          return contact.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
                 contact.lastName.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        return this.listContacts;
      }
    }
  },

  async mounted() {
    await this.getData();
  },

  methods:{
    changeData() {
      this.firstName  = 'Maria';
      this.lastName  = 'Souza';
      this.email = 'maria.souza@example.com';
      this.city = 'Rio de Janeiro';
      this.picture = 'https://randomuser.me/api/portraits/med/women/1.jpg';
    },

    removeContact(index) {
      //console.log("Index do objeto selecionado: " + index);

      //excluindo um objeto do index selecionado
      this.listContacts.splice(index, 1);
    },

    async getData() {
      this.searchText = '';
      let response = await fetch('https://randomuser.me/api/?results=15');

      // exibindo os dados no console do navegador
      //console.log(response.json());

      // armazenando os dados do json
      let data = await response.json();

      //remover todos os items do array listContacts
      this.listContacts = [];

      //console.log(data);
      data.results.forEach(item => {

        var contact = new Object();

        contact.firstName = item.name.first;
        contact.lastName  = item.name.last;
        contact.email     = item.email;
        contact.city      = item.location.city;
        contact.picture   = item.picture.large;

        //console.log("Dados do contato: " + contact);

        this.listContacts.push(contact);

      });


    }
  }

})

app.mount('#app');
