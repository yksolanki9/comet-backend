# comet-backend
Backend for comet mobile app

v1 hosted on this route - https://comet-backend.herokuapp.com/api/v1

### Note model:
```
{
  title: String,
  content: String,
  images: [String]
}
```

### Routes:

| Request      | Description |
| ----------- | ----------- |
| POST /note   | To add a new note to the db        |
| GET /note/:noteId      | To get a particular note by its id       |
| PATCH /note/:noteId   | To update an existing note        |
| GET /notes      |  To get all the notes       |
