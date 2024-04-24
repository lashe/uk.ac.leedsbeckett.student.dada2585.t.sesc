// This will fetch api.example.com/comments with a header and a body
fetch(`/student/enrolled/courses`, {
  method: "Get", //This could be any http method
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    var addCard = document.getElementById("add_activity");
    for (let i = 0; i < data.data.length; i++) {
      const element = ` <div class="ag-courses_item">
            <div  class="ag-courses-item_link">
              <div class="ag-courses-item_bg"></div>

              <div class="ag-courses-item_title">
                ${data.data[i].course.courseTitle}
              </div>

              <div class="ag-courses-item_date-box">
               <div>
                Course Code:
                <span class="ag-courses-item_date"> ${data.data[i].course.courseCode} </span>
               </div>
              </div>
            </div>
          </div>`;

      addCard.innerHTML += element;
    }
    courses = data.data;
  });

const onEligible = () => {
  fetch(`/student/gaduation/eligibility`, {
    method: "Get", //This could be any http method
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(`${data.message}`);
      //   console.log(data);
      var addEligibilityText = document.getElementById("eligibility_text");
      addEligibilityText.innerHTML = data.message;
    });
};
