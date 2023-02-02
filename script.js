// myTable.rows.length ==> ile wierszy
// myTable.rows[0].cells.length ==>ile kolumn
let id=0;
const createTable=()=>{

  const parameterStructure = document.createElement("ul");
  parameterStructure.id = "parameter_structure";

  const parameterDiv = document.createElement("div");
  parameterDiv.id = "parameter_div";

  const parameterLi = document.createElement("li");

  const parameterInput = document.createElement("input");
  parameterInput.className = "parameter";
  parameterInput.type = "text";
  parameterLi.appendChild(parameterInput);

  const addPButton = document.createElement("button");
  addPButton.className = "edit_button";
  addPButton.onclick = function(event) { addParameter(event) };
  addPButton.innerHTML = "Add";
  parameterLi.appendChild(addPButton);

  const addChButton = document.createElement("button");
  addChButton.className = "edit_button";
  addChButton.onclick = function(event) { addChild(event) };
  addChButton.innerHTML = "Add child";
  parameterLi.appendChild(addChButton);

  parameterDiv.appendChild(parameterLi);
  parameterStructure.appendChild(parameterDiv);

  const weightDiv = document.createElement("div");
  weightDiv.id = "weight_div";
  weightDiv.innerHTML = "Weight:";

  const weightInput = document.createElement("input");
  weightInput.className = "weights";
  weightInput.type = "number";
  weightInput.min = 0;
  weightInput.max = 1;
  weightInput.step = "any";
  weightDiv.appendChild(weightInput);

  parameterStructure.appendChild(weightDiv);

  const checkboxesDiv = document.createElement("div");
  checkboxesDiv.id = "checkboxes_div";
  checkboxesDiv.innerHTML = "Choose utility function:";

  const linearCheckbox = document.createElement("input");
  linearCheckbox.type = "radio";
  linearCheckbox.id = `linear_checkbox ${id}`;
  linearCheckbox.name = `checkboxes ${id}`;
  checkboxesDiv.appendChild(linearCheckbox);

  const linearLabel = document.createElement("label");
  linearLabel.htmlFor = `linear_checkbox ${id}`;
  linearLabel.innerHTML = "Linear";
  checkboxesDiv.appendChild(linearLabel);

  const exponentialCheckbox = document.createElement("input");
  exponentialCheckbox.type = "radio";
  exponentialCheckbox.id = `exponential_checkbox ${id}`;
  exponentialCheckbox.name = `checkboxes ${id}`;
  checkboxesDiv.appendChild(exponentialCheckbox);

  const exponentialLabel = document.createElement("label");
  exponentialLabel.htmlFor = `exponential_checkbox ${id}`;
  exponentialLabel.innerHTML = "Exponential";
  checkboxesDiv.appendChild(exponentialLabel);

  const logarithmicCheckbox = document.createElement("input");
  logarithmicCheckbox.type = "radio";
  logarithmicCheckbox.id = `logarithmic_checkbox ${id}`;
  logarithmicCheckbox.name = `checkboxes ${id}`;
  checkboxesDiv.appendChild(logarithmicCheckbox);

  const logarithmicLabel = document.createElement("label");
  logarithmicLabel.htmlFor = `logarithmic_checkbox ${id}`;
  logarithmicLabel.innerHTML = "Logarithmic";
  checkboxesDiv.appendChild(logarithmicLabel);
  
  parameterStructure.appendChild(checkboxesDiv);

  let MinMaxDiv = document.createElement("div");
  MinMaxDiv.id = "MinMaxDiv";
  let minLabel = document.createElement("label");
  minLabel.innerHTML = "Min: ";
  let minInput = document.createElement("input");
  minInput.type = "number";
  minInput.min = 0;
  minLabel.appendChild(minInput);
  MinMaxDiv.appendChild(minLabel);
  let maxLabel = document.createElement("label");
  maxLabel.innerHTML = "Max: ";
  let maxInput = document.createElement("input");
  maxInput.type = "number";
  maxInput.min = 0;
  maxLabel.appendChild(maxInput);
  MinMaxDiv.appendChild(maxLabel);
  
  parameterStructure.appendChild(MinMaxDiv);
  
  id++;

  return parameterStructure;
}
document.getElementById("DM_table").appendChild(createTable());

//adding parameters
const addParameter=(event)=>{
  let parent=event.target.parentElement.parentElement.parentElement.parentElement;
  parent.appendChild(createTable());
}

//addind child
const addChild=(event)=>{
  let parent=event.target.parentElement.parentElement.parentElement;
  let ul=document.createElement('ul');
  let li=document.createElement('li');
  parent.appendChild(ul);
  li.appendChild(createTable());
  parent.appendChild(li);

  let containerDiv = event.target.parentElement.parentElement.parentElement;
  let checkboxesDivs = containerDiv.querySelectorAll("#checkboxes_div");
  containerDiv.removeChild(checkboxesDivs[0]);
  let MinMaxDivs = containerDiv.querySelectorAll("#MinMaxDiv");
  containerDiv.removeChild(MinMaxDivs[0]);
}

//adding alternatives
const addAlternative=()=>{
  const aternativesTable=document.getElementById("aternativesTable");
  let columns = aternativesTable.rows[1].getElementsByTagName('td').length;

  for(let i=0;i<aternativesTable.rows.length;++i)
  {
    let cell = aternativesTable.rows[i].insertCell(columns);
    if(i==0) cell.innerHTML = ('<th><input type="text" /></th>');
    else cell.innerHTML = '<td><input type="number" min=0 /><td/>'
}
}
const addingA=document.getElementById("addA");
addingA.addEventListener("click",()=>addAlternative);

