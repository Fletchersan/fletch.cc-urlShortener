new Vue({
    el: '#app',
    data: {
        name: '', 
        url: '',
        success: false,
        error: ''
    },
    methods: {
        createFletch() {
            const body = {
                name: this.name,
                url: this.url,
            };
            fetch('/api/fletch', {
                method: 'POST', 
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            }).then( response => {
                console.log(response);
                return response.json();
            }).then( result => {
                console.log('result in main.js');
                console.log(result);
                if(result.name !== this.name) {
                    //An error has occured
                    // this.error = 
                    this.error = result.details[0].message
                    console.log(this.error);
                } else {
                    this.success = true;
                }
            })
            .catch(err => console.log('error in fetch request in main.js',err));
            console.log(this.name, this.url);
        }
    }
})


