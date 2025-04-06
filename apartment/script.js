document.addEventListener("DOMContentLoaded", async () => {
  let searchBtn = document.getElementById("search");
  let displayContainer = document.getElementById("displayData");
  let apartments;
  async function fetchData() {
    let response = await fetch(
      "https://apartment-project-42296-default-rtdb.asia-southeast1.firebasedatabase.app/apartments.json"
    );
    let data = await response.json();
    apartments = Object.entries(data).map(([id, apartment]) => ({
      id,
      ...apartment,
    }));
    return apartments;
  }
  searchBtn.addEventListener("click", async () => {
    try {
        let inputVal = document.getElementById("name-input").value;
        let data = await fetchData();
        let searchData = data.filter((apartment) => apartment.name == inputVal);
        displayData(searchData);
    } catch (error) {
        alert(error.message);
    }finally{
        document.getElementById("name-input").value=''
    }
  });
  function displayData(searchData) {
    displayContainer.innerHTML = "";
    searchData.forEach((apartment) => {
      const apartmentDiv = document.createElement("div");
      apartmentDiv.className = "apartment-div";
      apartmentDiv.innerHTML = `
         <p>Price: ${apartment.price}</p>
           <p>Bedrooms: ${apartment.bedrooms}</p>
          <p>Availability: ${apartment.available}</p>`;
          displayContainer.appendChild(apartmentDiv)
    });
  }
});
