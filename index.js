import { renderTemplate, setActive, showPage } from "./utils.js"
import{setupCompetitorHandlers, addNewCompetitor, editCompetitor} from "./js-for-pages/competitors.js"


function renderMenuItems(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id;
  renderTemplate(id)  //This setups the HTML for the page
  switch (id) {
    //Here you can execute JavaScript for the selected page
    case "page-competitors": {
      setupCompetitorHandlers();

      break
    }
    case "page-add-competitors": {
      document.getElementById("competitor-btn").onclick = addNewCompetitor;
      document.getElementById("competitor-edit-btn").onclick = editCompetitor;
     }
  }
}

document.getElementById("navbar").onclick = renderMenuItems;
showPage("page-about") //Set the default page to render




