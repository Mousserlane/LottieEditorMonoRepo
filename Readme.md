# Getting Started

To run the app, you need to start both `server` & `client` apps.

### Server

navigate to `/server` folder and run

```
pnpm install
```

Once all of the dependencies are installed, run

```
pnpm dev
```

No database is implemented at this time so it's not necessary to run `docker-compose`

### Client

Same steps as the server

### Ports

Client is served at Port 1513 & Server is served at Port 3000

# Accessing the Editor

Navigate to `http://localhost:1513/editor` to start editing your lottie animation.

# Known Issue

- No Authentication at this time
- Session's clients is not deleted on refresh
- Animation is restarted after each edit or after toggling its visibility
- Issue with broadcast delete. In other client session, the wrong layer(s) are deleted

# Missing Feature

- Chat feature
- Editing Transformation, scale, skew, & rotate
- Session Manager to handle mutliple/different sessions
- Client username/name for the
- Database implementation

# Note

- Hide is intentionally not broadcasted as this can annoy other user in the session
