function getSong() {

  let songName = document.getElementById('song').value.trim()
  if(songName === '') {
      return alert('Please enter a song')
  }

  let songDiv = document.getElementById('songValue')
  songDiv.innerHTML = ''

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      console.log(response)
      songDiv.innerHTML = songDiv.innerHTML + `
      <h1>Song Matching ${songName} </h1>
      <p>${xhr.responseText}</p>
      `
    }
  }
  xhr.open('GET', `/songs?title=Body+And+Soul`, true)
  // xhr.open('GET', `/songs?title=${songName}`, true)
  xhr.send()
}

const ENTER=13

function handleKeyUp(event) {
event.preventDefault()
   if (event.keyCode === ENTER) {
      document.getElementById("submit_button").click()
  }
}


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit_button').addEventListener('click', getSong)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keyup', handleKeyUp)

})
