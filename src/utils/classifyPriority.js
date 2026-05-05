
//Experiment changes - not to be called 
export function classifyPriority(){

  console.log("A função da classificação de prior foi chamada")

  return [
  {role: "user", parts: [{text: "O site foi abaixo"}]},
  {role: "model", parts: [{text: "{\"priority\": \"High\", \"tags\" : \"Bug\"}"}]},

  {role: "user", parts: [{text: "Gostava de mudar o botão"}]},
  {role: "model", parts: [{text: "{\"priority\": \"Medium\", \"tags\" : \"UI Enhancement\"}"}]},

  {role: "user", parts: [{text: "Gostava de trocar o favicon"}]},
  {role: "model", parts: [{text: "{\"priority\": \"Low\", \"tags\" : \"UI Enhancement\"}"}]},
 ]

}

