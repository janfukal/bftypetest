<script>
  import { onMount } from 'svelte';
  import { getAuth, updateProfile } from 'firebase/auth';
  // @ts-ignore
  import { format } from 'date-fns';

  let user = {
    id: '',
    username: '',
    fullName: '',
    email: '',
    bio: '',
    signUpDate: '',
  };

  let newUsername = '';
  let newBio = '';
  let editMode = false;

  const enterEditMode = () => {
    editMode = true;
    newUsername = user.username;
    newBio = user.bio;
  };

  const saveChanges = async () => {
    const auth = getAuth();

    try {
      // @ts-ignore
      await updateProfile(auth.currentUser, {
        displayName: newUsername,
      });
      // Optionally, update other user information like bio to a database
      // Example: await updateBioInDatabase(auth.currentUser.uid, newBio);
      editMode = false;
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  onMount(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const signUpTimestamp = authUser.metadata.creationTime;
        user = {
          id: authUser.uid,
          username: authUser.displayName || '',
          fullName: authUser.displayName || '',
          email: authUser.email || '',
          bio: 'Web developer passionate about Svelte!',
          // @ts-ignore
          signUpDate: format(new Date(signUpTimestamp), 'MMMM, yyyy'),
        };
      }
    });

    return unsubscribe;
  });
</script>

<style>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 0 10px #f8f9fa;
  }

  p {
    margin-bottom: 10px;
    line-height: 1.5;
  }

  strong {
    font-weight: bold;
  }

  .edit-icon {
    cursor: pointer;
    margin-left: 10px;
    font-size: 18px;
  }

  .edit-field {
    width: calc(100% - 20px);
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #f8f9fa;
    border-radius: 4px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

<div class="profile-container">
  {#if editMode}
    <!-- Editable fields when in edit mode -->
    <label>
      <strong>Username:</strong>
      <input type="text" bind:value={newUsername} class="edit-field" />
    </label>
    <button on:click={saveChanges}>Save</button>
  {:else}
    <!-- Display username, edit icon, bio, and sign-up date when not in edit mode -->
    <p>
      <strong>Username:</strong> 
      {user.username}
      <span on:click={enterEditMode} class="edit-icon">✏️</span>
    </p>
    <p><strong>Joined:</strong> {user.signUpDate}</p>
  {/if}
  <p><strong>Email:</strong> {user.email}</p>
</div>
