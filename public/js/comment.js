const newFormHandler = async (event)  => {
    event.preventDefault();
  
    const comment_text = document.querySelector('.new-comment').value.trim();
    const post_id = document.querySelector('.btn-comment').getAttribute('data-id');
    
    console.log(event.target.getAttribute('data-id'));
  
    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            comment_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.replace(`/post/${post_id}`);
        } else {
          alert('Failed to creaate a new comment');
        }
      }
  };
  
  document.querySelector('.btn-comment').addEventListener('click', newFormHandler);