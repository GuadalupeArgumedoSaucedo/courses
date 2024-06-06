// scripts/courses.js

document.addEventListener("DOMContentLoaded", () => {
    const departmentSelect = document.getElementById("departmentSelect");
    const coursesTableBody = document.querySelector('#coursesTable tbody');
  
    // Assume departments is an array of department names or objects
    const departments = [
        { name: "Computer Science", code: "CS" },
        { name: "Mathematics", code: "MATH" }
        // Add more departments as needed
    ];
  
    // Populate the dropdown menu with departments
    departments.forEach(department => {
        const option = document.createElement("option");
        option.value = department.code;
        option.textContent = department.name;
        departmentSelect.appendChild(option);
    });
  
    // Adding an event listener to the department select dropdown for the 'change' event
    departmentSelect.addEventListener("change", async (event) => {
      const selectedDepartment = event.target.value;
      if (selectedDepartment) {
          const coursesUrl = `http://localhost:8081/api/courses?department=${selectedDepartment}`;
          try {
              const response = await fetch(coursesUrl);
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              const data = await response.json();
              displayCourses(data);
          } catch (error) {
              console.error("Error fetching courses:", error);
          }
      }
    });
  
    // Display the courses in the table
    function displayCourses(courses) {
      // Clear existing rows in table body
      coursesTableBody.innerHTML = "";
      // Loop through each course
      courses.forEach(course => {
          // Create new table row element
          const row = document.createElement("tr");
          // Set inner HTML of row with course data
          row.innerHTML = `
              <td>${course.courseNumber}</td>
              <td><a href="details.html?courseid=${course.id}">${course.title}</a></td>
          `;
          // Append row to table body
          coursesTableBody.appendChild(row);
      });
    }
  });
  