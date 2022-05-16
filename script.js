class Calculator {
    constructor(previous_operand, current_operand){
        this.previous_operandText = previous_operand;
        this.current_operandText = current_operand;
        this.clear()
    }

    clear(){
        this.current_operand = "";
        this.previous_operand = "";
        this.operation = undefined;
    }

    delete(){
        this.current_operand = this.current_operand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === "." && this.current_operand.includes(".")) return
        this.current_operand += number.toString();
    }

    chooseOperation(operation){
        if (this.current_operand === "") return
        console.log()
        if(this.previous_operand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previous_operand = this.current_operand;
        this.current_operand = "";
    }

    compute(){
        console.log("compute")
        let computation 
        const prev = parseFloat(this.previous_operand);
        const current = parseFloat(this.current_operand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
        }
        this.current_operand = computation
        this.previous_operand = ""
        this.operation = undefined
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigit = stringNumber.split(".")[1];
        let integerDisplay 
        if(isNaN(integerDigits)){
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 })
        }
        if(decimalDigit != null){
            return `${integerDisplay}.${decimalDigit}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.current_operandText.innerText = this.getDisplayNumber(this.current_operand);
        if(this.operation != null){
            this.previous_operandText.innerText = 
            `${this.getDisplayNumber(this.previous_operand)} ${this.operation}`
        } else {
            this.previous_operandText.innerText = ""
        }
    }

}

const buttons = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const clear_button = document.querySelector("[data-all-clear]");
const delete_button = document.querySelector("[data-delete]");
const equal_button = document.querySelector("[data-equal]");
const previous_operand = document.querySelector("[data-previous-operand]");
const current_operand = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previous_operand, current_operand);


buttons.forEach((button)=>{
    button.addEventListener("click", () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

clear_button.addEventListener("click", () =>{
    calculator.clear();
    calculator.updateDisplay();
})

delete_button.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

operations.forEach((button) => {
    button.addEventListener("click", ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equal_button.addEventListener("click", ()=> {
    calculator.compute();
    calculator.updateDisplay();
})