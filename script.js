var app = new Vue({
    el: '#app',
    data: {
        text: '',
        fontSize: '',
        color: '',
        bgdcolor: '',
        prevtext: {
            text: '',
            fontSize: '',
            color: '',
            bgdcolor: '',
        },
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
            prevtext = {
                text: this.text+'  ',
                fontSize: this.fontSize,
                color: this.color,
                bgdcolor: this.bgdcolor,
            };
             if(prevtext.text!==''){
            this.dataSaver.push(prevtext);
            this.saveFile();}
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
            this.text= this.text+'<br>';
        }

    }
})