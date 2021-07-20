const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-name').value.trim();
    const post_content = document.querySelector('#post-desc').value.trim();
  
    if (title && post_content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, post_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create a new post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id') && event.target.id === "del-btn" ) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  const updateButtonHandler = async (event) => {
  
    if (event.target.hasAttribute('data-id') && event.target.id === "update-btn") {
      const id = event.target.getAttribute('data-id');
      const title = document.querySelector(`#title-${id}`).value.trim();
      const contents = document.querySelector(`#post-${id}`).value.trim();
     
      console.log(event.target.id);
      const response = await fetch(`api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to update post');
      }
    }
  };
  
  document
    .querySelector('#btnNew')
    .addEventListener('click', newFormHandler);
  
  document
    .querySelector('.delete-list')
    .addEventListener('click', delButtonHandler);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', updateButtonHandler);