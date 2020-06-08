Vue.component('button1',{
    template:'#result',
    props:[]
});

new Vue({
    el: '#app',
    data: {
        id: 0,
        text: '',
        fontSize: '',
        color: '',
        bgdcolor: '',
        dataSaver: JSON.parse(localStorage.getItem('arr')) || [],
        fontSizes: [...Array(100).keys()],
    },
    methods: {
        setMessage: function (event) {
            this.text = event.target.value;
        },
        setColor: function (event) {
            this.color = event.target.value;
        },
        setFontSize: function (event) {
            this.fontSize = event.target.value + 'px';
        },
        setBgd: function (event) {
            this.bgdcolor = event.target.value;
        },
        safeFormat: function () {


            if (this.dataSaver.find(span => span.id === this.id) !== undefined) {
                this.dataSaver[this.id].text = this.text;
                this.dataSaver[this.id].fontSize = this.fontSize;
                this.dataSaver[this.id].bgdcolor = this.bgdcolor;
                this.dataSaver[this.id].color = this.color;
            } else if (this.text !== '') {

                this.dataSaver.push({
                    id: this.id,
                    text: this.text + '  ',
                    fontSize: this.fontSize,
                    color: this.color,
                    bgdcolor: this.bgdcolor,
                });
                this.saveFile();

            }
            this.id++;
            this.text = '';
            this.fontSize = '';
            this.color = '';
            this.bgdcolor = '';
        },
        saveFile: function () {
            const data = JSON.stringify(this.dataSaver)
            window.localStorage.setItem('arr', data);
            console.log(window.localStorage.getItem('arr'))
        },
        eddBR: function () {
            this.text = this.text + '<br>';
        },
        setToChange: function (event) {
            let temp = this.dataSaver.find(span => span.id.toString() === event.target.id)
            this.id = temp.id;
            this.text = temp.text;

            console.log(this.text)
        }

    }
})



