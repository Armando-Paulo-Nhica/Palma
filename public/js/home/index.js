const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:3000/api';


    // Perform the fetch request
    fetch(`${baseUrl}/sales`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }})
        .then((response) => {
            if (!response.ok) {
                window.location.href = '/user/login';
            }
            return response.json();
          })
        .then(data => {
            if(data.status !== 200){
                window.location.href = '/user/login';
            }
        })
        .catch(error => {
            window.location.href = '/user/login';
        });