//table withe leaves
const leavesFunctions=()=>{
  //createLeavesTable
  let myTable = document.getElementById("DM_table");
  let leavesTabel = myTable.querySelectorAll("#checkboxes_div");
  let leavesAmount=leavesTabel.length;

  //create parameters table
  const aternativesTable = document.createElement("table");
  aternativesTable.id = "aternativesTable";

  parameterTableRow = aternativesTable.insertRow();
  parameterTableRow.insertCell();
  document.getElementById("alternativesDiv").appendChild(aternativesTable);
  for(let i=0;i<leavesAmount;++i)
  {
    parameterTableRow = aternativesTable.insertRow();
    let parameterNames=leavesTabel[i].parentElement.getElementsByClassName("parameter")[0].value;
    parameterTableRow.insertCell().textContent = parameterNames;      
    document.getElementById("alternativesDiv").appendChild(aternativesTable);
  }
  //adding alternatives
  addAlternative();
}

function linear_maut(min_value, max_value, argument) {
  if(min_value > max_value) {
      if(argument <= max_value)  return 1;
      else if(argument >= min_value) return 0; 
      else return (min_value - argument) / (min_value - max_value);
  } else {
      if(argument <= min_value) return 0;
      else if(argument >= max_value) return 1;
      else return (argument - min_value) / (max_value - min_value);
  }
}

function exponential_maut(min_value, max_value, argument) {
  if(min_value > max_value) {
      if(argument <= max_value) return 0;
      else if(argument >= min_value) return 1;
      else return (min_value - argument) / (min_value - max_value);
  } else {
      if(argument <= min_value) return 1;
      else if(argument >= max_value) return 0;
      else return Math.pow(min_value / max_value, (argument - min_value) / (max_value - min_value));
  }
}

function logarithmic_maut(min_value, max_value, argument) {
  if(min_value > max_value) {
    if(argument <= max_value) return 1;
    else if(argument >= min_value) return 0;
    else return Math.log10(min_value / argument) / Math.log10(min_value / max_value);
  } else {
      if(argument <= min_value) return 0;
      else if(argument >= max_value) return 1;
      else return Math.log10(argument / min_value) / Math.log10(max_value / min_value);
  }
}

function weightsProduct(weightsDiv) {
  let currentDiv = weightsDiv.parentNode;
  let product=1;
  while (currentDiv && currentDiv.id !== "DM_table" ){
    if(currentDiv.querySelector('#weight_div')!==null && currentDiv.id==='parameter_structure')
      product=product*parseFloat(currentDiv.getElementsByTagName("input")[1].value);
      currentDiv = currentDiv.parentNode;
  }
  return product;
}

const MAUT_Method=()=>{
  let aternativesTable=document.getElementById('aternativesTable');

  let myTable=document.getElementById('DM_table');
  let leavesTabel = myTable.querySelectorAll("#checkboxes_div");
  let minMaxTabel = myTable.querySelectorAll("#MinMaxDiv");
  let leavesAmount=leavesTabel.length;
  const answerTable=[];

  for(let i=1;i<aternativesTable.rows[0].cells.length;++i){
    let sum=0;
    for(let j=0;j<leavesAmount;++j){
      let indicator=parseFloat(aternativesTable.rows[j+1].cells[i].getElementsByTagName("input")[0].value);
      let min=parseFloat(minMaxTabel[j].getElementsByTagName("input")[0].value);
      let max=parseFloat(minMaxTabel[j].getElementsByTagName("input")[1].value);
      let current=0;
      let weightProduct=parseFloat(weightsProduct(minMaxTabel[j].parentElement.getElementsByTagName("input")[1]));
      let result=0;
      if(leavesTabel[j].parentElement.getElementsByTagName("input")[2].checked){
        result=linear_maut(min, max, indicator);
        if(result>1) result=1;
        else if(result<0) result=0;
      }
      else if(leavesTabel[j].parentElement.getElementsByTagName("input")[3].checked){
        result=exponential_maut(min, max, indicator);
        if(result>1) result=1;
        else if(result<0) result=0;
      }
      else{
        result=logarithmic_maut(min, max, indicator);
        if(result>1) result=1;
        else if(result<0) result=0;
      }
      current=weightProduct*result;
      sum=current+sum;
    }
    answerTable.push(sum);
  }

  let max=Math.max(...answerTable);

  let results=aternativesTable.insertRow(-1);
  results.insertCell();
  for(let i=0;i<answerTable.length;++i){
    var answer=results.insertCell();
    answer.append(answerTable[i]);
    answer.style='font-weight:bolder;text-align:center';
    if(answerTable[i]==max){
      answer.style.backgroundColor='rgba(0, 0, 0, 0.1)';
    }
  }
  document.getElementById('results').style.display='block';

  //chart
  let alternativeNames=[];
  for(let i=1;i<aternativesTable.rows[0].cells.length;++i){
    alternativeNames.push(aternativesTable.rows[0].cells[i].getElementsByTagName("input")[0].value);
  }

  const ctx = document.getElementById('myChart');
	  
	new Chart(ctx, {
    type: 'bar',
	  data: {
  		labels: alternativeNames,
			datasets: [{
        data: answerTable,
			}]
		},
	  options: {
      elements:{
        bar:{
          backgroundColor: '#FFCD58',
        }
      },
      plugins: {
        legend:{
          display: false
        },
        title: {
            display: true,
            text: 'MAUT Method',
            font:{
              size: 20,
            }
        }
    },
			scales: {
			  y: {
				beginAtZero: true
			  }
			}
		}
	});
}
const calculate=document.getElementById("calculate");
calculate.addEventListener("click",()=>MAUT_Method);

//submition
function submitFunction(event){
  event.preventDefault();
  return false;
}