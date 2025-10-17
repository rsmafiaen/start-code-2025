# The Operation - Backend

To run the backend, a connection string to a neon database is required, and an Ollama API key is also required. \
Add these to a `.env` file in the root of `/the-operation`

It should look something like this:
```
NEON_CONNECTION_STRING='postgresql://xxxxxxx:xxxxxxxxxx@xxxxxxxxxx2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
OLLAMA_API_KEY='xxxxxxxxxxxxxxxxxxx'
```

Your Ollama API key can be generated for free at https://ollama.com/settings/keys, and to access the neon db, ask a maintainer
