// scripts/main.js

document.addEventListener('DOMContentLoaded', function() {
    const coursesTableBody = document.querySelector('#coursesTable tbody');

    fetch('http://localhost:8081/api/courses')
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                const row = document.createElement('tr');

                const departmentCell = document.createElement('td');
                departmentCell.textContent = course.department;
                row.appendChild(departmentCell);

                const courseNumberCell = document.createElement('td');
                courseNumberCell.textContent = course.courseNumber;
                row.appendChild(courseNumberCell);

                const titleCell = document.createElement('td');
                const titleLink = document.createElement('a');
                titleLink.href = `details.html?courseid=${course.id}`;
                titleLink.textContent = course.title;
                titleCell.appendChild(titleLink);
                row.appendChild(titleCell);

                coursesTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching courses:', error));
});



