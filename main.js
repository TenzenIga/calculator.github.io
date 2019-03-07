

class Calculator{
    constructor(){
        this.inputDiv = document.querySelector('.input');            
        this.fullInputDiv = document.querySelector('.fullInput');
        this.message = document.querySelector('.message');            
        this.lastChar ='';
        this.input = '0';
        this.fullInput = ''
      
    }

    /*
    count whole string with eval()
    add toFixed() for 0.1 + 0.2 mistakes
    check it's in maximum safe integer range
    add empty string to convert it back to string 
    */
  count(lastCharType){
    if(this.lastChar === 'operation') return;
    this.fullInput+= this.input;
    let result = eval(this.fullInput);
    result > Number.MAX_SAFE_INTEGER ? this.input = '' : this.input = +result.toFixed(10) + '';;
    this.fullInput = '';
    this.lastChar = lastCharType;
  }

  showError(){
    this.fullInput = "";
    this.input = "0";
    this.message.classList.add('showMessage');
    setTimeout( ()=>{
    this.message.classList.remove('showMessage');
    }, 2000)
    this.lastChar = 'error';
  }

  /* add digit to string */
  addDigit(newDigit, lastCharType){
      if(this.lastChar === 'operation'){
      this.fullInput+= this.input;
      this.input = newDigit
      }else if(this.input[0] === '0' && this.input.length === 1){
          this.input = newDigit;
      }else{
          this.input+= newDigit;
      }
    this.lastChar = lastCharType;
  }
 

  /* take whole string and split it into arrray of digit sets
   " 2.1 + 2 * 10"  -> [2.1, 2, 10] and check if last set has decimal
    */
  handleDecimal(lastCharType){    
    if(this.input.includes('.') || this.input.length === 0) return;
    this.input+='.';
    this.lastChar = lastCharType;
  }

  /* take new operation character 
    convert ÷  ->  /
            x  ->  *
   check for dublicate operation in row
   */ 
  handleOperation(newChar, lastCharType){
    if(newChar === '÷'){
        newChar = '/'
    }
    
    if(newChar === 'x'){
        newChar = '*';
    }
    
    if(this.lastChar!== 'operation' ){
        this.fullInput+=this.input;
        this.input= newChar;
        this.lastChar = lastCharType;
    }
  }

  /* Delete last character */
  handleCE(lastCharType){
      if(this.input.length === 1){
          this.input = '0';
          return;
      }
        this.input = this.input.slice(0, -1)
        this.lastChar = lastCharType;
  }

  /*Delete all */
  handleAC(lastCharType){
    this.input = '';
    this.fullInput = '';
    this.lastChar = lastCharType;
  }
  
  showInput(){
    if(this.input.length >= 15 || this.fullInput.length >= 28){
      this.showError()
    }
    this.inputDiv.innerHTML = this.input;
    this.fullInputDiv.innerHTML = this.fullInput;
  }
}

function eventListeners(){
    const calculator = new Calculator();
    const buttons = document.querySelector('.buttons');
    buttons.addEventListener('click', (e)=>{

        switch (e.target.dataset.type) {
            case 'count':
                calculator.count(e.target.dataset.type);           
                break;
            case 'AC':
            calculator.handleAC(e.target.dataset.type);
                break;
            case 'CE':
                calculator.handleCE(e.target.dataset.type);
                break;
            case 'decimal':
               calculator.handleDecimal(e.target.dataset.type);
                break;
            case 'operation': 
                calculator.handleOperation(e.target.textContent,e.target.dataset.type);
                break;
            
            default:
                calculator.addDigit(e.target.textContent, e.target.dataset.type); 
                break;
        }
        calculator.showInput();
    });
}

document.addEventListener('DOMContentLoaded', ()=> 

eventListeners()
)