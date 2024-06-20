// scripts/details.js

document.addEventListener('DOMContentLoaded', function() {
    const courseDetailsDiv = document.getElementById('courseDetails');
    const urlParams = new URLSearchParams(window.location.search);

    let id = -1;
    if (urlParams.has("courseid")) {
        id = urlParams.get("courseid");

        fetch(`http://localhost:8081/api/courses/${id}`)
            .then(response => response.json())
            .then(course => {
                if (course) {
                    const courseInfo = `
                        <h2>${course.title}</h2>
                        <p><strong>Department:</strong> ${course.department}</p>
                        <p><strong>Course Number:</strong> ${course.courseNumber}</p>
                        <p><strong>Instructor:</strong> ${course.instructor}</p>
                        <p><strong>Start Date:</strong> ${course.startDate}</p>
                        <p><strong>Duration (days):</strong> ${course.duration}</p>
                        <p><strong>Description:</strong> ${course.description}</p>
                    `;
                    courseDetailsDiv.innerHTML = courseInfo;
                } else {
                    courseDetailsDiv.innerHTML = '<p>Error: Course details not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
                courseDetailsDiv.innerHTML = '<p>Error fetching course details. Please try again later.</p>';
            });
    } else {
        courseDetailsDiv.innerHTML = '<p>Error: No course ID provided in query string.</p>';
    }
});






