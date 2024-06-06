window.onload = () => {
    fetchCourses();
}

const BASE_URL = "http://localhost:8081/api/"

const fetchCourses = async () => {
    try {
        const response = await fetch(`${BASE_URL}courses`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        GenerateDropdown(data);
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
};

const GenerateDropdown = (_data) => {
    const courseDropdown = document.getElementById("course-dropdown");
    courseDropdown.innerHTML = '';
    _data.forEach(course => {
        const optionElement = document.createElement("option");
        optionElement.value = course.id;  // Use course ID for more accurate fetching
        optionElement.textContent = course.courseName;
        courseDropdown.appendChild(optionElement);
    });
};

const DisplayCourse = async () => {
    const courseDropdown = document.getElementById("course-dropdown");
    const selectedCourseId = courseDropdown.value;
    const courseInfoTable = document.getElementById("course-info-table");
    const courseInfoBody = document.getElementById("course-info");

    try {
        const response = await fetch(`${BASE_URL}courses/${selectedCourseId}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const course = await response.json();
        courseInfoBody.innerHTML = `
            <tr>
                <td>${course.dept}</td>
                <td>${course.courseNum}</td>
                <td>${course.courseName}</td>
            </tr>
        `;
        courseInfoTable.style.display = 'table';  // Show the table
    } catch (error) {
        console.error("Error fetching course information:", error);
    }
};