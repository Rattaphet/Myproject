const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
   await loadData();
};

const loadData = async () => {
    console.log('loaded');
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        console.log(response.data);

        const userDOM = document.getElementById('users');
        if (!userDOM) {
            console.error("Element with ID 'users' not found.");
            return;
        }

        let htmlData = '<table>';
        htmlData += '<tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Address</th><th>Education Level</th><th>Subject</th><th>Grade</th><th>Activities</th><th>Teacher First Name</th><th>Teacher Last Name</th><th>Taught</th><th>Time</th><th>Edit</th><th>Delete</th></tr>';
        response.data.forEach(user => {
            htmlData += `<tr>
                <td>${user.id}</td>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.age}</td>
                <td>${user.address}</td>
                <td>${user.education_level}</td>
                <td>${user.subject}</td>
                <td>${user.grade}</td>
                <td>${user.activities}</td>
                <td>${user.firstnamet}</td>
                <td>${user.lastnamet}</td>
                <td>${user.taught}</td>
                <td>${user.time}</td>
                <td><a href='index.html?id=${user.id}'><button>Edit</button></a></td>
                <td><button class ='delete' data-id='${user.id}'>Delete</button></td>
            </tr>`;
        });
        htmlData += '</table>';
        userDOM.innerHTML = htmlData;

        const deleteDOMs = document.getElementsByClassName('delete');
        Array.from(deleteDOMs).forEach(deleteDOM => {
            deleteDOM.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                try {
                    await axios.delete(`${BASE_URL}/users/${id}`);
                    loadData();
                } catch (error) {
                    console.log(error);
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
};
