Vue.component('app-color',{
    template: `<div>
<label ><slot></slot>
<input type="color" 
       value="txtcolor"
       @input="setColor"/></label></div>`,
    data: function () {
       return{
color: '',
       }
    },
    props: ['txtcolor'],
    methods: {
        setColor: function (event) {
            this.color = event.target.value;
            this.$emit('save-color', this.color);
        },

    }
})
Vue.component('app-font',{
    template: `  <label>Font size:
        <select @change="setFontSize" >
            <option selected>--Choose font size--</option>
            <option value="10">10</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="20">20</option>
            <option value="24">24</option>
            <option value="26">26</option>
        </select></label>`,
    data: function () {
        return{
            fontsize: 0,
            fontSizes: [...Array(100).keys()],
        }
    },
   props: ['fontsize'],
    methods: {
        setFontSize: function (event) {
            this.fontsize = event.target.value + 'px';
            this.$emit('save-font', this.fontsize);
        },

    }
})

new Vue({
    el: '#app',
    data: {
        id: 0,
        text: '',
        fontsize: '',
        color: '',
        bgdcolor: '',
        dataSaver: JSON.parse(localStorage.getItem('arr')) || [],
        rangeStart: 0,
        rangeEnd: 0,
        input:'input'
    },
    methods: {
        setMessage: function (event) {
            this.text = event.target.value;
        },
        catchColor: function (color) {
            this.color = color;
        },
        catchFont: function (fontsize) {
            this.fontsize = fontsize;
        },
        catchBGcolor: function (color) {
            this.bgdcolor = color;
        },
        safeFormat: function () {
            for(const dat of this.dataSaver){
if(dat.text.includes(this.text)){
    dat.text.slice(dat.text.indexOf(this.text),
        dat.text.indexOf(this.text)+this.text.length,
        '<span> {{this.text}} </span>')
    this.saveFile();
}}

             if (this.text !== '') {

                this.dataSaver.push({
                    id: this.id,
                    text: this.text + '  ',
                    fontsize: this.fontsize,
                    color: this.color,
                    bgdcolor: this.bgdcolor,
                });
                 this.saveFile();

            }
            this.id++;
            this.text = '';
            this.fontsize = '';
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
            let range = new Range();
            this.text = this.getRangeObject(window).toString();
            this.rangeStart = this.getRangeObject(window).startOffset;
            this.rangeEnd = this.getRangeObject(window).endOffset;
            console.log(this.rangeStart)
            console.log(this.rangeEnd)
            console.log(this.text)
            console.log(document.getElementById(this.input).innerHTML );
        },
        getRangeObject: function (win) {
    win = win || window;
    if (win.getSelection) {
        try {
            return win.getSelection().getRangeAt(0);
        } catch (e) {  }
    } else if (win.document.selection) {
        var range = win.document.selection.createRange();
        return fixIERangeObject(range, win);
    }
    return null;
},


    }
})



