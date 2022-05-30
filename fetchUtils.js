/*************************************************************************************** 
  Taken from this document: https://docs.google.com/document/d/1keZvtIhEb7qFpa4LblPJLKETy1CskAf5GP4XczqaN-0/edit#heading=h.alh0zz89h9z9
****************************************************************************************/

export function makeOptions(method, body) {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if (body) { //Observe how we can add new fields to an object when needed
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
  
  export async function handleHttpErrors(res) {
    if (!res.ok) {
      const errorResponse = await res.json();
      const error = new Error(errorResponse.message)
      error.status = res.status
      error.statusText = res.statusText
      error.apiError = errorResponse
      throw error
    }
    return res.json()
  }
  