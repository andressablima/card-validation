class Validator{

    constructor() {
        this.validations = [
            'data-min-length',
        ]
    }

    //iniciar validação de todos o campos
    validate(form) {
        // pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //transform an HTMLcollection -> array
        let inputsArray = [...inputs];

        //loop dos inputs e validacao do que for encontrado
        inputsArray.forEach(function(input){
            //loop em todas as validacoes existentes
            for(let i = 0; this.validations.length > i; i++) {
                // verifica se a validacao atual existe no input
                if(input.getAttribute(this.validations[i]) != null) {

                    //limpando string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-','');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // invocar o método
                    this[method](input, value);

                }
            }
        }, this);
    }
    //verifica se um input tem numero minimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter  ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }
    // imprime a mensagem de erro na tela
    printMessage(input, msg){

        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);

    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator =new Validator();

//validations //

submit.addEventListener('click',function(e) {

    e.preventDefault();

    validator.validate(form);
})