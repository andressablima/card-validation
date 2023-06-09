class Validator{

    constructor() {
        this.validations = [
            'data-max-length',
            'data-required',
            'data-only-numbers'
        ]
    }

    //iniciar validação de todos o campos
    validate(form) {

        //resgata validacoes
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }
        
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
    //verifica se um input tem numero maximo de caracteres
    maxlength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage = `Must have  ${maxValue} numbers`;

        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //valida se o campo tem só letras
    onlynumbers(input){
        let re = /^[0-9]+$/;

        let inputValue = input.value;

        let errorMessage = `Numbers only`;

        if(!re.test(inputValue)) {
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

    //verificação de o input está sendo requerido
    required(input){
        let inputValue = input.value;

        if (inputValue === ''){
            let errorMessage = `Can't be blank`;

            this.printMessage(input, errorMessage);
        }
    }

    //limpa as validacoes da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
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