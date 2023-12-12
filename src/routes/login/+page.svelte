<script lang="ts">
    import { onMount } from 'svelte';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
    import { goto } from '$app/navigation';
    
    let email = '';
    let password = '';
  
    const handleLogin = async () => {
      const auth = getAuth();
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        goto('/');
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed. Please check your credentials.');
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
    <h2>Login</h2>
    <form on:submit|preventDefault={handleLogin}>
      <label for="email">Email:</label>
      <br>
      <input type="email" id="email" bind:value={email} required />
        <br>
      <label for="password">Password:</label>
      <br>
      <input type="password" id="password" bind:value={password} required />
      <br>
      <button type="submit">Login</button>
      <br><br>
      <p>Haven't registered? <br>Click <a href="register">here</a> to register</p>
    </form>
  </div>