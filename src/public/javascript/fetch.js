// This will fetch from the api with a header and a body
fetch(`/student/course`, {
  method: "Get", //This could be any http method
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    var addCard = document.getElementById("add_activity");
    for (let i = 0; i < data.data.length; i++) {
      const element = ` <div class="ag-courses_item">
            <div  class="ag-courses-item_link">
              <div class="ag-courses-item_bg"></div>

              <div class="ag-courses-item_title">
                ${data.data[i].courseTitle}
              </div>

              <div class="ag-courses-item_date-box">
               <div>
                Course Code:
                <span class="ag-courses-item_date"> ${data.data[i].courseCode} </span>
               </div>
               <button id=${data.data[i].courseCode} onclick="onEnroll(${data.data[i].courseCode})" class="ag-courses-item_button"> Enrol
               </button>
              </div>
            </div>
          </div>`;

      addCard.innerHTML += element;
    }
    courses = data.data;
  });

const onEnroll = (id) => {
  //   e.preventDefault(event);
  //   console.log(id);
  //   console.log(
  //     "hello",
  //     $(".ag-courses-item_button").attr("id"),
  //     JSON.stringify({
  //       courseCode: $(".ag-courses-item_button").attr("id"),
  //     })
  //   );
  fetch(`/student/enrol`, {
    method: "POST", //This could be any http method
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      courseCode: $(".ag-courses-item_button").attr("id"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(`${data.message}`);
      console.log(data);
      window.location.href = "/enrolled-courses";
    });
};
