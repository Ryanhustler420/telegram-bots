// Import the Supabase client
const { createClient } = require('@supabase/supabase-js');

// Set up Supabase client with your Supabase project URL and anon key
const SUPABASE_URL = 'your-supabase-url';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to insert a token into the database
async function insertToken(token) {
  const { data, error } = await supabase
    .from('tokens') // Make sure 'tokens' is your table name
    .insert([
      { token: token }
    ]);

  if (error) {
    console.error('Error inserting token:', error);
    return;
  }

  console.log('Token inserted:', data);
}

// Function to fetch all tokens from the database
async function fetchTokens() {
  const { data, error } = await supabase
    .from('tokens') // Make sure 'tokens' is your table name
    .select('*');

  if (error) {
    console.error('Error fetching tokens:', error);
    return;
  }

  console.log('Fetched tokens:', data);
}

// Example usage
(async () => {
  // Insert a token into the database
  await insertToken('my-example-token-12345');

  // Fetch all tokens from the database
  await fetchTokens();
})();


const getRandomFreePort = () => {
  return new Promise((resolve, reject) => {
    const server = require('net').createServer();
    server.listen(0, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', reject);
  });
};

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/*

To use Supabase with Node.js to store and fetch a simple token, you'll need to install the Supabase client and set up the necessary environment. Below is a simple example of how to store a token in the Supabase database and then fetch it.

### Steps to Set Up

1. **Create a Supabase Project:**
   If you haven’t already, go to [Supabase](https://supabase.com/) and create a new project. Once the project is created, you'll get your `SUPABASE_URL` and `SUPABASE_ANON_KEY`, which you'll need for connecting to the Supabase API.

2. **Install Dependencies:**
   You'll need the `@supabase/supabase-js` library to interact with Supabase from Node.js. You can install it using npm or yarn.

   ```bash
   npm install @supabase/supabase-js
   ```

3. **Set up your Supabase Table:**
   In your Supabase project, create a new table, for example `tokens`, with a simple structure like this:

   - `id` (integer, primary key)
   - `token` (text)

4. **Node.js Script to Store and Fetch Tokens:**

```javascript
// Import the Supabase client
const { createClient } = require('@supabase/supabase-js');

// Set up Supabase client with your Supabase project URL and anon key
const SUPABASE_URL = 'your-supabase-url';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to insert a token into the database
async function insertToken(token) {
  const { data, error } = await supabase
    .from('tokens') // Make sure 'tokens' is your table name
    .insert([
      { token: token }
    ]);

  if (error) {
    console.error('Error inserting token:', error);
    return;
  }

  console.log('Token inserted:', data);
}

// Function to fetch all tokens from the database
async function fetchTokens() {
  const { data, error } = await supabase
    .from('tokens') // Make sure 'tokens' is your table name
    .select('*');

  if (error) {
    console.error('Error fetching tokens:', error);
    return;
  }

  console.log('Fetched tokens:', data);
}

// Example usage
(async () => {
  // Insert a token into the database
  await insertToken('my-example-token-12345');

  // Fetch all tokens from the database
  await fetchTokens();
})();
```

### Explanation:

1. **Supabase Client**: The `createClient()` function initializes the Supabase client with your project's URL and anon key.
2. **Insert Token**: The `insertToken()` function inserts a new token into the `tokens` table.
3. **Fetch Tokens**: The `fetchTokens()` function retrieves all tokens from the `tokens` table.
4. **Async/Await**: Both functions use `async/await` to handle asynchronous requests to the Supabase database.

### Running the Script

1. Save the script in a file, e.g., `supabase-token.js`.
2. Replace `your-supabase-url` and `your-supabase-anon-key` with your actual Supabase project URL and anon key.
3. Run the script using Node.js:

   ```bash
   node supabase-token.js
   ```

### Expected Output:
- The token will be inserted into the Supabase table.
- All tokens will be fetched and printed to the console.

If there are any issues (e.g., incorrect Supabase URL or anon key), you’ll get an error message in the console.

Let me know if you need further assistance!

*/