document.addEventListener("DOMContentLoaded", async () => {
  let searchBtn = document.getElementById("search");
  let displayContainer = document.getElementById("displayData");
  let filterBtn = document.getElementById("filter-btn");
  let addBtn = document.getElementById("add-data");
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
    // console.log(apartments)
    return apartments;
  }
  //   fetchData();
  searchBtn.addEventListener("click", async () => {
    try {
      let inputVal = document.getElementById("name-input").value;
      let data = await fetchData();
      let searchData = data.filter((apartment) => apartment.name == inputVal);
      displayData(searchData);
    } catch (error) {
      alert(error.message);
    } finally {
      document.getElementById("name-input").value = "";
    }
  });
  filterBtn.addEventListener("click", async () => {
    apartments = await fetchData();
    // console.log(apartments)
    let price = document.getElementById("price-input").value;
    let bedrooms = document.getElementById("bedroom-input").value;
    const selectAvailability = document.getElementById("check-Available").value;
    let availableValue = selectAvailability == "true" ? true : false;

    //
    const filterData = apartments.filter((data) => {
      if (
        (price === "" || data.price === price) &&
        (bedrooms === "" || data.bedrooms === bedrooms) &&
        (availableValue === "" || data.available === availableValue)
      ) {
        return data;
      }
    });
    displayData(filterData);
  });
  addBtn.addEventListener("click", async () => {
    let data = {
      name: document.getElementById("add-input-name").value,
      bedrooms: document.getElementById("add-input-bedroom").value,
      price: document.getElementById("add-input-price").value,
    };
    try {
      await fetch(
        "https://apartment-project-42296-default-rtdb.asia-southeast1.firebasedatabase.app/apartments.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
        console.log(error.message)
    }finally{
        document.getElementById("add-input-name").value='';
        document.getElementById("add-input-bedroom").value='';
        document.getElementById("add-input-price").value='';
    }
  });

  function displayData(searchData) {
    displayContainer.innerHTML = "";
   
    searchData.forEach((apartment) => {
        const apartmentDiv = document.createElement("div");
        apartmentDiv.className = "apartment-div";
        apartmentDiv.innerHTML = `
            <h3>Name: ${apartment.name} </h3>
           <p>Price: ${apartment.price}</p>
             <p>Bedrooms: ${apartment.bedrooms}</p>
            <p>Availability: ${apartment.available}</p>`;
        displayContainer.appendChild(apartmentDiv);
      });
   
  }
  apartments=await fetchData()
  displayData(apartments)
});
