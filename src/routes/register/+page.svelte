<script lang="ts">
  import { onMount } from 'svelte';
  import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let username = '';

  const handleRegister = async () => {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: username });

      alert('Registration successful!');
      goto('/');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };
</script>

<style lang="scss">
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  form {
    width: 360px;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

<div class="form-container">
  <h2>Register</h2>
  <form on:submit|preventDefault={handleRegister}>
    <label for="email">Email:</label>
    <br>
    <input type="email" id="email" bind:value={email} required />
    <br>
    <label for="username">Username:</label>
    <br>
    <input type="text" id="username" bind:value={username} required />
    <br>
    <label for="password">Password:</label>
    <br>
    <input type="password" id="password" bind:value={password} required />
    <br>
    <button type="submit">Register</button>
    <br><br>
    <p>Already registered? <br>Click <a href="login">here</a> to login</p>
  </form>
</div>